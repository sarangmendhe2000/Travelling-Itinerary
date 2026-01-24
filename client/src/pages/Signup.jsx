import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css"; // reuse login styles (twin UI)
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Password strength check (UNCHANGED)
  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        setError("All fields are required!");
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!isStrongPassword(formData.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, number & special character.",
      );
      return;
    }

    setError("");
    console.log("Signup Data:", formData);
    navigate("/login");
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;

    // allow only digits
    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;

    // allow only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    }
  };

  return (
    <div className="login-container signup-container">
      <div className="login-col">
        <div className="card login-card signup-card shadow">
          <div className="card-body">
            <div className="signup-header">
              <h3 className="text-center mb-1 welcome-animate">
                Create Account
              </h3>
              <p className="text-center text-muted mb-4 subtitle-animate">
                Sign up to get started
              </p>
            </div>

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            <div className="signup-form-wrapper">
              <form onSubmit={handleSubmit} className="signup-grid signup-form">
                {/* Full Name */}
                <div className="form-group">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <label>Full Name</label>
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                  <i className="bi bi-calendar"></i>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  <label>Date of Birth</label>
                </div>

                {/* Gender */}
                <div className="form-group">
                  <i className="bi bi-gender-ambiguous"></i>
                  <select
                    name="gender"
                    className="form-control"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value=""> </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <label>Gender</label>
                </div>

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

                {/* Phone */}
                <div className="form-group">
                  <i className="bi bi-telephone"></i>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleNumberChange}
                    maxLength={10}
                  />
                  <label>Phone Number</label>
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

                {/* Confirm Password */}
                <div className="form-group">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control"
                    placeholder=" "
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <label>Confirm Password</label>
                </div>

                {/* Address */}
                <div className="form-group">
                  <i className="bi bi-geo-alt"></i>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="2"
                    placeholder=" "
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                  <label>Address</label>
                </div>

                {/* Emergency Contact */}
                <div className="form-group">
                  <i className="bi bi-person-badge"></i>
                  <input
                    type="text"
                    name="emergencyName"
                    className="form-control"
                    placeholder=" "
                    value={formData.emergencyName}
                    onChange={handleNameChange}
                  />
                  <label>Emergency Contact Name</label>
                </div>

                <div className="form-group">
                  <i className="bi bi-telephone-fill"></i>
                  <input
                    type="text"
                    name="emergencyPhone"
                    className="form-control"
                    placeholder=" "
                    value={formData.emergencyPhone}
                    onChange={handleNumberChange}
                    maxLength={10}
                  />
                  <label>Emergency Contact Number</label>
                </div>

                <button className="btn btn-primary w-100">
                  Create Account
                </button>

                <div className="text-center mt-3">
                  <p>
                    Already have an account?{" "}
                    <span
                      className="signup-link"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
