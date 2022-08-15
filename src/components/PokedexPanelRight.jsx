import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, setSelectedPokemon } from "../store/slices/pokemon";
import { PokeballLoading } from "./PokeballLoading";

export const PokedexPanelRight = () => {
  const dispatch = useDispatch();

  const {
    loading,
    pokemons = [],
    page,
  } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div className="panel-right">
      <div className="content">
        {loading ? (
          <div className="loading-container">
            <PokeballLoading />
          </div>
        ) : (
          <div className="buttons-container">
            <div className="buttons-grid">
              {pokemons.map((pokemon, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    dispatch(setSelectedPokemon(pokemon.name));
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                    }.png`}
                    alt={pokemon.name}
                  />
                </button>
              ))}
            </div>
            <div className="pagination">
              <div
                className="triangle prev-button"
                onClick={() => {
                  if (page !== 1) {
                    dispatch(getPokemons(page - 2));
                  }
                }}
              ></div>
              <div className="page-number">{page}</div>
              <div
                className="next-button"
                onClick={() => {
                  dispatch(getPokemons(page));
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
