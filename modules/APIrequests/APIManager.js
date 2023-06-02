import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const ApiKey = process.env.API_KEY
async function fetchMovieData(text) {
  const url = `http://www.omdbapi.com/?s=${text}&apikey=${ApiKey}`;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData.Search
  } catch (error) {
    throw new Error(`Error fetching movie data: ${error.message}`);
  }
}

export { fetchMovieData };
