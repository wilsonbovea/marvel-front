import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Comics from "./pages/comics/Comics";
import Characters from "./pages/character/Characters";
import ComicsIdComic from "./pages/comics/ComicsIdComic";
import ComicsIdCharacter from "./pages/comics/ComicsId";
import Header from "./components/Header";
import UserConnection from "./components/UserConnection";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cookies from "js-cookie";
import Favorites from "./pages/Favorites";
function App() {
  const [display, setDisplay] = useState(0);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [cookie, setCookie] = useState("");
  const getCookie = () => {
    const token = Cookies.get("userToken");

    setCookie(token);
  };
  console.log(cookie);
  return (
    <Router>
      <Header
        setDisplay={setDisplay}
        setSearch={setSearch}
        count={count}
        page={page}
        setPage={setPage}
        cookie={cookie}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              search={search}
              setCount={setCount}
              page={page}
              getCookie={getCookie}
              cookie={cookie}
              setDisplay={setDisplay}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              search={search}
              setCount={setCount}
              page={page}
              getCookie={getCookie}
              cookie={cookie}
              setDisplay={setDisplay}
            />
          }
        />

        <Route
          path="/comics/:id"
          element={<ComicsIdCharacter getCookie={getCookie} />}
        />
        <Route
          path="/comic/:comicId"
          element={<ComicsIdComic getCookie={getCookie} />}
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              search={search}
              setCount={setCount}
              page={page}
              getCookie={getCookie}
              cookie={cookie}
            />
          }
        />
      </Routes>
      {display === 1 && (
        <UserConnection
          setDisplay={setDisplay}
          cookie={cookie}
          setCookie={setCookie}
        />
      )}
      {display === 2 && (
        <Signup setDisplay={setDisplay} getCookie={getCookie} />
      )}
      {display === 3 && <Login setDisplay={setDisplay} getCookie={getCookie} />}
    </Router>
  );
}

export default App;
