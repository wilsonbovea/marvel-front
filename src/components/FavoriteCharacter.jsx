import { useState } from "react";

import axios from "axios";

const FavoriteCharacter = ({
  cookie,
  getCookie,
  picture,
  name,
  id,
  title,
  setDisplay,
  tabCharacterid,
  tabComicid,
  setFav,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let includeCharacter = "";
  let includeComic = "";
  const onClick = (event) => {
    event.stopPropagation();
    setFav(id);
    getCookie();
    includeCharacter = tabCharacterid.includes(id);
    includeComic = tabComicid.includes(id);
    if (cookie) {
      if (name && !includeCharacter) {
        getCookie();

        const fetchdata = async () => {
          const { data } = await axios.post(
            "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/characters",
            { picture: picture, name: name, id: id, token: cookie },
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          );
        };
        fetchdata();
      } else {
        if (title && !includeComic) {
          const fetchdata = async () => {
            getCookie();
            const { data } = await axios.post(
              "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/comics",
              { picture: picture, title: title, id: id, token: cookie },
              {
                headers: {
                  Authorization: `Bearer ${cookie}`,
                },
              }
            );
          };
          fetchdata();
        }
      }
    } else {
      setDisplay(3);
    }
  };
  return (
    <div className="add-fav" onClick={onClick}>
      <button>add</button>
    </div>
  );
};

export default FavoriteCharacter;
