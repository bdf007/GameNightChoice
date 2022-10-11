/* eslint-disable no-param-reassign */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { userContext } from "../contexts/UserContext";
import "../App.css";

export default function Login() {
  useEffect(() => {
    const labels = document.querySelectorAll(".form-control label");

    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (letter, idx) =>
            `<span style="transition-delay:${idx * 100}ms">${letter}</span>`
        )
        .join("");
    });
  }, []);

  const { dispatch } = userContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return console.warn("you must provide an email and a password");
    }
    try {
      const { data } = await axios.post("user/login", userData, {
        withCredentials: true,
      });
      setUserData({ email: ", password:" });
      dispatch({ type: "LOGIN", payload: data });
      if (data.role === "ADMIN" || data.role === "USER") {
        return navigate("/userhasgame");
      }
    } catch (err) {
      return console.warn(err.message);
    }
    return null;
  };

  return (
    <div className="homePage">
      <div className="homeAppel">
        <section className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h1 className="login-title">Log in</h1>
            <div className="form-control">
              <input
                type="email"
                className="login-input"
                id="email"
                value={userData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email :</label>
            </div>
            <div className="form-control">
              <input
                type="password"
                className="login-input"
                id="password"
                // placeholder="your password"
                value={userData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-control">
              <button className="login-btn" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
