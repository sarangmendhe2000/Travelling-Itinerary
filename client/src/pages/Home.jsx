import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">

      <h1>Welcome to the Website</h1>
      <p>This is the Home page.</p>

      {/* ✅ CREATE TRIP BUTTON */}
      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/create-trip_toggle")}
      >
        Create Trip
      </button>

    </div>
  );
}

export default Home;
