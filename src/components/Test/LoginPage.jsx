import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import config from "../../config.json";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.apiBaseUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const { token, role } = await res.json();
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/");
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

        .login-form {
          width: 100%;
          max-width: 350px;
        }

        .login-form h2 {
          font-weight: bold;
          margin-bottom: 2rem;
          text-align: center;
        }

        .login-form input {
          width: 100%;
          padding: 10px 15px;
          margin-bottom: 1rem;
          border: none;
          border-bottom: 1px solid black;
          outline: none;
          font-size: 1rem;
        }

        .login-form input::placeholder {
          color: #555;
        }

        .login-form button {
          width: 100%;
          padding: 10px;
          font-weight: bold;
          background-color: black;
          color: white;
          border: none;
          cursor: pointer;
          margin-top: 1rem;
        }

        .login-form .or-divider {
          text-align: center;
          margin: 1rem 0;
          font-size: 0.9rem;
          color: #555;
        }

        .login-form .register-btn {
          width: 100%;
          padding: 10px;
          font-weight: bold;
          background-color: transparent;
          color: black;
          border: 1px solid black;
          cursor: pointer;
        }

        .login-form .forgot {
          font-size: 0.8rem;
          color: #444;
          text-align: right;
          margin-top: -10px;
          margin-bottom: 20px;
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
          <form onSubmit={handleSubmit} className="login-form">
            <h1
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              Student Management
            </h1>
            <h3
              className="text-center"
              style={{ marginBottom: "2rem", fontWeight: 600 }}
            >
              SIGN IN
            </h3>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div
              className="forgot"
              style={{
                textAlign: "right",
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              <Link
                to="/forgot-password"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </div>

            <button type="submit" style={{ marginBottom: "1rem" }}>
              LOGIN
            </button>

            <div className="or-divider">OR</div>

            <Link to="/register">
              <button type="button" className="register-btn">
                REGISTER
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
