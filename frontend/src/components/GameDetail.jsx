import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { userContext } from "../contexts/UserContext";
import axios from "../services/axios";
// import AddImage from "./addImages";

function GameDetail() {
  const navigate = useNavigate();
  const { state } = userContext();
  const idParsed = parseInt(useParams().id, 10);
  const [game, setGame] = useState([]);
  const [idPhoto, setIdPhoto] = useState(0);

  const getGame = async () => {
    try {
      await axios.get(`userhasgame/detailGame/${idParsed}`).then((res) => {
        setGame(res.data);
        setIdPhoto(res.data[0].photoId);
      });
    } catch (err) {
      if (err.response.status === 401) {
        console.error("You're not authenticated");
      } else if (err.response.status === 403) {
        console.error("You're not authorized");
      }
    }
  };

  const addGame = async () => {
    const data = {
      users_id: state.id,
      games_id: idParsed,
    };

    try {
      await axios.post("userhasgame/", data);
      navigate("/userhasgame");
    } catch (err) {
      if (err.response.status === 401) {
        console.error("You're not authenticated");
      } else if (err.response.status === 403) {
        console.error("You're not authorized");
      }
    }
  };

  const deleteuserhasgame = async () => {
    try {
      await axios.delete(`userhasgame/${idParsed}`).then(() => {
        navigate(-1);
      });
    } catch (err) {
      if (err.response.status === 401) {
        console.error("You're not authenticated");
      } else if (err.response.status === 403) {
        console.error("You're not authorized");
      }
    }
  };

  const deleteTotalyAdminGame = async () => {
    const idPhotoParsed = parseInt(idPhoto, 10);

    try {
      await axios.delete(`photo/${idPhotoParsed}`);
    } catch (err) {
      if (err.response.status === 401) {
        console.error("You're not authenticated");
      } else if (err.response.status === 403) {
        console.error("You're not authorized");
      }
    }
    try {
      await axios.delete(`userhasgame/${idParsed}`).then(() => {
        navigate(-1);
      });
    } catch (err) {
      if (err.response.status === 401) {
        console.error("You're not authenticated");
      } else if (err.response.status === 403) {
        console.error("You're not authorized");
      }
    }
    try {
      await axios.delete(`game/${idParsed}`).then(() => {});
    } catch (err) {
      if (err.response.status === 401) {
        console.error("You're not authenticated");
      } else if (err.response.status === 403) {
        console.error("You're not authorized");
      }
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div>
      <h1>Game Detail</h1>
      {game[0] ? (
        <>
          <figure className="game show" key={game[0].id}>
            {game[0].photoName ? (
              <img
                src={`${import.meta.env.VITE_IMAGES_URL}${game[0].photoName}`}
                alt={game[0].description}
              />
            ) : (
              <p>no image</p>
            )}
            <figcaption className="game-info">
              <h3>{game[0].gameName}</h3>
            </figcaption>
            <div>
              <h2>Overview: </h2>
              <p> player number : {game[0].playerNumber}</p>
              <p>gamePlay Style : {game[0].gameplayStyle}</p>
              <p>Editor: {game[0].editor}</p>
              <p>Ages : {game[0].ages}</p>
              <p>Duration : {game[0].duration}</p>
            </div>
          </figure>
          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button>
          <br />
          {!state.id ? null : (
            <>
              <button type="button" onClick={addGame}>
                Add to my list
              </button>
              <br />
              <button type="button" onClick={deleteuserhasgame}>
                Delete game from my list
              </button>
            </>
          )}
          <br />
          {state.role !== "ADMIN" ? null : (
            <>
              <button type="button" onClick={deleteTotalyAdminGame}>
                Delete game from database
              </button>
              {/* <AddImage gameId={idParsed} /> */}
            </>
          )}
        </>
      ) : (
        <p>no Access to Data</p>
      )}
    </div>
  );
}

export default GameDetail;
