const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  firstname: "",
  lastname: "",
  role: "USER",
};

const registerUserReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "UPDATE_USERNAME":
      return { ...state, username: action.payload };
    case "UPDATE_FIRSTNAME":
      return { ...state, firstname: action.payload };
    case "UPDATE_LASTNAME":
      return { ...state, lastname: action.payload };
    case "UPDATE_ROLE":
      return { ...state, role: action.payload };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
};

export default registerUserReducer;
export { initialState };
