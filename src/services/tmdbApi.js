/**
 * TMDB API Service
 * Handles all API calls to The Movie Database
 * 
 * To get your API key:
 * 1. Go to https://www.themoviedb.org/
 * 2. Create an account
 * 3. Go to Settings > API
 * 4. Request an API key
 */

// Replace this with your actual TMDB API key
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdbApi = {
  /**
   * Search movies by query string
   * @param {string} query - Search term
   * @returns {Promise<Array>} Array of movie objects
   */
  searchMovies: async (query) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}&language=en-US&page=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  /**
   * Get popular movies (used for initial page load)
   * @returns {Promise<Array>} Array of popular movie objects
   */
  getPopularMovies: async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  /**
   * Get detailed information about a specific movie
   * @param {number} movieId - TMDB movie ID
   * @returns {Promise<Object>} Movie details object
   */
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  /**
   * Helper function to construct full image URLs
   * @param {string} path - Image path from TMDB
   * @param {string} size - Image size (w200, w500, original, etc.)
   * @returns {string|null} Full image URL or null
   */
  getImageUrl: (path, size = 'w500') => {
    return path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null;
  },
};

export default tmdbApi;