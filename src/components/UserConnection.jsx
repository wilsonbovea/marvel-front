import { useState } from "react";

const UserConnection = ({ setDisplay }) => {
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
        <button onClick={() => setDisplay(2)}>S'inscrire</button>
        <button onClick={() => setDisplayConnect(3)}>Se connecter</button>
      </div>
    </main>
  );
};
export default UserConnection;
