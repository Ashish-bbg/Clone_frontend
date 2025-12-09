import { useState } from "react";
import "./Login.css";
import { loginUser } from "../../api/registerApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      // console.log("Login successfull", response);
      setUser(response.userData);

      // setting flag for logged_in_user
      localStorage.setItem("is_logged_in", true);
      // alert("Login successfull");
      setTimeout(() => navigate("/"), 300);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="signup">
        <h3>Login Page</h3>

        <form onSubmit={handleLogin} method="post">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder=" "
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder=" "
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <label>Password</label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            className="login-btnn"
            type="submit"
            disabled={isLoading}
            style={{
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="signup-btn">
            Don't have an Account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
