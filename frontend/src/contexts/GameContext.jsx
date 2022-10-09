import { createContext, useContext, useReducer } from "react";
// eslint-disable-next-line import/no-unresolved
import gameReducer, { initialGameState } from "../reducers/gameReducer";

const GameContext = createContext();
// console.warn(initialState);

// eslint-disable-next-line react/prop-types
function GameContextProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

const gameContext = () => useContext(GameContext);

export default GameContext;
export { GameContextProvider, gameContext };
