import React, { useContext, useState, useEffect } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext";

const CardsPersonajes = ({ getActions }) => {
  const [characters, setCharacters] = useState([]);

  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  const isFavorite = (character) => {
    return favorites.some((fav) => fav.url === character.url);
  };

  const toggleFavorite = (character) => {
    if (isFavorite(character)) {
      removeFromFavorites(character);
    } else {
      addToFavorites(character);
    }
  };

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleLearnMore = (characterId) => {
    fetch(`https://swapi.dev/api/people/${characterId}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Character details:", data);
      })
      .catch((error) => {
        console.error("Error fetching character details:", error);
      });
  };

  return (
    <div className="card-container d-flex flex-wrap justify-content-center">
      {characters.map((character) => (
        <div
          className="card mb-3 me-3"
          style={{ width: "18rem" }}
          key={character.url}
        >
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${getCharacterId(
              character.url
            )}.jpg`}
            className="card-img-top"
            alt={character.name}
          />
          <div className="card-body text-white bg-dark">
            <h5 className="card-title">{character.name}</h5>
            <p className="card-text">
              Altura: {character.height} cm
              <br />
              Peso: {character.mass} kg
              <br />
              Color de pelo: {character.hair_color}
              <br />
            </p>
            <Link
              to={`/personajes/${getCharacterId(character.url)}`}
              className="btn btn-primary btn-block"
              onClick={() => handleLearnMore(getCharacterId(character.url))}
            >
              Aprende más!
            </Link>
            <button
              className={`btn position-absolute bottom-0 end-0 ${
                isFavorite(character) ? "btn-danger" : "btn-light"
              }`}
              onClick={() => toggleFavorite(character)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const getCharacterId = (url) => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : "";
};

export { CardsPersonajes };
