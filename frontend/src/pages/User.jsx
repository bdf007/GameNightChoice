/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Addgame from "../components/Addgame";
import axios from "../services/axios";
import GameTable from "../components/GameTable";
import { userContext } from "../contexts/UserContext";

export default function User() {
  const { state } = userContext();

  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    axios
      .get(`userhasgame/${state.id}`)
      .then((result) => setGames(result.data));
  }, []);
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
