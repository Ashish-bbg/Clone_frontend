import { useState } from "react";
import "./Signup.css";
import { registerUser } from "../../api/registerApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser(formData);
      console.log("Signup successfull", data);
      alert("Signup successfull");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="center">
      <div className="signup">
        <h2>Signup Page</h2>

        <form onSubmit={handleSignup} method="post">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder=" "
              required
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
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <label>Password</label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Signup</button>
          <p className="login-btn">
            Already have an Account <a href="#">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
