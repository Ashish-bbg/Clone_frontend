import { useState } from "react";
import "./Signup.css";
import { registerUser } from "../../api/registerApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      if (!response || !response.userData) {
        setError("Unexpected server response. Please try again.");
        return;
      }
      setUser(response.userData);
      console.log("Signup successfull", response);
      // alert("Signup successfull");
      setTimeout(() => navigate("/"), 300);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="signup">
        <h3>Signup Page</h3>

        <form onSubmit={handleSignup} method="post">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder=" "
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <label>Name</label>
          </div>
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
            className="signup-btnn"
            type="submit"
            disabled={isLoading}
            style={{
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
          <p className="login-btn">
            Already have an Account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
