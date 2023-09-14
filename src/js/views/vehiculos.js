import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../store/appContext";
import { Navbar } from "../component/navbar";

const Vehiculos = () => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  const { theid } = useParams();

  const [vehiculos, setVehiculos] = useState(null);

  const isFavorite =
    vehiculos && favorites.some((fav) => fav.id === vehiculos.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(vehiculos);
    } else {
      addToFavorites(vehiculos);
    }
  };

  useEffect(() => {
    fetch(`https://swapi.dev/api/vehicles/${theid}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error");
        }
        return response.json();
      })
      .then((data) => {
        // Guarda los detalles del vehiculo en el estado
        setVehiculos(data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle details:", error);
      });
  }, [theid]);

  const getVehiculoImage = () => {
    if (!vehiculos) return null;
    const vehiculoId = vehiculos?.url?.split("/").filter(Boolean).slice(-1)[0];
    return `https://starwars-visualguide.com/assets/img/vehicles/${vehiculoId}.jpg`;
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      <div className="container-fluid">
        <Navbar
          favorites={favorites}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      </div>
      {vehiculos ? (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <img
                src={getVehiculoImage()}
                className="img-fluid rounded-start w-100"
                alt={vehiculos.name}
              />
            </div>
            <div className="col-12 col-md-8">
              <div className="card-body-single text-center m-5">
                <h1 className="card-title">{vehiculos.name}</h1>
                <p className="card-text">
                  <b>Modelo:</b> {vehiculos.model}
                </p>
                <p className="card-text">
                  <b>Fabricante:</b> {vehiculos.manufacturer}
                </p>
                <p className="card-text">
                  <b>Costo en Crédito:</b> {vehiculos.cost_in_credits}
                </p>
                <p className="card-text">
                  <b>Pasajeros:</b> {vehiculos.passengers}
                </p>
                <p className="card-text">
                  <b>Clase de vehículo:</b> {vehiculos.vehicle_class}
                </p>
                <p className="card-text">
                  <b>Capacidad de carga:</b> {vehiculos.cargo_capacity}
                </p>
                <p className="card-text">
                  <b>Longitud:</b> {vehiculos.length}
                </p>
                <p className="card-text">
                  <b>Consumibles:</b> {vehiculos.consumables}
                </p>

                <button
                  className={`btn btn-${isFavorite ? "danger" : "success"}`}
                  onClick={handleToggleFavorite}
                >
                  {isFavorite ? "Eliminar de favoritos" : "Agregar a favorito"}
                </button>
                <br />
                <br />
                <button className="btn btn-light">
                  <Link to="/">Volver</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-white text-center">
          {vehiculos === null ? "Cargando..." : "Vehículo no encontrado"}
        </h2>
      )}
    </div>
  );
};

export { Vehiculos };
