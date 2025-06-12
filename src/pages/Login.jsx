import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img_1 from "../images/img-3.jpg";
import Hide_Show_Password from "../components/Hide_Show_Password";
import axios from "axios";
import { apiConfig } from "../config";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useNavigate();

  // const Base_URL = sessionStorage.getItem("Base_URL") || "https://midbserver.co.in:5001";

  // const authApiKey = sessionStorage.getItem("authApiKey") || "b986ce110c4e7c523882db76b5rft124";

const Base_URL = apiConfig.getBaseURL();
const authApiKey = apiConfig.getApiKey();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username) {
        setMsg("Username is required");
        return;
      }
      if (!password) {
        setMsg("Password is required");
        return;
      }
      const usernameRegex = /^[a-zA-Z]+$/;
      if (!usernameRegex.test(username.trim())) {
        setMsg("Username must contain only letters");
        return;
      }
      if (password.length < 8 || password.length > 16) {
        setMsg("Password must be 8-16 characters long");
        return;
      }

        if (!Base_URL || !authApiKey) {
      setMsg("Configuration missing. Please refresh or contact support.");
      return;
    }
      const payload = {
        one: username,
        two: password,
      };

      const response = await axios.post(`${Base_URL}/jewell/Login`, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": authApiKey,
        },
      });

      if (response.status === 200) {
        const data = response.data;
         data.portal_id = data.permission_id;
        // Store essential info in sessionStorage
        sessionStorage.setItem("em_id", data.em_id);
        sessionStorage.setItem("portal_id", data.portal_id);

        setMsg("Login successful!");

        // Redirect based on portal_id
        if (data.permission_id == "1") {
          router("/"); // Admin Dashboard
        } else if (data.permission_id == "2") {
          router("/agenthome"); // Agent Dashboard
        } else {
          setMsg("Unauthorized portal access.");
        }
      } else {
        setMsg("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ background: "#f4f7fa", height: "100vh", display: "flex" }}>
      <div
        className="row mx-auto custom-login"
        style={{
          height: "450px",
          marginTop: "7%",
          width: "60%",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        {/* Left side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="w-100 " style={{ maxWidth: "360px" }}>
            <h2 className="mb-5 text-center text-primary">LOG IN</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                {/* <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                /> */}
                <Hide_Show_Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="mb-3 text-end">
                <a
                  href="#"
                  className="text-decoration-none text-primary custom-hover-login-page"
                  style={{ fontSize: "0.9rem" }}
                >
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2">
                Log In
              </button>
              {msg && <p className="text-danger text-center">{msg}</p>}
              <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-primary text-decoration-none custom-hover-login-page"
                >
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
        <div
          className="col-md-6 d-none d-md-flex flex-column align-items-center  text-white"
          style={{
            backgroundImage: `url(${Img_1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1
            className="display-4 "
            style={{ marginTop: "90px", fontWeight: "400" }}
          >
            WELCOME !
          </h1>
          <p className="fs-5">Log in to continue</p>
        </div>
      </div>
    </div>
  );
}
