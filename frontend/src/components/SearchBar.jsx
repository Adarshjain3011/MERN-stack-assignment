// src/components/SearchBar.jsx
import axios from 'axios';
import React, { useState, useCallback } from 'react';

import Input from './common/Input';

// Debounce function to delay the execution of the search API call
const useDebounce = (func, delay) => {
  const timeoutRef = React.useRef();

  const debouncedFunc = useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current); // Clear previous timeout
      timeoutRef.current = setTimeout(() => func(...args), delay); // Set a new timeout
    },
    [func, delay]
  );

  return debouncedFunc;
};

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Function that will handle search when the query is updated
  const fetchSearchResults = async (query) => {
    if (query === '') return; // Skip if query is empty

    try {
      const response = await axios.get(`http://localhost:4000/api/searchUser/${query}`, {
        withCredentials: true, // Include credentials for cross-origin requests
      });
      console.log("Response data: ", response.data);
    } catch (error) {
      console.error("Error fetching data from server", error);
    }
  };

  // Debounce the search function to wait before making the API call
  const debouncedSearch = useDebounce(fetchSearchResults, 500);

  // Handles the input change and triggers the debounced search
  const changeHandler = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value); // Trigger debounced function
  };

  // Handles the form submission and passes the query to the parent component
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <Input
        type="text"
        value={query}
        onChange={changeHandler}
      />
      <button type="submit" className="bg-blue-500 p-2 rounded-r-md text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBar;

