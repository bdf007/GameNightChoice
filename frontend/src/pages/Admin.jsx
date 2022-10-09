import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import { userContext } from "../contexts/UserContext";
import axios from "../services/axios";

function Admin() {
  const { state } = userContext();
  if (state.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  const [users, setUsers] = useState([]);
  // const [games, setGames] = useState([]);

  // const getGamesByuser = (id) => {
  //   console.log("id getgames", id);
  //   try {
  //     const { data } = axios.get(`userhasgame/user/${id}`, {
  //       withCredentials: true,
  //     });
  //     console.log("data", data);
  //     setGames(data);
  //     console.log("games", data);
  //   } catch (err) {
  //     console.error(err);
  //     // if (err.response.status === 401) {
  //     //   console.error("You're not authenticated");
  //     // } else if (err.response.status === 403) {
  //     //   console.error("You're not authorized");
  //     // }
  //   }
  // };

  // const getListgamesByuser = () => {
  //   console.log("usersgetlist", users);
  //   try {
  //     for (let i = 0; i < users.length; i++) {
  //       const iduser = parseInt(users[i].id, 10);
  //       console.log("iduser", iduser);
  //       getGamesByuser(iduser);
  //       console.log("data", games);
  //       const gameList = games;
  //       users[i].gameList = gameList;
  //     }

  //     setGames([]);
  //   } catch (err) {
  //     console.error(err);
  //     // if (err.response.status === 401) {
  //     //   console.error("You're not authenticated");
  //     // } else if (err.response.status === 403) {
  //     //   console.error("You're not authorized");
  //     // }
  //   }
  // };
  // useEffect(() => {
  //   getGamesByuser();
  // }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("user", { withCredentials: true });
      setUsers(data);
      // getListgamesByuser();
    } catch (err) {
      console.error("err", err);
      // if (err.response.status === 401) {
      //   console.error("You're not authenticated");
      // } else if (err.response.status === 403) {
      //   console.error("You're not authorized");
      // }
    }
  };

  // const deleteUser = async (id) => {
  //   try {
  //     await axios.delete(`user/${id}`, { withCredentials: true });
  //     getUsers();
  //   } catch (err) {
  //     if (err.response.status === 401) {
  //       console.error("You're not authenticated");
  //     } else if (err.response.status === 403) {
  //       console.error("You're not authorized");
  //     }
  //   }
  // };

  useEffect(() => {
    getUsers();
    // getListgamesByuser();
    // getGamesByuser();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <p>coucou admin</p>

      <section>
        {users.length ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.firstname} - {user.lastname} - {user.email}
                {/* {user.role === "USER" && (
                  <>
                    {/* <br />
                    <button type="button" onClick={deleteUser(user.id)}>
                      Delete
                    </button>
                    <br /> */}
                {/* </> */}
                {/* )} */}
                {/* <ul>
                  {user.gameList &&
                    user.gameList.map((game) => (
                      <li key={game.id}>
                        {game.gameName}
                        <br />
                      </li>
                    ))}
                </ul> */}
              </li>
            ))}
          </ul>
        ) : (
          <h2>No Data to display</h2>
        )}
      </section>
    </div>
  );
}

export default Admin;
