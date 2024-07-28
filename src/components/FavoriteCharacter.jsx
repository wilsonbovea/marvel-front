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
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onClick = (event) => {
    event.stopPropagation();
    getCookie();

    if (cookie) {
      if (name) {
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
