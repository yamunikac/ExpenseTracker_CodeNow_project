
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginPhoto from "../assets/Login_Photo.png";
import api from "../api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await api.post("/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (!res.data?.token) {
        throw new Error("Login response did not contain a token");
      }

      localStorage.setItem("token", res.data.token);

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      } else {
        localStorage.removeItem("user");
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Login error:",
        err.response?.data || err.message
      );

      if (err.response) {
        const message =
          err.response.data?.message ||
          `Login failed (${err.response.status})`;

        alert(message);
      } else if (err.request) {
        alert(
          "Cannot connect to the server. Please check your internet connection and try again."
        );
      } else {
        alert(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img
            src={loginPhoto}
            alt="Login Illustration"
            className="login-image"
          />
        </div>

        <div className="login-card">
          <div className="text-center mb-4">
            <div className="logo-circle">💰</div>

            <h2 className="mt-3 fw-bold">
              Expense Tracker
            </h2>

            <p className="text-muted">
              Welcome back! Please login to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div>
                <input
                  id="remember"
                  type="checkbox"
                />{" "}
                <label htmlFor="remember">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-decoration-none"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <hr />

          <p className="text-center mb-0">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
