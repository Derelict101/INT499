import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="siteHeader">
      <div className="brandGroup">
        <span className="material-symbols-outlined brandIcon">movie</span>

        <div>
          <h1>StreamList</h1>
          <p>Build your personal streaming watch list</p>
        </div>
      </div>

      <nav className="navMenu" aria-label="Main navigation">
        <NavLink to="/" end>
          <span className="material-symbols-outlined">playlist_add</span>
          StreamList
        </NavLink>

        <NavLink to="/movies">
          <span className="material-symbols-outlined">theaters</span>
          Movies
        </NavLink>

        <NavLink to="/cart">
          <span className="material-symbols-outlined">shopping_cart</span>
          Cart
        </NavLink>

        <NavLink to="/about">
          <span className="material-symbols-outlined">info</span>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
