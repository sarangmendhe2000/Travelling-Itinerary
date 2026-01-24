import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

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

  // Handle submit (UI-level validation only)
  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.email || !formData.password) {
      setError("Invalid email or password");
      return;
    }

    /* 
      TEMPORARY LOGIC
      ----------------
      Replace this block with backend API call later
    */

    const DEMO_EMAIL = "admin@gmail.com";
    const DEMO_PASSWORD = "Admin@123";

    if (
      formData.email !== DEMO_EMAIL ||
      formData.password !== DEMO_PASSWORD
    ) {
      setError("Invalid email or password");
      return;
    }

    // success
    setError("");
    console.log("Login successful:", formData);

    // redirect (change later if needed)
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-col">
        <div className="card login-card shadow">
          <div className="card-body">
            <h3 className="text-center mb-1 welcome-animate">
              Welcome Back
            </h3>

            <p className="text-center text-muted mb-4 subtitle-animate">
              Login to your account
            </p>

            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
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
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
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
              <button className="btn btn-primary w-100">
                Login
              </button>

              {/* Signup */}
              <div className="text-center mt-3">
                <p>
                  Don&apos;t have an account?{" "}
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
