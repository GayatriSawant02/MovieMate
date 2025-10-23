import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import SearchBar from './SearchBar';

/**
 * Header Component
 * Displays the MovieMate logo and search functionality
 * @param {Function} onSearch - Callback function when search is performed
 * @param {string} searchQuery - Current search query
 * @param {Function} setSearchQuery - Function to update search query
 */
const Header = ({ onSearch, searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo - Links back to home */}
          <Link to="/" className="logo-link">
            <div className="logo">
              <Film className="logo-icon" />
              <h1 className="logo-text">
                <span className="logo-movie">Movie</span>
                <span className="logo-mate">Mate</span>
              </h1>
            </div>
          </Link>

          {/* Search Bar Component */}
          <SearchBar
            onSearch={onSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;