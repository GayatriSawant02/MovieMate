import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import tmdbApi from '../services/tmdbApi';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * Home Page Component
 * Main page that displays popular movies or search results
 */
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load popular movies on initial render
  useEffect(() => {
    loadPopularMovies();
  }, []);

  /**
   * Load popular movies from TMDB
   */
  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const popularMovies = await tmdbApi.getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle search functionality
   * @param {string} query - Search query string
   */
  const handleSearch = async (query) => {
    // If query is empty, load popular movies
    if (!query || query.trim() === '') {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await tmdbApi.searchMovies(query);
      
      if (searchResults.length === 0) {
        setError('No movies found. Try a different search term.');
      }
      
      setMovies(searchResults);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Header with search */}
      <Header
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Page Title */}
          <h2 className="page-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <Loader2 className="loading-spinner" />
              <p className="loading-text">Loading movies...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-container">
              <AlertCircle className="error-icon" />
              <p className="error-text">{error}</p>
            </div>
          )}

          {/* Movie List */}
          {!loading && !error && movies.length > 0 && (
            <MovieList movies={movies} />
          )}

          {/* No Results */}
          {!loading && !error && movies.length === 0 && (
            <div className="no-results">
              <p>No movies found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;