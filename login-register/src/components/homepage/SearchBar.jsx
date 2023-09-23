import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    // console.log(query);
    console.log(`Searching for: ${query}`);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    axios.get(`http://localhost:9002/searchUsersByName/${query}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(err => {
        console.error("Error searching for users by name:", err);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
          <p>{result.name}</p>
          <p>{result.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;

