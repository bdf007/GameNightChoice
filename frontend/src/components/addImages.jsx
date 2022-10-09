import { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import axios from "@services/axios";
import "./componentsCss/addimage.css";

// eslint-disable-next-line react/prop-types
export default function AddImage({ gameId }) {
  const idGame = gameId;
  const [file, setFile] = useState("");
  const [fileOverview, setFileOverview] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileOverview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      // eslint-disable-next-line no-alert
      return alert("An image is required for the upload");
    }

    // const photoData = new FormData();
    // const fileName = file.name;
    // const fileDescription = fileName;
    // photoData.append("description", JSON.stringify(fileDescription));
    // photoData.append("games_id", idGame);
    // photoData.append("name", fileName);

    const fileName = { name: file.name };
    const fileDescription = { description: JSON.stringify(file.name) };
    const fileGameId = { games_id: idGame };

    const photoData = Object.assign(fileDescription, fileGameId, fileName);
    console.log("photoData", photoData);

    try {
      await axios.post("photo", photoData);
      setFile("");
      setFileOverview(null);
      document.getElementById("file").value = null;
      return console.error("Image uploaded in the server");
    } catch (err) {
      console.error(err);
      return console.error(
        "A connection error has occured with the server ! Try later !"
      );
    }
  };

  return (
    <div className="addimageComponent">
      <form onSubmit={handleSubmit}>
        {" "}
        <br />
        <label className="inputAddImage" htmlFor="file">
          <input
            className="inputAddImage"
            type="file"
            id="file"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
        <br />
        <button className="inputAddImage" type="submit" onClick={handleSubmit}>
          add photo
        </button>
      </form>
      {fileOverview != null ? <img src={fileOverview} alt="preview" /> : " "}
    </div>
  );
}
