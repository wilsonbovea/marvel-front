import { useEffect, useState } from "react";

import axios from "axios";
const FavoritesDelete = ({
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
  key,
  fav,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let includeCharacter = "";
  let includeComic = "";

  const onClick = (event) => {
    event.stopPropagation();

    getCookie();
    includeCharacter = tabCharacterid.includes(id);
    includeComic = tabComicid.includes(id);
    if (cookie) {
      if (name && includeCharacter) {
        getCookie();

        const fetchdata = async () => {
          const { data } = await axios.post(
            "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/delete",
            { id: id, token: cookie },
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          );
          setFav(data);
        };
        fetchdata();
      } else {
        if (title && includeComic) {
          console.log(">>>>>> comic delete");
          const fetchdata = async () => {
            getCookie();
            const { data } = await axios.post(
              "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/delete",
              { id: id, token: cookie },
              {
                headers: {
                  Authorization: `Bearer ${cookie}`,
                },
              }
            );
            setFav(data);
            console.log("in fetchdata");
          };
          fetchdata();
        }
      }
    } else {
      setDisplay(3);
    }
  };
  return (
    <div className={"add-fav-delete"} onClick={onClick}>
      <button>added</button>
    </div>
  );
};

export default FavoritesDelete;
