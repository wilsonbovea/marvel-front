import { Link } from "react-router-dom";
import UserConnection from "./UserConnection";
import { useState } from "react";

const Header = ({ setDisplay }) => {
  return (
    <header>
      <div className="opac">
        <section className="header-sect container">
          <Link to={"/"} className="header-img-div">
            <img src="/marvel-logo-header.png" alt="logo marvel" />
          </Link>
          <div className="buttons-header">
            <Link to={"/"} className="link">
              Personnages
            </Link>
            <Link to={"/comics"} className="link">
              Comics
            </Link>
            <Link className="link">Favoris</Link>
            <button onClick={() => setDisplay(1)} className="link">
              Connexion
            </button>
          </div>
        </section>
      </div>
    </header>
  );
};
export default Header;
