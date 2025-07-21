import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import config from "../../config.json";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("STUDENT");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.apiBaseUrl}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <style>{`
        .login-wrapper {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }

        .left-side {
          width: 90%;
          background: url('/wave.png') no-repeat center center;
          background-size: cover;
          position: relative;
        }

        .right-side {
          width: 45%;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .register-form {
          width: 100%;
          max-width: 350px;
        }

        .register-form h1 {
          font-weight: bold;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .register-form h4 {
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .register-form input,
        .register-form select {
          width: 100%;
          padding: 10px 15px;
          margin-bottom: 1rem;
          border: none;
          border-bottom: 1px solid black;
          outline: none;
          font-size: 1rem;
          background: transparent;
        }

        .register-form input::placeholder {
          color: #555;
        }

        .register-form button {
          width: 100%;
          padding: 10px;
          font-weight: bold;
          background-color: black;
          color: white;
          border: none;
          cursor: pointer;
          margin-top: 1rem;
        }

        .register-form .or-divider {
          text-align: center;
          margin: 1rem 0;
          font-size: 0.9rem;
          color: #555;
        }

        .register-form .login-btn {
          width: 100%;
          padding: 10px;
          font-weight: bold;
          background-color: transparent;
          color: black;
          border: 1px solid black;
          cursor: pointer;
        }

        .register-form .footer-link {
          text-align: center;
          font-size: 0.9rem;
          margin-top: 1rem;
          color: #0d6efd;
        }

        @media screen and (max-width: 768px) {
          .left-side {
            display: none;
          }
          .right-side {
            width: 100%;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="left-side"></div>

        <div className="right-side">
          <form onSubmit={handleSubmit} className="register-form">
            <h1>Student Management</h1>
            <h4>CREATE ACCOUNT</h4>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button type="submit">REGISTER</button>

            <div className="or-divider">OR</div>

            <Link to="/login">
              <button type="button" className="login-btn">LOGIN</button>
            </Link>

            
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
