import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Comics = () => {
  const [dataComics, setDataComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://site--marvel-backend--7pddggdgmnqf.code.run/comics"
      );

      setDataComics(data.results);
    };

    fetchData();
    setIsLoading(false);
  }, []);
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
