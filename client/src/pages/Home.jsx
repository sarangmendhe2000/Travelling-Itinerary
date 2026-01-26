import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  // Create Trip requires login
  const handleCreateTrip = () => {
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
      navigate("/create-trip_toggle");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-hero">

      <div className="hero-content">

        <h1>Your Journey, Your Story</h1>
        <p>Choose Your Favorite Destination</p>

        <div className="hero-buttons">

          {/* Explore Page */}
          <button
            className="hero-btn primary"
            onClick={() => navigate("/explore")}
          >
            Explore Now
          </button>

          {/* Create Trip */}
          <button
            className="hero-btn secondary"
            onClick={handleCreateTrip}
          >
            Create Trip
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;
