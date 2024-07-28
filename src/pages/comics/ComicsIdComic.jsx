import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteCharacter from "../../components/FavoriteCharacter";
const ComicsIdComic = ({ getCookie, cookie, setDisplay }) => {
  const [dataComicsIdComic, setDataComicsIdComic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [urlImg, setUrlImg] = useState("");
  const idComic = useParams();

  const retour = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await await axios.get(
        "https://site--marvel-backend--7pddggdgmnqf.code.run/comic/" +
          idComic.comicId
      );
      setUrlImg(data.thumbnail.path + "." + data.thumbnail.extension);
      setDataComicsIdComic(data);
    };

    fetchData();

    setIsLoading(false);
    getCookie();
  }, []);
  return isLoading ? (
    <div class="loader"></div>
  ) : (
    <main className="main-comic">
      <section className="all-comicId">
        <div key={dataComicsIdComic._id} className="comicId  relative">
          <div className="comicId-img">
            <img src={urlImg} alt="" />
            <FavoriteCharacter
              getCookie={getCookie}
              picture={urlImg}
              title={dataComicsIdComic.title}
              id={dataComicsIdComic._id}
              cookie={cookie}
              setDisplay={setDisplay}
            />
          </div>

          <div className="description-comic">
            <h3>{dataComicsIdComic.title}</h3>
            <p>{dataComicsIdComic.description}</p>
          </div>
        </div>
        <button className="retour" onClick={() => retour()}>
          Retourner
        </button>
      </section>
    </main>
  );
};

export default ComicsIdComic;
