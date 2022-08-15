import axios from "axios";
import { setError, setLoading, setPokemons } from "./pokemonSlice";

export const getPokemons = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(setLoading());

    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page * 12}`)
      .then((res) => {
        dispatch(setPokemons({ page: page + 1, pokemons: res.data.results }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setError(err));
      });
  };
};
