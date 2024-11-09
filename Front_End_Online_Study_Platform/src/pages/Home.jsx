// Import necessary components
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import HomeCards from "../components/HomeCards";
import TopicStudy from "../TopicStudy";
import Navbar from "../components/Navbar";
import { useTable } from "react-table";
import axios from "axios";
import { toast } from "react-toastify";

const ApiUrl = "https://version-app-lac.vercel.app/question-list";

const columns = [
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (value === "solved" ? "✔️" : ""),
    style: {
      textAlign: "center",
    },
  },
  {
    Header: "Title",
    accessor: "questionName",
  },
  {
    Header: "Topics",
    accessor: "topicTags",
    Cell: ({ value }) => (
      <div>
        {value && value.length > 0 ? (
          value.map((topic, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                backgroundColor: "#f0f0f0",
                padding: "3px 8px",
                margin: "2px",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              {topic}
            </span>
          ))
        ) : (
          <span style={{ fontStyle: "italic", color: "gray" }}>
            No topics available
          </span>
        )}
      </div>
    ),
  },
  {
    Header: "Difficulty",
    accessor: "difficulty",
    Cell: ({ value }) => {
      const difficultyColor =
        value === "easy"
          ? "#5cb85c"
          : value === "medium"
          ? "#f0ad4e"
          : "#d9534f";
      return (
        <span style={{ color: difficultyColor, fontWeight: "bold" }}>
          {value}
        </span>
      );
    },
  },
];

const Home = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    axios.get(ApiUrl).then((response) => {
      setData(response.data.questions);
    });
  }, []);

  useEffect(() => {
    let timer;
    if (isModalOpen && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleCloseModal();
    }
    return () => clearTimeout(timer);
  }, [isModalOpen, timeLeft]);

  const openModal = (question) => {
    setCurrentQuestion(question);
    setTimeLeft(15);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (timeLeft === 0) {
      toast.error("Time Over! Be ready for the next question.");
    } else if (index + 1 === currentQuestion.correctOption) {
      toast.success("Correct Answer!");
      const updatedData = data.map((q) =>
        q._id === currentQuestion._id ? { ...q, status: "solved" } : q
      );
      setData(updatedData);
    } else {
      toast.error("Incorrect Answer");
    }
  
    handleCloseModal();
  };
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div>
      <Navbar />
      <div className="home_card-container">
        {TopicStudy.map((card) => (
          <HomeCards
            key={card.id}
            imgSrc={card.image}
            title={card.topicName}
            description={card.description}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="filters">
        <select>
          <option value="">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select>
          <option value="">Status</option>
          <option value="solved">Solved</option>
          <option value="attempting">Attempting</option>
        </select>

        <select>
          <option value="">Tags</option>
          <option value="arrays">Arrays</option>
          <option value="strings">Strings</option>
          <option value="dynamic programming">Dynamic Programming</option>
        </select>

        <input type="text" placeholder="Search questions" />
      </div>

      {/* Table of Questions */}
      <table {...getTableProps()} style={{ width: "95%", margin: "0 auto" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ padding: "10px", textAlign: "center" }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => openModal(row.original)}
                style={{ cursor: "pointer" }}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ padding: "10px", textAlign: "center" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{currentQuestion.questionName}</h2>
            <div className="timer">Time Left: {timeLeft}s</div>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={selectedOption !== null}
                  className="option-button"
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
