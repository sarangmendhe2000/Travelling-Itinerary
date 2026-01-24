import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    emergencyPhone: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Password strength check
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

    // Validation
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
        "Password must be at least 8 characters and include uppercase, number & special character."
      );
      return;
    }

    setError("");
    console.log("Signup Data:", formData);

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "650px" }}>
      <div className="card shadow-lg p-4 rounded border-0">

        <h3 className="text-center mb-4 text-primary">
          Create New Account
        </h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="👤 Enter full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* DOB */}
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">-- Select Gender --</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="📧 Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="📱 Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="🔒 Create password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              placeholder="🔐 Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="2"
              placeholder="🏠 Enter address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Emergency Section */}
          <div className="border rounded p-3 mb-4 bg-light">

            <h6 className="fw-bold text-secondary">
              Emergency Contact Information
            </h6>
            <small className="text-muted">
              Please provide the name and phone number for an emergency contact person
            </small>

            <div className="mt-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="emergencyName"
                className="form-control"
                placeholder="👤 Emergency contact name"
                value={formData.emergencyName}
                onChange={handleChange}
              />
            </div>

            <div className="mt-3">
              <label className="form-label">Contact Number</label>
              <input
                type="tel"
                name="emergencyPhone"
                className="form-control"
                placeholder="📞 Emergency contact number"
                value={formData.emergencyPhone}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Submit */}
          <button className="btn btn-primary w-100 fw-bold">
            Create Account
          </button>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#0d6efd" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Signup;
