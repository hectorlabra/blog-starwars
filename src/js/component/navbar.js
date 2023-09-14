import React, { useContext } from "react";
import { Link } from "react-router-dom";
import star from "../component/img/otra.png";
import { AppContext } from "../store/appContext";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container-fluid">
        <Link to="/">
          <img className="logo" src={star} alt="Star"></img>
        </Link>

        <div className="">
          <div className=" dropdown">
            <button
              className=" btndrop dropdown-toggle"
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favoritos ({favorites.length})
            </button>
            <ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
              {favorites.length > 0 ? (
                favorites.map((item) => (
                  <li key={item.url}>
                    <p className="favorite-item">
                      {item.name}
                      <button
                        className="btn-delete"
                        onClick={() => removeFromFavorites(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </p>
                  </li>
                ))
              ) : (
                <li>
                  <p className="dropdown-item text-center">
                    No hay personajes <br />
                    favoritos
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
