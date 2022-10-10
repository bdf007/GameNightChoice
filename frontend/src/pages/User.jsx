import GameTable from "../components/GameTable";
import { userContext } from "../contexts/UserContext";

export default function User() {
  const { state } = userContext();

  return (
    <div className="homePage">
      <div className="username">
        {!state.id ? (
          <p>non connecté</p>
        ) : (
          <>
            <p>Welcome in your GameNight List, {state.username}</p>
            <GameTable idUser={state.id} />
          </>
        )}
      </div>
    </div>
  );
}
