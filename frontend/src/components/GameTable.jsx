import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../services/axios";
// import AddImage from "./addImages";
import "./componentsCss/gametable.css";
import SearchBar from "./SearchBar";

export default function GameTable(idUser) {
  // eslint-disable-next-line react/destructuring-assignment
  const UserId = idUser.idUser;
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  const getGames = async () => {
    try {
      const { data } = await axios.get(`userhasgame/${UserId}`, {
        withCredentials: true,
      });
      setGames(data);
    } catch (err) {
      if (err.response.status === 401) {
        console.error("You're not authenticated");
      } else if (err.response.status === 403) {
        console.error("You're not authorized");
      }
    }
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
    <>
      <SearchBar searchValue={search} setSearchValue={setSearch}>
        chercher{" "}
      </SearchBar>
      <section className="userListGame">
        {games.length ? (
          <>
            {/* // link to detailGame */}
            {games
              .filter((game) =>
                game.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((game) => (
                <figure className="game" key={game.id}>
                  <img
                    src={`${import.meta.env.VITE_IMAGES_URL}${game.photo}`}
                    alt={game.photoDescription}
                  />
                  <figcaption className="game-info">
                    <h3>{game.name}</h3>
                  </figcaption>
                  <div className="game-over">
                    <Link to={`detailGame/${game.id}`}>
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
          </>
        ) : (
          <p>no game</p>
        )}
      </section>
    </>
  );
}
