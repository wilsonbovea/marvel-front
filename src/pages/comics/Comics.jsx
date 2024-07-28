import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Comics = ({ search, setCount, page, getCookie }) => {
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

    fetchData();
    setIsLoading(false);
    getCookie();
  }, [search, page]);
  return isLoading ? (
    <div>CHARGEMENT EN COURS ...</div>
  ) : (
    <main className="main-characters">
      <div className="opac-main">
        <section className="all-characters container">
          {dataComics.map((comicsDetails) => {
            return (
              <Link
                to={"/comic/" + comicsDetails._id}
                key={comicsDetails._id}
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
                <p>{comicsDetails.description}</p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
};
export default Comics;
