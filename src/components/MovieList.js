import React from 'react';
import MovieCard from './MovieCard';

/**
 * MovieList Component
 * Displays a grid of movie cards
 * @param {Array} movies - Array of movie objects to display
 */
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;