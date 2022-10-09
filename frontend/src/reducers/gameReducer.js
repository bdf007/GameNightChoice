const initialGameState = {
  id: null,
  name: "",
  playerNumber: "",
  gameplayStyle: "",
  editor: "",
  ages: "",
  duration: "",
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "ID_GAME":
      return { ...state, id: action.payload };
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_PLAYERNUMBER":
      return { ...state, playerNumber: action.payload };
    case "UPDATE_GAMEPLAYSTYLE":
      return { ...state, gameplayStyle: action.payload };
    case "UPDATE_EDITOR":
      return { ...state, editor: action.payload };
    case "UPDATE_AGES":
      return { ...state, ages: action.payload };
    case "UPDATE_DURATION":
      return { ...state, duration: action.payload };
    case "RESET_FORM":
      return { ...initialGameState };
    default:
      return state;
  }
};

export default gameReducer;
export { initialGameState };
