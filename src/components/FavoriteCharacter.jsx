import axios from "axios";
import { useState, useEffect } from "react";

const FavoriteCharacter = ({
  cookie,
  getCookie,
  picture,
  name,
  id,
  title,
  setDisplay,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const onClick = (event) => {
    event.stopPropagation();
    getCookie();
    if (cookie) {
      if (name) {
        const fetchData = async () => {
          const { data } = await axios.post(
            "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/characters",
            { picture: picture, name: name, id: id },
            {
              headers: {
                authorization: `Bearer ${cookie}`,
              },
            }
          );
        };
        fetchData();
      } else {
        const fetchData = async () => {
          const { data } = await axios.post(
            "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/comics",
            { picture: picture, title: title, id: id },
            {
              headers: {
                authorization: `Bearer ${cookie}`,
              },
            }
          );
        };
        fetchData();
      }
    } else {
      return setDisplay(3);
    }

    setIsLoading(false);
  };
  return (
    <div className="add-fav" onClick={onClick}>
      <button>add</button>
    </div>
  );
};
export default FavoriteCharacter;
