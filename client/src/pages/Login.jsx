import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    setError("");

    // For now just navigate (backend later)
    console.log("Login Data:", formData);
    navigate("/home");   // change route if needed
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Login</h3>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Forgot password */}
        <div className="text-end mb-3">
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => alert("Forgot password clicked")}
          >
            Forgot Password?
          </span>
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-100">
          Login
        </button>

        {/* Signup */}
        <div className="text-center mt-3">
          <p>
            New user?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate("/signup")}
            >
              Create New Account
            </span>
          </p>
        </div>

      </form>
    </div>
  );
}

export default Login;
