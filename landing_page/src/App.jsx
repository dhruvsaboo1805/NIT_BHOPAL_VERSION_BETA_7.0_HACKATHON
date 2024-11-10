import './App.css';
import Card from './components/Card';
import cardData from './data';

function App() {
  const handleSignInClick = () => {
    window.location.href = 'https://user-auth-front-end.vercel.app/';
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-text">Code Camp Fire</span>
        </div>
        <button className="navbar-signin" onClick={handleSignInClick}>
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <span>Your path to learning journey</span>
        </div>
      </section>

      {/* Card Container */}
      <div className="card-container">
        {cardData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
