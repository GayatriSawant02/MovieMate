import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component
 * Handles movie search input and submission
 * @param {Function} onSearch - Callback when search is submitted
 * @param {string} searchQuery - Current search query value
 * @param {Function} setSearchQuery - Function to update search query
 */
const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearch(localQuery.trim());
      setSearchQuery(localQuery.trim());
    }
  };

  // Clear search and show popular movies
  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    onSearch(''); // Empty search loads popular movies
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
        />
        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            <X className="clear-icon" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;