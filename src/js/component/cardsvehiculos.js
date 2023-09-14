import React, { useState, useEffect, useContext } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext";

const CardsVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  const isFavorite = (vehiculo) => {
    return favorites.some((fav) => fav.url === vehiculo.url);
  };

  const toggleFavorite = (vehiculo) => {
    if (isFavorite(vehiculo)) {
      removeFromFavorites(vehiculo);
    } else {
      addToFavorites(vehiculo);
    }
  };

  const getVehiculoId = (url) => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : "";
  };

  useEffect(() => {
    fetch("https://swapi.dev/api/vehicles/")
      .then((response) => response.json())
      .then((data) => setVehiculos(data.results));
  }, []);

  return (
    <div className="card-container d-flex flex-wrap justify-content-center">
      {vehiculos.map((vehiculo) => (
        <div
          className="card mb-3 me-3"
          style={{ width: "18rem" }}
          key={vehiculo.url}
        >
          <img
            src={`https://starwars-visualguide.com/assets/img/vehicles/${getVehiculoId(
              vehiculo.url
            )}.jpg`}
            className="card-img-top"
            alt={vehiculo.name}
          />
          <div className="card-body text-white bg-dark">
            <h5 className="card-title">{vehiculo.name}</h5>
            <p className="card-text">Modelo: {vehiculo.model}</p>
            <p className="card-text">Fabricante: {vehiculo.manufacturer}</p>
            <Link
              to={`/vehiculos/${getVehiculoId(vehiculo.url)}`}
              className="btn btn-primary btn-block"
            >
              Aprende más!
            </Link>
            <button
              className={`btn position-absolute bottom-0 end-0 ${
                isFavorite(vehiculo) ? "btn-danger" : "btn-light"
              }`}
              onClick={() => toggleFavorite(vehiculo)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { CardsVehiculos };
