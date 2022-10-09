import { useReducer, useState } from "react";
import axios from "axios";
import gameReducer, { initialGameState } from "../reducers/gameReducer";

function AddOneGame({ setGames }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [newImg, setNewImg] = useState([]);
  const [fileOverview, setFileOverview] = useState(null);

  const handleFileChange = (e) => {
    setNewImg(e.target.files[0]);
    setFileOverview(URL.createObjectURL(e.target.files[0]));
  };

  const upLoadPhoto = (idGame) => {
    for (let i = 0; i < newImg.length; i++) {
      const newPhoto = new FormData();
      newPhoto.append("image", newImg[i]);
      newPhoto.append("descriptionPhoto", newImg[i].descriptionPhoto);
      newPhoto.append("id", idGame);
      axios
        .post("photo/", newPhoto)
        .then(() => {
          setNewImg("");
          setFileOverview(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = async () => {
    const idGame = state.id;
    if (!newImg) {
      return alert("An image is required");
    }
    if (!state.name) {
      return alert("You must fill all the fields");
    }
    const gameData = {
      name: state.name,
      playerNumber: state.playerNumber,
      gameplayStyle: state.gameplayStyle,
      editor: state.editor,
      ages: state.ages,
      duration: state.duration,
    };
    try {
      console.log("gameData", gameData);
      await axios
        .post("game/", gameData)
        .then((res) => res.data)
        .then((data) => {
          console.log("data", data[0]);
          upLoadPhoto(idGame);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addGame">
      <form onSubmit={handleSubmit}>
        <div className="addGame__input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "UPDATE_NAME", payload: e.target.value })
            }
          />
        </div>
        <div className="addGame__input">
          <label htmlFor="playerNumber">Player number</label>
          <input
            type="text"
            name="playerNumber"
            id="playerNumber"
            value={state.playerNumber}
            onChange={(e) =>
              dispatch({ type: "UPDATE_PLAYERNUMBER", payload: e.target.value })
            }
          />
        </div>
        <div className="addGame__input">
          <label htmlFor="gameplayStyle">Gameplay style</label>
          <input
            type="text"
            name="gameplayStyle"
            id="gameplayStyle"
            value={state.gameplayStyle}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_GAMEPLAYSTYLE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="addGame__input">
          <label htmlFor="editor">Editor</label>
          <input
            type="text"
            name="editor"
            id="editor"
            value={state.editor}
            onChange={(e) =>
              dispatch({ type: "UPDATE_EDITOR", payload: e.target.value })
            }
          />
        </div>
        <div className="addGame__input">
          <label htmlFor="ages">Ages</label>
          <input
            type="text"
            name="ages"
            id="ages"
            value={state.ages}
            onChange={(e) =>
              dispatch({ type: "UPDATE_AGES", payload: e.target.value })
            }
          />
        </div>
        <div className="addGame__input">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={state.duration}
            onChange={(e) =>
              dispatch({ type: "UPDATE_DURATION", payload: e.target.value })
            }
          />
        </div>
        <div className="addGame__input">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        <div className="addGame__input">
          <label htmlFor="descriptionPhoto">Description</label>
          <input
            type="text"
            name="descriptionPhoto"
            id="descriptionPhoto"
            value={state.descriptionPhoto}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_DESCRIPTIONPHOTO",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Add game
        </button>
      </form>
      {fileOverview != null ? <img src={fileOverview} alt="preview" /> : " "}
    </div>
  );
}

export default AddOneGame;
