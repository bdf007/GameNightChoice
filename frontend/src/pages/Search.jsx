/* eslint-disable import/no-unresolved */
import CardGame from "@components/CardGame";
// import SearchBar from "@components/SearchBar";
// import { useState, useEffect } from "react";
// import axios from "../services/axios";

export default function Search() {
  // const [data, setData] = useState();

  // const searchGame = async () => {
  //   await axios
  //     .get("games")
  //     .then((res) => {
  //       // const games = res.data;

  //       // console.log(res.data);
  //       return setData(res.data);
  //     });
  // };

  // useEffect(() => {
  //   searchGame();
  // }, []);

  // const [searchValue, setSearchValue] = useState();

  return (
    <div className="homePage">
      <h1>GAMENIGHT SEARCHPAGE</h1>
      {/* <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      {/* {data && <CardGame data={data.games[0]} />} */}
    </div>
  );
}
