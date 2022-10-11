import axios from "axios";
import { useEffect, useState } from "react";
import CardGame from "./CardGame";

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
      {data ? (
        <>
          <CardGame data={data.games[0]} />
          <button type="button" onClick={() => window.location.reload()}>
            New Proposition
          </button>
        </>
      ) : (
        <p>API doesn't work now sorry. Try later</p>
      )}
    </div>
  );
}

export default Appel;
