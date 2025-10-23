import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import tmdbApi from '../services/tmdbApi';

/**
 * MovieCard Component
 * Displays a single movie card with poster, title, rating, and release date
 * @param {Object} movie - Movie object from TMDB API
 */
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Navigate to movie details page when card is clicked
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Get poster image URL
  const posterUrl = tmdbApi.getImageUrl(movie.poster_path, 'w500');
  
  // Fallback image if poster is not available
  const fallbackImage = 'https://via.placeholder.com/500x750/1a1a2e/a855f7?text=No+Image';

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-card-inner">
        {/* Movie Poster */}
        <div className="movie-poster-container">
          <img
            src={posterUrl || fallbackImage}
            alt={movie.title}
            className="movie-poster"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
          <div className="movie-overlay">
            <p className="movie-overview">
              {movie.overview || 'No description available.'}
            </p>
          </div>
        </div>

        {/* Movie Info */}
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          
          <div className="movie-details">
            {/* Rating */}
            <div className="movie-rating">
              <Star className="icon-star" />
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            </div>

            {/* Release Date */}
            <div className="movie-date">
              <Calendar className="icon-calendar" />
              <span>
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
