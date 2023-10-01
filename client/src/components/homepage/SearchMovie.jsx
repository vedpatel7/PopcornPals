import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import "./Searchbar.css";

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';

function SearchMovie() {
  const navigate = useNavigate();
  const [searchMovies, setSearchMovies] = useState([]);
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // Perform auto-search when input value is not empty
    if (inputValue.trim() === "") {
      setSearchMovies([]);
    } else {
      axios.get(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=${API_KEY}`)
        .then(response => {
          setSearchMovies(response.data.results);
        })
        .catch(err => {
          console.error("Error searching for movie by name:", err);
        });
    }
  };

  return (
    <div className="searchbar">
      <Input variant='outline' type="text"
        placeholder="Search movie"
        value={query}
        onChange={handleInputChange} name="search movie"></Input>
      <Button colorScheme='pink'><SearchIcon></SearchIcon></Button>
      <div className="search-results">
        <ul>
          {searchMovies.map((result, index) => (
            <li key={index}>
              <p onClick={() => navigate(`/searchMoviebyName/${result.id}`)}><b>{result.title}</b> . {result.id}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchMovie;
