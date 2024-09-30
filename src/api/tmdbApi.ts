import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US', 
  },
});

export const fetchPopularMovies = async () => {
  const response = await tmdbApi.get('/movie/popular');
  return response.data.results;
};

export const searchMovies = async (query: string) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};
