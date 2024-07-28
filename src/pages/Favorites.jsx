import axios from "axios";
import { useEffect, useState } from "react";
const Favorites = ({ search, cookie, getCookie }) => {
  const [dataFavoritesCharacter, setDataFavoritesCharacter] = useState([]);
  const [dataFavoritesComic, setDataFavoritesComic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCookie();
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
    };

    fetchData();
    setIsLoading(false);
  }, [cookie]);
  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <main className="main-characters">
      <div className="opac-fav">
        <section className="all-fav-character container">
          <h2>Favorites characters</h2>
          {dataFavoritesCharacter.map((character) => {
            return (
              <div key={character._id} className="fav-character">
                <div className="img-fav-character">
                  <img src={character.picture} alt={character.name} />
                </div>
                <h3>{character.name}</h3>
              </div>
            );
          })}
        </section>
        <section className="all-fav-character container">
          <h2>Favorites comics</h2>
          {dataFavoritesComic.map((comic) => {
            return (
              <div key={comic._id} className="fav-character">
                <div className="img-fav-character">
                  <img src={comic.picture} alt={comic.title} />
                </div>

                <h3>{comic.title}</h3>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};
export default Favorites;
