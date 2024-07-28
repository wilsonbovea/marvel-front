import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FavoriteCharacter from "../../components/FavoriteCharacter";
const Characters = ({
  search,
  setCount,
  page,
  getCookie,
  cookie,
  setDisplay,
}) => {
  const [dataCharacters, setDataCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";

      if (search) {
        filters = filters + ("name=" + search);
      }
      if (page && search) {
        filters = filters + ("&page=" + page);
      } else if (page && !search) {
        filters = filters + ("page=" + page);
        console.log(filters);
      }
      const { data } = await axios.get(
        "https://site--marvel-backend--7pddggdgmnqf.code.run/characters?" +
          filters
      );
      setCount(Math.ceil(data.count / 100));
      setDataCharacters(data.results);
    };

    fetchData();
    setIsLoading(false);
    getCookie();
  }, [page, search]);
  return isLoading ? (
    <div class="loader"></div>
  ) : (
    <main className="main-characters">
      <div className="opac-main">
        <section className="all-characters">
          {dataCharacters.map((character) => {
            return (
              <div className="relative" key={character._id}>
                <NavLink
                  to={"/comics/" + character._id}
                  className="characters link"
                >
                  <div className="characters-img-div">
                    <img
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt={"character " + character.name}
                    />
                  </div>
                  <div>
                    <h3>{character.name}</h3>
                    <p>{character.description}</p>
                  </div>
                </NavLink>
                <FavoriteCharacter
                  getCookie={getCookie}
                  picture={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  name={character.name}
                  id={character._id}
                  cookie={cookie}
                  setDisplay={setDisplay}
                />
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};
export default Characters;
// { log character
//     "thumbnail": {
//         "path": "http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3",
//         "extension": "jpg"
//     },
//     "comics": [
//         "5fce16bd78edeb0017c939b7",
//         "5fce162378edeb0017c9375a",
//         "5fce170878edeb0017c93abe",
//         "5fce2d4278edeb0017c98de0",
//         "5fce333678edeb0017c9a9b4",
//         "5fce333578edeb0017c9a999",
//         "5fce332478edeb0017c9a975",
//         "5fce332378edeb0017c9a94b",
//         "5fce331378edeb0017c9a926",
//         "5fce331178edeb0017c9a8f3",
//         "5fce330178edeb0017c9a8c4",
//         "5fce14d278edeb0017c931d5",
//         null,
//         null,
//         null,
//         null,
//         "5fce266d78edeb0017c97434",
//         "5fce264f78edeb0017c973ab",
//         "5fce261f78edeb0017c97302",
//         "5fce25eb78edeb0017c97232"
//     ],
//     "_id": "5fcf9222d8a2480017b914af",
//     "name": "Beast",
//     "description": "",
//     "__v": 0
// }
