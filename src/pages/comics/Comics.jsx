import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteCharacter from "../../components/FavoriteCharacter";
import FavoritesDelete from "../../components/FavoritesDelete";
const Comics = ({
  search,
  setCount,
  page,
  getCookie,
  cookie,
  setDisplay,
  tabCharacterid,
  tabComicid,
  setPage,
  count,
  setFav,
  fav,
}) => {
  const [dataComics, setDataComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";

      if (search) {
        filters = filters + ("title=" + search);
      }
      if (page && search) {
        filters = filters + ("&page=" + page);
      } else if (page && !search) {
        filters = filters + ("page=" + page);
      }
      const { data } = await axios.get(
        "https://site--marvel-backend--7pddggdgmnqf.code.run/comics?" + filters
      );

      setCount(Math.ceil(data.count / 100));
      setDataComics(data.results);
    };
    if (count < page) {
      setPage(1);
    }
    fetchData();
    setIsLoading(false);
    getCookie();
  }, [search, page, count, fav]);
  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <main className="main-characters">
      <div className="opac-main">
        <section className="all-characters container">
          {dataComics.map((comicsDetails) => {
            return (
              <div
                onClick={() => setFav(comicsDetails._id)}
                className="relative"
                key={comicsDetails._id}
              >
                <Link
                  to={"/comic/" + comicsDetails._id}
                  className="comics-all link"
                >
                  <div className="comics-img">
                    <img
                      src={
                        comicsDetails.thumbnail.path +
                        "." +
                        comicsDetails.thumbnail.extension
                      }
                      alt={comicsDetails.title}
                    />
                  </div>
                  <h3>{comicsDetails.title}</h3>
                  <p className="display-hide-2">{comicsDetails.description}</p>
                  <div className="display-hide">
                    <p>DESCRIPTION</p>
                  </div>
                </Link>
                {!tabComicid.includes(comicsDetails._id) ? (
                  <FavoriteCharacter
                    getCookie={getCookie}
                    setFav={setFav}
                    picture={
                      comicsDetails.thumbnail.path +
                      "." +
                      comicsDetails.thumbnail.extension
                    }
                    fav={fav}
                    title={comicsDetails.title}
                    id={comicsDetails._id}
                    cookie={cookie}
                    setDisplay={setDisplay}
                    tabCharacterid={tabCharacterid}
                    tabComicid={tabComicid}
                    key={comicsDetails._id}
                  />
                ) : (
                  <FavoritesDelete
                    getCookie={getCookie}
                    setFav={setFav}
                    title={comicsDetails.title}
                    id={comicsDetails._id}
                    cookie={cookie}
                    setDisplay={setDisplay}
                    tabCharacterid={tabCharacterid}
                    tabComicid={tabComicid}
                  />
                )}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};
export default Comics;
