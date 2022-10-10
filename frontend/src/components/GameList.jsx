import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import axios from "../services/axios";
import Addgame from "./Addgame";
import "./componentsCss/gametable.css";
import SearchBar from "./SearchBar";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = userContext();

  const getGames = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`game`, {
        withCredentials: true,
      });
      setGames(res.data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  function checkGameCards() {
    const gamesCards = document.querySelectorAll(".game");
    const triggerBottom = (window.innerHeight / 5) * 4;
    gamesCards.forEach((game) => {
      const gameCardTop = game.getBoundingClientRect().top;
      if (gameCardTop < triggerBottom) {
        game.classList.add("show");
      } else {
        game.classList.remove("show");
      }
    });
  }
  useEffect(() => {
    window.addEventListener("scroll", checkGameCards);
    checkGameCards();
    getGames();
  }, [search]);

  return (
    <div className="gameList">
      {state.id && <Addgame setGames={setGames} />}
      <div>
        <SearchBar searchValue={search} setSearchValue={setSearch} />
      </div>
      {/* <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form> */}
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {!loading && !error && (
        <div className="cardsGamesList">
          {games
            .filter((game) =>
              game.gameName.toLowerCase().includes(search.toLowerCase())
            )
            .map((game) => (
              <figure className="game" key={game.id}>
                {!game.photoName ? (
                  <p>no photo</p>
                ) : (
                  <img
                    src={`${import.meta.env.VITE_IMAGES_URL}${game.photoName}`}
                    alt={game.description}
                  />
                )}
                <figcaption className="game-info">
                  <h3>{game.gameName}</h3>
                </figcaption>
                <div className="game-over">
                  <Link to={`game/${game.id}`}>
                    <h2>Overview: </h2>
                    <p> player number : {game.playerNumber}</p>
                    <p>gamePlay Style : {game.gameplayStyle}</p>
                    <p>Editor: {game.editor}</p>
                    <p>Ages : {game.ages}</p>
                    <p>Duration : {game.duration}</p>
                  </Link>
                </div>
              </figure>
            ))}
        </div>
      )}
    </div>
  );
}
