import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublishLoader } from "../PublishLoader/loader";

const Login = ({ setLoginUser, storeToken }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    setLoading(true);
    axios
      .post(`${window.location.origin}/login`, user)
      .then((res) => {
        storeToken(res.data.token);
        setLoginUser(user);
        setLoading(false);
        history.push("/home");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast.error("Failed to log in. Please try again later.");
      });
  };

  return (
    <>
      {loading ? (
        <>
          <PublishLoader />
        </>
      ) : (
        <div className="login">
          <h1>Login</h1>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          ></input>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your Password"
          ></input>
          <div className="button" onClick={login}>
            Login
          </div>
          <div>or</div>
          <div className="button" onClick={() => history.push("/register")}>
            Register
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
