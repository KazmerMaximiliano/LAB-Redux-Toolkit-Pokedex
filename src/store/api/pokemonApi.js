import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2",
  }),
  endpoints: (builder) => ({
    getPokemonDetail: builder.query({
      query: (pokemonID = 1) => `pokemon/${pokemonID}`,
    }),

    getPokemonFlavorText: builder.query({
      query: (pokemonID = 1) => `pokemon-species/${pokemonID}/`,
    }),
  }),
});

export const { useGetPokemonDetailQuery, useGetPokemonFlavorTextQuery } =
  pokemonApi;
