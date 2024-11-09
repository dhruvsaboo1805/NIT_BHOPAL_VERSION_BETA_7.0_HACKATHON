const axios = require('axios');

// Your API endpoint for adding articles (adjust accordingly)
const apiUrl = 'https://version-app.vercel.app/article-list/add'; // Replace with your actual API URL

// Function to generate random data for articles
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDummyArticle(index) {
  const titles = [
    'Introduction to Algorithms',
    'Deep Learning for Beginners',
    'Mastering JavaScript',
    'Understanding Data Structures',
    'Web Development Best Practices',
    'Machine Learning Techniques',
    'Advanced Node.js Concepts',
    'Building Scalable Systems',
    'Cloud Computing Overview',
    'Python for Data Science',
    'Database Optimization',
    'Frontend Frameworks Comparison',
    'Backend Architecture Design',
    'Building REST APIs',
    'Introduction to Blockchain',
    'AI and Ethics',
    'Cybersecurity Best Practices',
    'Docker and Kubernetes for Beginners',
    'Microservices Architecture',
    'Design Patterns in Software Engineering',
    'Artificial Intelligence in Business',
    'Data Science Career Guide',
    'DevOps Fundamentals',
    'React vs Angular: A Comparison',
    'Full Stack Web Development Guide',
    'Getting Started with TypeScript',
    'Serverless Architectures Explained',
    'Blockchain Use Cases in Finance',
    'Automation with Python',
    'Practical Cloud Architectures',
    'Functional Programming with JavaScript',
  ];

  const topics = ['AI', 'Data Science', 'Web Development', 'Machine Learning', 'Blockchain', 'Cloud', 'Backend', 'Frontend', 'Security', 'DevOps'];
  const difficultyLevels = ['easy', 'medium', 'hard'];
  const contentSamples = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];

  const authors = ['John Doe', 'Jane Smith', 'Mary Johnson', 'James Brown', 'Michael Davis', 'David Wilson', 'Emma Moore', 'Oliver Taylor'];

  return {
    title: `${titles[index % titles.length]} ${index + 1}`,
    content: getRandomElement(contentSamples),
    topicTags: [getRandomElement(topics), getRandomElement(topics)],
    difficulty: getRandomElement(difficultyLevels),
    author: getRandomElement(authors),
    likes: Math.floor(Math.random() * 100),
    dislikes: Math.floor(Math.random() * 10),
    status: 'active',
    createdAt: new Date(),
  };
}

async function uploadArticles() {
  const articles = [];
  for (let i = 0; i < 23; i++) {
    const articleData = generateDummyArticle(i);
    articles.push(articleData);

    // Upload each article to the '/add' endpoint
    try {
      const response = await axios.post(apiUrl, articleData);
      console.log(`Article ${i + 1} uploaded successfully: ${response.data.message}`);
    } catch (error) {
      console.error(`Error uploading article ${i + 1}:`, error.response ? error.response.data : error.message);
    }
  }
}

// Run the upload function
uploadArticles();
