import { Link } from "react-router-dom";

const Header = ({ setDisplay, setSearch, count, page, setPage }) => {
  return (
    <header>
      <div className="opac">
        <section className="header-sect container">
          <Link to={"/"} className="header-img-div">
            <img src="/marvel-logo-header.png" alt="logo marvel" />
          </Link>
          <label htmlFor="search" className="label-search">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Rechercher"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </label>

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
          <div className="affice-page">
            <p>PAGE :</p>
            {count === 1 ? (
              <p>1</p>
            ) : (
              <input
                min={1}
                type="number"
                defaultValue={page || 1}
                onChange={(event) => {
                  setPage(event.target.value);
                }}
              />
            )}

            <p>/ {count}</p>
          </div>
        </section>
      </div>
    </header>
  );
};
export default Header;
