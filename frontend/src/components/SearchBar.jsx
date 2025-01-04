// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for users..."
        className="p-2 rounded-l-md border border-gray-300"
      />
      <button type="submit" className="bg-blue-500 p-2 rounded-r-md text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
