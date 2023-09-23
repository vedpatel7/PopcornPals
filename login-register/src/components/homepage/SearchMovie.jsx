import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';

function SearchMovie({ onSearch }) {
  const navigate= useNavigate();
  const [searchMovies, setSearchMovies] = useState([]);
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchMovie=()=>{
    if (query.trim() === "") {
      setSearchMovies([]);
      return;
    }
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=84edaeedd68b9e73abbe95b5bb70617a`)
    .then(response=>{
      setSearchMovies(response.data.results);
    })
    .catch(err => {
      console.error("Error searching for movie by name:", err);
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
      <button onClick={handleSearchMovie}>Search Movie</button>
      <ul>
        {searchMovies.map((result, index) => (
          <li key={index}>
          <p onClick={()=>navigate(`/watchlist/${result.id}`)}><b>{result.title}</b> . {result.id}</p>
          </li>
        ))}
      </ul>


    </div>
  );
}

export default SearchMovie;

