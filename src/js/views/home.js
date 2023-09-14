import React, { useContext } from "react";
import { Navbar } from "../component/navbar";
import { AppContext } from "../store/appContext";
import { CardsPersonajes } from "../component/cardsPersonajes";
import { CardsPlanetas } from "../component/cardsPlanetas";
import { CardsVehiculos } from "../component/cardsvehiculos";

const Home = () => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar
        favorites={favorites}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
      <div className="container mt-5">
        <h1 className="mb-4">Personajes</h1>
        <div className="card-container d-flex flex-nowrap overflow-auto">
          <CardsPersonajes />
        </div>
      </div>

      <div className="container mt-5">
        <h1 className="mb-4">Planetas</h1>
        <div className="card-container d-flex flex-nowrap overflow-auto">
          <CardsPlanetas />
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h1 className="mb-4">Vehiculos</h1>
        <div className="card-container d-flex flex-nowrap overflow-auto">
          <CardsVehiculos />
        </div>
      </div>
    </div>
  );
};

export { Home };
