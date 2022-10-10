/* eslint-disable no-param-reassign */
import { useEffect, useReducer } from "react";
import * as yup from "yup";
import registerUserReducer, {
  initialState,
} from "../reducers/registerUserReducer";
import axios from "../services/axios";
import "../App.css";

const roles = ["ADMIN", "USER"];

// password must contain almost one upper case, one lower case, a number and a special character contained in [!@#$%^&*], and have 8 to 32 characters
const schemaForCreation = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain almost one upper case, one lower case, one number and a special character contained in [!@#$%^&*]"
    )
    .min(8, "Password must be almost 8 characters")
    .max(32, "Password must be max 32 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Confirm Password must contain almost one upper case, one lower case, one number and a special character contained in [!@#$%^&*]"
    )
    .min(8, "Confirm Password and Password must be almost 8 characters")
    .max(32, "Confirm Password and Password must be max 32 characters")
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Password and Confirm Password must match"),
  email: yup
    .string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
  username: yup.string().required("username is required"),
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  role: yup.string().oneOf(roles),
});

export default function RegisterUser() {
  const [state, dispatch] = useReducer(registerUserReducer, initialState);
  // . fonction permettant un effet de vague sur les libellés ..//
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schemaForCreation.validate(state);

      await axios.post("user/register", {
        email: state.email,
        password: state.password,
        role: "USER",
        username: state.username,
        firstname: state.firstname,
        lastname: state.lastname,
      });
      dispatch({ type: "RESET_FORM" });
      // eslint-disable-next-line no-alert
      return alert("User registered successfully");
    } catch (err) {
      if (err?.response?.status === 400) {
        // eslint-disable-next-line no-alert
        return alert("Email already used");
      }
      // eslint-disable-next-line no-alert
      return alert(JSON.stringify(err.message));
    }
  };

  return (
    <div className="homePage">
      <div className="homeAppel grid-item fieldsGrid">
        <section className="login-container">
          <form className="fields " onSubmit={handleSubmit}>
            <h1 className="login-title loginGrid">Sign Up</h1>
            <div className="grid-item emailGrid form-control">
              <input
                className="login-input"
                id="email"
                // placeholder="your email"
                type="email"
                required
                value={state.email}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_EMAIL",
                    payload: e.target.value,
                  })
                }
              />
              <label htmlFor="email">Email: </label>
            </div>
            <div className="grid-item passwordGrid form-control">
              <input
                className="login-input"
                id="password"
                // placeholder="your password"
                type="password"
                required
                value={state.password}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PASSWORD",
                    payload: e.target.value,
                  })
                }
              />
              <label htmlFor="password" className="grid-item passwordGrid">
                Password:{" "}
              </label>
            </div>
            <div className="grid-item usernameGrid form-control">
              <input
                className="login-input"
                id="username"
                // placeholder="your username"
                type="username"
                required
                value={state.username}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_USERNAME",
                    payload: e.target.value,
                  })
                }
              />
              <label htmlFor="username">Username: </label>{" "}
            </div>
            <div className="grid-item confirmPasswordGrid form-control">
              <input
                className="login-input"
                id="confirmPassword"
                // placeholder="confirm your password"
                type="password"
                required
                value={state.confirmPassword}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_CONFIRM_PASSWORD",
                    payload: e.target.value,
                  })
                }
              />
              <label htmlFor="password">Confirm Password: </label>
            </div>
            <div className="grid-item firstnameGrid form-control">
              <input
                className="login-input"
                id="firstname"
                // placeholder="your firstname"
                type="firstname"
                required
                value={state.firstname}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIRSTNAME",
                    payload: e.target.value,
                  })
                }
              />
              <label htmlFor="firstname">Firstname: </label>{" "}
            </div>
            <div className="grid-item lastnameGrid form-control">
              <input
                className="login-input"
                id="lastname"
                // placeholder="your lastname"
                type="lastname"
                required
                value={state.lastname}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_LASTNAME",
                    payload: e.target.value,
                  })
                }
              />
              <label htmlFor="lastname">Lastname: </label>
            </div>
            <div className="grid-item loginBtnGrid">
              <div className="form-control">
                <button className="login-btn" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
