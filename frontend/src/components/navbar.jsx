import { useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import axios from "../services/axios";
// eslint-disable-next-line import/no-unresolved
import "@components/componentsCss/navbar.css";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const { state, dispatch } = userContext();

  const handleDisconnect = async () => {
    // if (window.confirm("Are you sure you want to disconnect?")) {
    try {
      await axios.get("/user/logout", { withCredentials: true });
      console.error("You're disconnected");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  // console.warn(handleShowLinks);
  return (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
      <ul className="navbar_links">
        <li className="navbar_item slideInDown-1">
          <Link
            to="/"
            className="navbar_link fas fa-home"
            onClick={handleShowLinks}
          >
            {/* Home */}
          </Link>
        </li>
        <li className="navbar_item slideInDown-2">
          {!state.id ? (
            <Link
              to="/login"
              className="navbar_link fas fa-user"
              onClick={handleShowLinks}
            >
              {/* Login */}
            </Link>
          ) : (
            <Link
              to="/home"
              onClick={({ handleDisconnect }, { handleShowLinks })}
              className="navbar_link fas fa-power-off"
            >
              {/* Logout */}
            </Link>
          )}
        </li>
        {!state.id && (
          <li className="navbar_item slideInDown-3">
            <Link
              to="/register"
              className="navbar_link fas fa-user-plus"
              onClick={handleShowLinks}
            >
              {/* Register */}
            </Link>
          </li>
        )}
        <li className="navbar_item slideInDown-4">
          {!state.id ? (
            <Link
              to="/search"
              className="navbar_link fas fa-search"
              onClick={handleShowLinks}
            >
              {/* Search */}
            </Link>
          ) : (
            <Link
              to="/search"
              className="navbar_link fas fa-search-plus"
              onClick={handleShowLinks}
            >
              {/* Search and Add */}
            </Link>
          )}
        </li>
        {state.id && (
          <li className="navbar_item slideInDown-5">
            <Link
              to="/userhasgame"
              className="navbar_link fas fa-gamepad"
              onClick={handleShowLinks}
            >
              {/* User */}
            </Link>
          </li>
        )}
        {state.role === "ADMIN" && (
          <li className="navbar_item slideInDown-6">
            <Link
              to="/admin"
              className="navbar_link fas fa-user-shield"
              onClick={handleShowLinks}
            >
              {/* Admin */}
            </Link>
          </li>
        )}
      </ul>
      <button type="button" className="navbar_burger" onClick={handleShowLinks}>
        <span className="burger-bar" />
      </button>
    </nav>
  );
}
