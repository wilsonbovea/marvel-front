import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

const ComicsIdCharacter = ({ getCookie }) => {
  const [dataComicsIdCharacter, setDataComicsIdCharacter] = useState([]);
  const [dataCharacter, setDataCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const idCharacter = useParams();

  const comics = dataComicsIdCharacter;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://site--marvel-backend--7pddggdgmnqf.code.run/comics/" +
          idCharacter.id
      );

      setDataComicsIdCharacter(data.comics);
      setDataCharacter(data);
    };

    fetchData();

    setIsLoading(false);
    getCookie();
  }, []);
  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <main className="main-comics-characters">
      <div className="opac-main">
        <h1>{dataCharacter.name} Comics</h1>

        <section className="all-comics-characters  container">
          {comics.map((comicsCharacter) => {
            return (
              <NavLink
                className="comics-characters  link"
                key={comicsCharacter._id}
                to={"/comic/" + comicsCharacter._id}
              >
                <div className="comics-characters-img">
                  <img
                    src={
                      comicsCharacter.thumbnail.path +
                      "." +
                      comicsCharacter.thumbnail.extension
                    }
                    alt={"comics Character" + comicsCharacter.name}
                  />
                </div>
                <div className="description">
                  <p>DESCRIPTION</p>
                </div>
              </NavLink>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default ComicsIdCharacter;
