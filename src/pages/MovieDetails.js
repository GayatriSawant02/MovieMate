import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Film } from 'lucide-react';
import tmdbApi from '../services/tmdbApi';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * MovieDetails Page Component
 * Displays detailed information about a specific movie
 */
const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details when component mounts or ID changes
  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  /**
   * Load movie details from TMDB API
   */
  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const movieData = await tmdbApi.getMovieDetails(id);
      setMovie(movieData);
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate back to home page
   */
  const handleBack = () => {
    navigate('/');
  };

  // Loading state
  if (loading) {
    return (
      <div className="movie-details-page">
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p className="loading-text">Loading movie details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !movie) {
    return (
      <div className="movie-details-page">
        <div className="error-container">
          <AlertCircle className="error-icon" />
          <p className="error-text">{error || 'Movie not found'}</p>
          <button onClick={handleBack} className="back-button">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Get backdrop and poster URLs
  const backdropUrl = tmdbApi.getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = tmdbApi.getImageUrl(movie.poster_path, 'w500');

  return (
    <div className="movie-details-page">
      {/* Backdrop Image */}
      {backdropUrl && (
        <div
          className="movie-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="backdrop-overlay"></div>
        </div>
      )}

      {/* Content */}
      <div className="movie-details-content">
        <div className="container">
          {/* Back Button */}
          <button onClick={handleBack} className="back-button">
            <ArrowLeft className="back-icon" />
            Back to Movies
          </button>

          <div className="movie-details-grid">
            {/* Movie Poster */}
            <div className="movie-poster-large">
              <img
                src={posterUrl || 'https://via.placeholder.com/500x750/1a1a2e/a855f7?text=No+Image'}
                alt={movie.title}
                className="poster-image"
              />
            </div>

            {/* Movie Information */}
            <div className="movie-info-detailed">
              {/* Title */}
              <h1 className="movie-title-large">{movie.title}</h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="movie-tagline">"{movie.tagline}"</p>
              )}

              {/* Stats */}
              <div className="movie-stats">
                <div className="stat-item">
                  <Star className="stat-icon" />
                  <span className="stat-value">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                  <span className="stat-label">Rating</span>
                </div>

                <div className="stat-item">
                  <Calendar className="stat-icon" />
                  <span className="stat-value">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : 'N/A'}
                  </span>
                  <span className="stat-label">Release</span>
                </div>

                <div className="stat-item">
                  <Clock className="stat-icon" />
                  <span className="stat-value">
                    {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                  </span>
                  <span className="stat-label">Runtime</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="movie-genres">
                  <h3 className="section-title">Genres</h3>
                  <div className="genre-tags">
                    {movie.genres.map((genre) => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="movie-overview-section">
                <h3 className="section-title">Overview</h3>
                <p className="movie-overview-text">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                {movie.status && (
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value">{movie.status}</span>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div className="info-item">
                    <span className="info-label">Budget:</span>
                    <span className="info-value">
                      ${movie.budget.toLocaleString()}
                    </span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="info-item">
                    <span className="info-label">Revenue:</span>
                    <span className="info-value">
                      ${movie.revenue.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;