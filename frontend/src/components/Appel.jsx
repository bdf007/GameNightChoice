import axios from "axios";
import { useEffect, useState } from "react";
import CardGame from "./CardGame";
// import SearchBar from "./SearchBar";

function Appel() {
  const [data, setData] = useState();
  // eslint-disable-next-line consistent-return
  const radomGame = async () => {
    try {
      await axios
        .get(
          "https://api.boardgameatlas.com/api/search?random=true&client_id=073Uwaw73T"
        )
        .then((res) => {
          // const games = res.data;
          return setData(res.data);
        });
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line no-alert
      return alert(
        "A connection error has occured with the server ! Try later !"
      );
    }
  };

  useEffect(() => {
    radomGame();
  }, []);

  return (
    <div className="appelHome">
      {/* <h1>APPEL API BOARDGAMEATLAS</h1> */}
      {data ? (
        <CardGame data={data.games[0]} />
      ) : (
        <p>L'API n'est pas disponible actuellement</p>
      )}
    </div>
  );
}

export default Appel;
