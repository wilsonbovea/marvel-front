import { useState } from "react";
import Cookies from "js-cookie";
const UserConnection = ({ setDisplay, cookie, setCookie }) => {
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

              // if (location.pathname === "/publish") {
              //   navigate("/");
              // }
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
