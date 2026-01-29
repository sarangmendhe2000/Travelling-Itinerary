import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">

      <div className="nav-left">
        <Link to="/" className="brand">
          TravelPlanner
        </Link>
      </div>

      <div className="nav-right">

        <Link to="/" className="nav-link-item">Home</Link>
        <Link to="/services" className="nav-link-item">Services</Link>
        <Link to="/about" className="nav-link-item">About</Link>
        <Link to="/contact" className="nav-link-item">Contact</Link>

        {token && (
          <Link to="/my-trips" className="nav-link-item">
            My Trips
          </Link>
        )}

        {token ? (
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="nav-btn login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
