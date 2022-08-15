import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetPokemonDetailQuery,
  useGetPokemonFlavorTextQuery,
} from "../store/api/pokemonApi";
import { PokeballLoading } from "./PokeballLoading";

export const PokedexPanelLeft = () => {
  const [pokemonFlavorText, setPokemonFlavorText] = useState(null);

  const { selectedPokemon } = useSelector((state) => state.pokemon);

  const { data: pokemon, isLoading: loadingPokemonDetails } =
    useGetPokemonDetailQuery(selectedPokemon);

  const { data: flavorText, isLoading: loadingFlavorText } =
    useGetPokemonFlavorTextQuery(selectedPokemon);

  useEffect(() => {
    if (!loadingFlavorText) {
      let findSpanishFlavor = flavorText.flavor_text_entries.find(
        (flavor) => flavor.language.name === "es"
      );

      if (findSpanishFlavor) {
        setPokemonFlavorText(findSpanishFlavor.flavor_text);
      } else {
        setPokemonFlavorText(flavorText.flavor_text_entries[0].flavor_text);
      }
    }
  }, [loadingFlavorText, flavorText]);

  return (
    <div className="panel-left">
      <div className="top-decoration">
        <div className="black-fix"></div>
      </div>
      <div className="content">
        <div className="screen">
          {loadingPokemonDetails ? (
            <div className="loading-container">
              <PokeballLoading />
            </div>
          ) : (
            <>
              <div className="screen-image">
                <img src={pokemon.sprites.front_default} alt="poke-image" />
              </div>
              <div className="screen-title">{`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(
                1
              )}:`}</div>
              {!loadingFlavorText && pokemonFlavorText && (
                <div className="screen-text">
                  {pokemonFlavorText.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
