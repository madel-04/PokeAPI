import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export const generatePokemonImage = async (prompt: string): Promise<string> => {
  const res = await axios.post(`${BACKEND_URL}/generate-image`, { prompt });
  return res.data.imageUrl;
};