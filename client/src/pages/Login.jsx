import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5223/api/Auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
      );

      // Save login info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("fullName", response.data.fullName);

      setError("");
      navigate("/create-trip_toggle");
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-col">
        <div className="card login-card shadow">
          <div className="card-body">
            <h3 className="text-center mb-1 welcome-animate">Welcome Back</h3>

            <p className="text-center text-muted mb-4 subtitle-animate">
              Login to your account
            </p>

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Email</label>
              </div>

              {/* Password */}
              <div className="form-group password-group">
                <i className="bi bi-lock"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                />

                <label>Password</label>

                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>

              {/* Forgot password */}
              <div className="text-end mb-3">
                <span
                  className="forgot-link"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </span>
              </div>

              {/* Submit */}
              <button className="btn btn-primary w-100">Login</button>
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>

              {/* Signup */}
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <span
                    className="signup-link"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
