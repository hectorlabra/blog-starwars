import React, { useContext } from "react";
import { Link } from "react-router-dom";
import star from "../component/img/otra.png";
import { AppContext } from "../store/appContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container-fluid">
        <Link to="/">
          <img className="logo" src={star} alt="Star" />
        </Link>

        <div className="d-flex align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "#000000", borderColor: "#ffffff" }}
            >
              Favoritos ({favorites.length})
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="favoritesDropdown"
            >
              {favorites.length > 0 ? (
                favorites.map((item) => (
                  <li key={item.url}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="favorite-item m-0">{item.name}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromFavorites(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <p className="dropdown-item text-center m-0">
                    No hay personajes <br /> favoritos
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
