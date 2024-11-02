import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
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
  const [dataFavoritesCharacter, setDataFavoritesCharacter] = useState([]);
  const [dataFavoritesComic, setDataFavoritesComic] = useState([]);
  const [display, setDisplay] = useState(0);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [fav, setFav] = useState("");
  const [page, setPage] = useState(1);
  const [cookie, setCookie] = useState("");
  const [tabCharacterid, setTabCharacterid] = useState([]);
  const [tabComicid, setTabComicid] = useState([]);
  const getCookie = () => {
    const token = Cookies.get("userToken");

    setCookie(token);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCookie();
    if (cookie) {
      const fetchData = async () => {
        const { data } = await axios.get(
          "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/list?" +
            "token=" +
            cookie,
          {
            headers: {
              authorization: `Bearer ${cookie}`,
            },
          }
        );

        setDataFavoritesCharacter(data.character);
        setDataFavoritesComic(data.comic);

        data.character.map((event) => {
          if (!tabCharacterid.includes(event.idCharacter)) {
            tabCharacterid.push(event.idCharacter);
          }
        });
        setTabCharacterid(tabCharacterid);

        data.comic.map((event) => {
          if (!tabComicid.includes(event.idComic)) {
            tabComicid.push(event.idComic);
          }
        });
        setTabComicid(tabComicid);
      };

      fetchData();
      setIsLoading(false);
    }
  }, [cookie, fav]);
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
              setFav={setFav}
              setPage={setPage}
              setCount={setCount}
              page={page}
              getCookie={getCookie}
              cookie={cookie}
              setDisplay={setDisplay}
              tabCharacterid={tabCharacterid}
              tabComicid={tabComicid}
              setTabCharacterid={setTabCharacterid}
              setTabComicid={setTabComicid}
              count={count}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              setFav={setFav}
              fav={fav}
              search={search}
              setCount={setCount}
              page={page}
              getCookie={getCookie}
              cookie={cookie}
              setDisplay={setDisplay}
              tabCharacterid={tabCharacterid}
              tabComicid={tabComicid}
              setTabCharacterid={setTabCharacterid}
              setTabComicid={setTabComicid}
              setPage={setPage}
              count={count}
            />
          }
        />

        <Route
          path="/comics/:id"
          element={<ComicsIdCharacter getCookie={getCookie} />}
        />
        <Route
          path="/comic/:comicId"
          element={
            <ComicsIdComic
              getCookie={getCookie}
              cookie={cookie}
              setDisplay={setDisplay}
              tabCharacterid={tabCharacterid}
              tabComicid={tabComicid}
              setTabCharacterid={setTabCharacterid}
              setTabComicid={setTabComicid}
              setFav={setFav}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              setFav={setFav}
              isLoading={isLoading}
              dataFavoritesCharacter={dataFavoritesCharacter}
              dataFavoritesComic={dataFavoritesComic}
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
