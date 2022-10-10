/* eslint-disable no-await-in-loop */
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

  const getGamesByuser = async (id) => {
    try {
      const { data } = await axios.get(`userhasgame/${id}`, {
        withCredentials: true,
      });
      const gamesLists = [];
      for (let i = 0; i < data.length; i += 1) {
        gamesLists.push(data[i].name);
      }
      const gamesListConcat = gamesLists.join(", ");
      return gamesListConcat;
    } catch (err) {
      console.error(err);
      // if (err.response.status === 401) {
      //   console.error("You're not authenticated");
      // } else if (err.response.status === 403) {
      //   console.error("You're not authorized");
      // }
    }
    return null;
  };

  useEffect(() => {
    getGamesByuser();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("user", { withCredentials: true });
      for (let i = 0; i < data.length; i += 1) {
        const iduser = parseInt(data[i].id, 10);
        data[i].gamesListConcat = await getGamesByuser(iduser);
      }
      setUsers(data);
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
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="fas fa-user-secret">WORK IN PROGRESS</div>

      <section className="admin">
        {users.length ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>
                  {user.firstname} - {user.lastname}
                </p>
                <p>{user.email}</p>
                {/* {user.role === "USER" && (
                  <>
                    {/* <br />
                    <button type="button" onClick={deleteUser(user.id)}>
                      Delete
                    </button>
                    <br /> */}
                {/* </> */}
                {/* )} */}
                <ul>
                  {!user.gamesListConcat ? (
                    <p>no games</p>
                  ) : (
                    <>
                      <p>game owned :</p>
                      <p>{user.gamesListConcat}</p>
                    </>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Data to display</p>
        )}
      </section>
    </div>
  );
}

export default Admin;
