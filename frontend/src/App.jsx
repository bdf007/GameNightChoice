import { Routes, Route } from "react-router-dom";
import GameDetail from "./components/GameDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import RegisterUser from "./pages/RegisterUser";
import Admin from "./pages/Admin";
import "./App.css";
// import Search from "@pages/Search";
import { userContext } from "./contexts/UserContext";
import Navbar from "./components/navbar";
import GameList from "./pages/GameList";

function App() {
  const { state } = userContext();
  return (
    <div className="App">
      <Navbar />
      <div className="game-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/search" element={<GameList />} />
          <Route path="/search/game/:id" element={<GameDetail />} />
          <Route path="/detailGame/:id" element={<GameDetail />} />
          {state.id && (
            <>
              <Route path="/search/game/:id" element={<GameDetail />} />
              <Route path="/userhasgame" element={<User />} />
              <Route
                path="/userhasgame/detailGame/:id"
                element={<GameDetail />}
              />
              {state.role === "ADMIN" && (
                <Route path="/admin" element={<Admin />} />
              )}
            </>
          )}

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
