import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ComicsIdComic = () => {
  const [dataComicsIdComic, setDataComicsIdComic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [urlImg, setUrlImg] = useState("");
  const idComic = useParams();

  console.log(dataComicsIdComic, urlImg);

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
  }, []);
  return isLoading ? (
    <div>CHARGEMENT EN COURS ...</div>
  ) : (
    <main className="main-comic">
      <section className="all-comicId">
        <div key={dataComicsIdComic._id} className="comicId">
          <div className="comicId-img">
            <img src={urlImg} alt="" />
          </div>
          <div>
            <h3>{dataComicsIdComic.title}</h3>
            <p>{dataComicsIdComic.description}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ComicsIdComic;
