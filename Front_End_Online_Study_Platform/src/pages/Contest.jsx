import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Contest.css";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://version-app-lac.vercel.app/question-list";

const Contest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedContest !== null) {
      const fetchQuestions = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${API_BASE_URL}?page=${selectedContest}`
          );
          setQuestions(response.data.questions);
        } catch (error) {
          console.error("Error fetching questions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [selectedContest]);

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isCompleted) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      endContest();
    }
  }, [timeLeft, isStarted, isCompleted]);

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      showToastOnAnswer();
    } else {
      endContest();
    }
  };

  const showToastOnAnswer = () => {
    const messages = [
      "Nice choice! Keep going! 🏆",
      "You’re on fire! 🔥",
      "Smart move, genius! 😎",
      "You’ve got this! 🚀",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    toast.info(randomMessage, { autoClose: 2000 });
  };

  const endContest = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question._id] === question.correctOption) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setIsCompleted(true);
    showFinalScoreToast(calculatedScore);
  };

  const showFinalScoreToast = (finalScore) => {
    if (finalScore === questions.length) {
      toast.success("Perfect score! 🎉 You're a coding champ!", {
        autoClose: 3000,
      });
    } else if (finalScore >= questions.length / 2) {
      toast.success("Great job! You’re getting there! 💪", { autoClose: 3000 });
    } else {
      toast.info("Keep practicing! You’re on your way! 😊", {
        autoClose: 3000,
      });
    }
  };

  const startContest = (contestNumber) => {
    setSelectedContest(contestNumber);
    setIsStarted(true);
  };

  useEffect(() => {
    if (isCompleted) {
      const timeoutId = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCompleted, navigate]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="contest-container">
        <ToastContainer />
        {!isStarted ? (
          <div className="hero-section">
            <h1>Select Your Contest</h1>
            <p>Choose one of the four contests to test your skills!</p>
            {[1, 2, 3, 4].map((contest) => (
              <button
                key={contest}
                onClick={() => startContest(contest)}
                className="start-button"
              >
                Start Contest {contest}
              </button>
            ))}
          </div>
        ) : isCompleted ? (
          <div className="results">
            <h2>Contest Completed!</h2>
            <p>
              Your Score: {score} / {questions.length}
            </p>
          </div>
        ) : questions.length > 0 ? ( 
          <div>
            <div className="timer">
              Time Left: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? "0" : ""}
              {timeLeft % 60}
            </div>
            <div className="question">
              <h3>{questions[currentQuestionIndex].questionName}</h3>
              <div className="options">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerSelect(
                          questions[currentQuestionIndex]._id,
                          index
                        )
                      }
                      className={`option-button ${
                        selectedAnswers[questions[currentQuestionIndex]._id] ===
                        index
                          ? "selected"
                          : ""
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        ) : (
          <Loader /> 
        )}
      </div>
    </>
  );
};

export default Contest;
