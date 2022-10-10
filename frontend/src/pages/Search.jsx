import { userContext } from "../contexts/UserContext";
import GameList from "../components/GameList";

export default function Search() {
  const { state } = userContext();

  return (
    <div className="homePage">
      {!state.id ? (
        <h1>GAMENIGHT SEARCHPAGE</h1>
      ) : (
        <h1>GAMENIGHT SEARCH AND ADD PAGE</h1>
      )}
      <GameList />
    </div>
  );
}
