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

function App() {
  const [display, setDisplay] = useState(0);
  console.log(display);
  return (
    <Router>
      <Header setDisplay={setDisplay} />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />

        <Route path="/comics/:id" element={<ComicsIdCharacter />} />
        <Route path="/comic/:comicId" element={<ComicsIdComic />} />
      </Routes>
      {display === 1 && <UserConnection setDisplay={setDisplay} />}
      {display === 2 && <Signup setDisplay={setDisplay} />}
    </Router>
  );
}

export default App;
