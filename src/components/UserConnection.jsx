import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const UserConnection = ({ setDisplay, cookie, setCookie }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main
      className="modal"
      onClick={() => {
        setDisplay(0);
      }}
    >
      <div
        className="modal-button"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {!cookie ? (
          <>
            <button onClick={() => setDisplay(2)}>S'inscrire</button>
            <button onClick={() => setDisplay(3)}>Se connecter</button>
          </>
        ) : (
          <button
            onClick={() => {
              Cookies.remove("userToken");

              // setUserToken("");
              setCookie("");

              if (location.pathname === "/favorites") {
                navigate("/");
              }
              window.location.reload();
              setDisplay(0);
            }}
          >
            Se déconnecter
          </button>
        )}
      </div>
    </main>
  );
};
export default UserConnection;
