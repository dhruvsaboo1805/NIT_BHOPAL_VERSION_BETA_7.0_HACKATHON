import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Article from './pages/Article';
import ProfilePage from './pages/ProfilePage';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Contest from './pages/Contest';

function App() {
  const location = useLocation();
  const [email, setEmail] = useState("guptaavish03@gmail.com");

  useEffect(() => {
    // Get the query parameters from the URL
    const params = new URLSearchParams(location.search);
    const emailFromUrl = params.get('email');
    
    console.log('Location search:', location.search);  // Log the full query string
    console.log('Email from URL APP.jsx:', emailFromUrl);  // Log the extracted email parameter
  
    // Set the email in state if present
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/profile" element={<ProfilePage email={email} />} />
        <Route path="/contest" element={<Contest />} />
      </Routes>
    </div>
  );
}

export default App;
