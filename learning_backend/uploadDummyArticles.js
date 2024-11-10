const axios = require('axios');

// Your API endpoint for adding questions (adjust accordingly)
const apiUrl = 'https://version-app-lac.vercel.app/question-list'; // Replace with your actual API URL

// List of unique questions with specific correct options and details
const questions = [
  {
    questionName: "What is a Binary Heap?",
    questionNumber: 14,
    difficulty: "medium",
    options: [
        "A tree-based data structure with a specific order",
        "A list sorted in ascending order",
        "A binary tree with only one child per node",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Data Structures", "Heap"]
},
{
    questionName: "What is memoization in Dynamic Programming?",
    questionNumber: 15,
    difficulty: "medium",
    options: [
        "Storing results of subproblems",
        "Sorting elements in memory",
        "Recursively calling functions",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Dynamic Programming"]
},
{
    questionName: "Explain the concept of Greedy Algorithm.",
    questionNumber: 16,
    difficulty: "medium",
    options: [
        "Making the best choice at each step",
        "A divide and conquer technique",
        "An algorithm for sorting arrays",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Optimization"]
},
{
    questionName: "What is an AVL Tree?",
    questionNumber: 17,
    difficulty: "hard",
    options: [
        "A self-balancing binary search tree",
        "A tree with only two children per node",
        "A graph traversal algorithm",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Data Structures", "Trees"]
},
{
    questionName: "What is a Red-Black Tree?",
    questionNumber: 18,
    difficulty: "hard",
    options: [
        "A balanced binary search tree with color properties",
        "A graph traversal method",
        "A heap-based sorting algorithm",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Data Structures", "Trees"]
},
{
    questionName: "What is Binary Search?",
    questionNumber: 19,
    difficulty: "easy",
    options: [
        "A search algorithm that divides the array in half",
        "A search algorithm that checks each element",
        "A sorting algorithm",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Search"]
},
{
    questionName: "What is the space complexity of Merge Sort?",
    questionNumber: 20,
    difficulty: "hard",
    options: [
        "O(n)",
        "O(n log n)",
        "O(log n)",
        "O(1)"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Complexity"]
},
{
    questionName: "Explain Hash Collision.",
    questionNumber: 21,
    difficulty: "medium",
    options: [
        "When two keys map to the same hash",
        "A search algorithm",
        "A sorting error",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Data Structures", "Hashing"]
},
{
    questionName: "What is Prim's Algorithm used for?",
    questionNumber: 22,
    difficulty: "hard",
    options: [
        "Finding the Minimum Spanning Tree in a graph",
        "Sorting elements",
        "Searching in an array",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Graph"]
},
{
    questionName: "What is the time complexity of Binary Search?",
    questionNumber: 23,
    difficulty: "easy",
    options: [
        "O(log n)",
        "O(n)",
        "O(n^2)",
        "O(n log n)"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Search"]
},
{
    questionName: "What is backtracking?",
    questionNumber: 24,
    difficulty: "medium",
    options: [
        "An approach to explore all possibilities",
        "A technique for sorting arrays",
        "A type of linked list traversal",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Recursion"]
},
{
    questionName: "Explain the concept of Divide and Conquer.",
    questionNumber: 25,
    difficulty: "medium",
    options: [
        "Dividing a problem into smaller subproblems",
        "Using recursion to repeat actions",
        "A sorting technique",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Problem Solving"]
},
{
    questionName: "What is Kruskal's Algorithm used for?",
    questionNumber: 26,
    difficulty: "hard",
    options: [
        "Finding the Minimum Spanning Tree",
        "Finding shortest paths in a graph",
        "Sorting arrays",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Graph"]
},
{
    questionName: "What is a Priority Queue?",
    questionNumber: 27,
    difficulty: "medium",
    options: [
        "A queue where elements are removed based on priority",
        "A queue where elements follow FIFO order",
        "A queue where elements follow LIFO order",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Data Structures", "Queue"]
},
{
    questionName: "What is Linear Search?",
    questionNumber: 28,
    difficulty: "easy",
    options: [
        "A search method that checks each element sequentially",
        "A divide and conquer technique",
        "A sorting algorithm",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Search"]
},
{
    questionName: "Explain Floyd-Warshall Algorithm.",
    questionNumber: 29,
    difficulty: "hard",
    options: [
        "An algorithm to find shortest paths in a graph",
        "A sorting algorithm",
        "Used for binary search",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Graph"]
},
{
    questionName: "What is a Circular Queue?",
    questionNumber: 30,
    difficulty: "medium",
    options: [
        "A queue that connects the end back to the start",
        "A list sorted in circular order",
        "A tree structure",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Data Structures", "Queue"]
},
{
    questionName: "What is a Trie used for?",
    questionNumber: 31,
    difficulty: "medium",
    options: [
        "Efficient information retrieval",
        "Sorting elements",
        "Graph traversal",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Data Structures", "Tree"]
},
{
    questionName: "What is a Self-Referential Structure?",
    questionNumber: 32,
    difficulty: "easy",
    options: [
        "A structure pointing to itself",
        "A type of sorting algorithm",
        "A function calling itself",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Programming", "Data Structures"]
},
{
    questionName: "Explain Dijkstra's Algorithm.",
    questionNumber: 33,
    difficulty: "hard",
    options: [
        "Algorithm to find shortest paths in a graph",
        "Sorting algorithm for integers",
        "Method for depth-first traversal",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Algorithms", "Graph"]
},
{
    questionName: "What is Pseudocode?",
    questionNumber: 34,
    difficulty: "easy",
    options: [
        "An informal way to describe an algorithm",
        "A type of programming language",
        "An actual code for execution",
        "None of the above"
    ],
    correctOption: 1,
    status: "active",
    solved: false,
    topicTags: ["Programming", "Algorithm Design"]
},

  // Continue adding more unique question objects up to 20 total questions
  // ...
];

// Function to upload each question
async function uploadQuestions() {
  for (const [i, questionData] of questions.entries()) {
    try {
      const response = await axios.post(apiUrl, questionData);
      console.log(`Question ${i + 1} uploaded successfully: ${response.data.message}`);
    } catch (error) {
      console.error(`Error uploading question ${i + 1}:`, error.response ? error.response.data : error.message);
    }
  }
}

// Run the upload function
uploadQuestions();
