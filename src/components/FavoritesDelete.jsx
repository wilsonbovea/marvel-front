import { useEffect, useState } from "react";

import axios from "axios";
const FavoritesDelete = ({
  cookie,
  getCookie,
  name,
  id,
  title,
  setDisplay,
  tabCharacterid,
  tabComicid,
  setFav,
  setTabCharacterid,
  setTabComicid,
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
        const fetchdata = async () => {
          getCookie();

          const { data } = await axios.post(
            "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/delete/character",
            { id: id, token: cookie },
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          );
          setFav(data);

          const index = tabCharacterid.indexOf(id);
          tabCharacterid.splice(index, 1);
          setTabCharacterid(tabCharacterid);
        };
        fetchdata();
      } else {
        if (title && includeComic) {
          const fetchdata = async () => {
            getCookie();
            const { data } = await axios.post(
              "https://site--marvel-backend--7pddggdgmnqf.code.run/favorite/delete/comic",
              { id: id, token: cookie },
              {
                headers: {
                  Authorization: `Bearer ${cookie}`,
                },
              }
            );
            setFav(data);
            const index = tabComicid.indexOf(id);
            tabComicid.splice(index, 1);
            setTabComicid(tabComicid);
            console.log("in fetchdata comics");
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
