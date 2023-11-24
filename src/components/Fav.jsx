import { useState } from "react";

export function Fav() {
  const [fav, setFav] = useState(false);

  const HandleFav = () => {
    if (fav === false) {
      setFav(true);
    } else {
      setFav(false);
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={fav ? "#FF0000" : "currentColor"}
        className="bi bi-heart-fill"
        viewBox="0 0 16 16"
        onClick={HandleFav}
      >
        <path
          fill-rule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        />
      </svg>
    </>
  );
}