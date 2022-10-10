/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../services/axios";
import gameReducer, { initialGameState } from "../reducers/gameReducer";
import { userContext } from "../contexts/UserContext";
import "@components/componentsCss/addgame.css";

function Addgame({ setGames }) {
  const navigate = useNavigate();
  const [gamestate, dispatch] = useReducer(gameReducer, initialGameState);
  const [file, setFile] = useState("");
  const [fileOverview, setFileOverview] = useState(null);
  const { state } = userContext();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileOverview(URL.createObjectURL(e.target.files[0]));
  };

  const upLoadPhoto = async (idGame) => {
    const photoData = new FormData();
    const fileDescription = file.name;
    photoData.append("description", fileDescription);
    photoData.append("games_id", idGame);
    photoData.append("file", file);
    try {
      await axios.post("photo", photoData).then(() => {
        setFile("");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addUserHasGame = async (idGame) => {
    const userHasGame = {
      users_id: state.id,
      games_id: idGame,
    };
    try {
      await axios.post("userhasgame/", userHasGame, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      return console.error("An image is required");
    }
    if (!gamestate) {
      return console.error("You must fill all the fields");
    }

    const gameData = {
      name: gamestate.name,
      playerNumber: gamestate.playerNumber,
      gameplayStyle: gamestate.gameplayStyle,
      editor: gamestate.editor,
      ages: gamestate.ages,
      duration: gamestate.duration,
    };
    try {
      await axios
        .post("game", gameData)
        .then((res) => res.data)
        .then((data) => {
          upLoadPhoto(data.id);
          addUserHasGame(data.id);
          setFileOverview(null);
          document.getElementById("file").value = null;
          dispatch({ type: "RESET_FORM" });
          navigate("/userhasgame");
          return console.error("Game added successfully");
        });
    } catch (err) {
      if (err?.response?.status === 400) {
        return console.error("Game already exist");
      }
      if (err?.response?.status === 500) {
        return console.error("Server error");
      }
      return console.error(JSON.stringify(err.message));
    }
    return null;
  }

  return (
    <div className="addgameComponent">
      <form className="formAddGame" onSubmit={handleSubmit}>
        <div className="formAddGame__input">
          <label className="inputAddGame" htmlFor="containt">
            Name
            <input
              className="inputAddGame"
              type="text"
              placeholder="Name of game"
              id="containt"
              value={gamestate.name}
              onChange={(e) =>
                dispatch({ type: "UPDATE_NAME", payload: e.target.value })
              }
            />
          </label>
        </div>
        <div className="formAddGame__input">
          <label className="inputAddGame" htmlFor="containt">
            number of player
            <input
              className="inputAddGame"
              type="texte"
              placeholder={gamestate.playerNumber}
              id="containt"
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_PLAYERNUMBER",
                  payload: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div className="formAddGame__input">
          <label className="inputAddGame" htmlFor="containt">
            gameplay Style
            <input
              className="inputAddGame"
              type="text"
              placeholder="cardsGame, placement game..."
              id="containt"
              value={gamestate.gameplayStyle}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_GAMEPLAYSTYLE",
                  payload: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div className="formAddGame__input">
          <label className="inputAddGame" htmlFor="containt">
            Editor
            <input
              className="inputAddGame"
              type="text"
              placeholder="editor..."
              id="containt"
              value={gamestate.editor}
              onChange={(e) =>
                dispatch({ type: "UPDATE_EDITOR", payload: e.target.value })
              }
            />
          </label>
        </div>
        <div className="formAddGame__input">
          <label className="inputAddGame" htmlFor="containt">
            Ages
            <input
              className="inputAddGame"
              type="text"
              placeholder="from 1 to 99"
              id="containt"
              value={gamestate.ages}
              onChange={(e) =>
                dispatch({ type: "UPDATE_AGES", payload: e.target.value })
              }
            />
          </label>
        </div>
        <div className="formAddGame__input">
          <label className="inputAddGame" htmlFor="containt">
            duration
            <input
              className="inputAddGame"
              type="text"
              placeholder="1min to 99h"
              id="containt"
              value={gamestate.duration}
              onChange={(e) =>
                dispatch({ type: "UPDATE_DURATION", payload: e.target.value })
              }
            />
          </label>
        </div>
        <div className="formAddGame__input">
          <label className="inputAddGame" htmlFor="file">
            <input
              name="file"
              className="inputAddGame"
              type="file"
              id="file"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
        <div className="formAddGame__input">
          <button className="inputAddGame" type="submit" onClick={handleSubmit}>
            Add Game
          </button>
        </div>
      </form>
      {fileOverview != null ? <img src={fileOverview} alt="preview" /> : " "}
    </div>
  );
}

export default Addgame;
