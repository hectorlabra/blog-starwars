import React, { useContext, useState, useEffect } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext";

const CardsPlanetas = () => {
  const [planetas, setPlanetas] = useState([]);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  const isFavorite = (planeta) => {
    return favorites.some((fav) => fav.url === planeta.url);
  };

  const toggleFavorite = (planeta) => {
    if (isFavorite(planeta)) {
      removeFromFavorites(planeta);
    } else {
      addToFavorites(planeta);
    }
  };

  const getPlanetaId = (url) => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : "";
  };

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((response) => response.json())
      .then((data) => setPlanetas(data.results));
  }, []);

  const handleLearnMore = (planetaId) => {
    fetch(`https://swapi.dev/api/planets/${planetaId}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Planeta details:", data);
      })
      .catch((error) => {
        console.error("Error fetching planeta details:", error);
      });
  };

  return (
    <div className="card-container d-flex flex-wrap justify-content-center">
      {planetas.map((planeta) => (
        <div
          className="card mb-3 me-3"
          style={{ width: "18rem" }}
          key={planeta.url}
        >
          <img
            src={`https://starwars-visualguide.com/assets/img/planets/${getPlanetaId(
              planeta.url
            )}.jpg`}
            className="card-img-top"
            alt={planeta.name}
          />
          <div className="card-body text-white bg-dark">
            <h5 className="card-title">{planeta.name}</h5>
            <p className="card-text">Clima: {planeta.climate}</p>
            <p className="card-text">Terreno: {planeta.terrain}</p>
            <Link
              to={`/planeta/${getPlanetaId(planeta.url)}`}
              className="btn btn-primary btn-block"
              onClick={() => handleLearnMore(getPlanetaId(planeta.url))}
            >
              Aprende más!
            </Link>
            <button
              className={`btn position-absolute bottom-0 end-0 ${
                isFavorite(planeta) ? "btn-danger" : "btn-light"
              }`}
              onClick={() => toggleFavorite(planeta)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { CardsPlanetas };
