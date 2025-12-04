import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

export const getPokemonList = async (limit = 20): Promise<PokemonListItem[]> => {
  const res = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
  return res.data.results;
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const res = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return res.data;
};