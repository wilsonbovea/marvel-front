import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Comics = () => {
  const [dataComics, setDataComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // { log data comics
  //     "thumbnail": {
  //         "path": "http://i.annihil.us/u/prod/marvel/i/mg/9/10/53cd2c7612d2f",
  //         "extension": "jpg"
  //     },
  //     "_id": "5fce13de78edeb0017c92d68",
  //     "title": "100th Anniversary Special (2014) #1",
  //     "description": "Just in time for the release of their SEVENTH epic motion picture, the Guardians of the Galaxy are celebrating their 100th Anniversary...by taking on the THE SILVER GALACTUS!",
  //     "__v": 0
  // }
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
