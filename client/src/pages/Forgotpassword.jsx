import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function ForgotPassword() {
  const navigate = useNavigate();

  // step control
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // sample OTP (frontend demo)
  const SAMPLE_OTP = "12345";

  /* =====================
     HANDLERS
     ===================== */

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setError("");
    console.log("OTP sent to:", email, "| OTP:", SAMPLE_OTP);
    setStep("otp");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    if (otp !== SAMPLE_OTP) {
      setError("Invalid OTP. Please try again.");
      return; // ❌ stay on OTP screen
    }

    setError("");
    setStep("reset"); // ✅ move forward
  };

  const handleResendOtp = () => {
    setOtp("");
    setError("A new OTP has been sent to your email");
    console.log("OTP resent:", SAMPLE_OTP);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Password reset successful");
    setStep("success");
  };

  /* =====================
     UI
     ===================== */

  return (
    <div className="login-container">
      <div className="login-col">
        <div className="login-card shadow">

          <h3 className="text-center mb-2">Forgot Password</h3>

          <p className="text-center text-muted mb-4">
            {step === "email" && "Enter your registered email"}
            {step === "otp" && "Enter the OTP sent to your email"}
            {step === "reset" && "Create a new password"}
            {step === "success" && "Password reset successful"}
          </p>

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          {/* STEP 1: EMAIL */}
          {step === "email" && (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  className="form-control"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email Address</label>
              </div>

              <button className="btn btn-primary w-100">
                Send OTP
              </button>
            </form>
          )}

          {/* STEP 2: OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <i className="bi bi-shield-lock"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder=" "
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={5}
                />
                <label>Enter OTP</label>
              </div>

              <button className="btn btn-primary w-100">
                Verify OTP
              </button>

              {/* RESEND OTP */}
              <div className="text-center mt-3">
                <span
                  className="signup-link"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </span>
              </div>
            </form>
          )}

          {/* STEP 3: RESET PASSWORD */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword}>
              <div className="form-group password-group">
                <i className="bi bi-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>New Password</label>
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>

              <div className="form-group password-group">
                <i className="bi bi-lock-fill"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>Confirm Password</label>
              </div>

              <button className="btn btn-primary w-100">
                Reset Password
              </button>
            </form>
          )}

          {/* STEP 4: SUCCESS */}
          {step === "success" && (
            <div className="text-center">
              <i
                className="bi bi-check-circle-fill"
                style={{ fontSize: "3rem", color: "green" }}
              ></i>

              <p className="mt-3">
                Your password has been reset successfully
              </p>

              <button
                className="btn btn-primary mt-3"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
