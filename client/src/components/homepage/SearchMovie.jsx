import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import "./Searchbar.css";

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';

function SearchMovie({ onSearch }) {
  const navigate = useNavigate();
  const [searchMovies, setSearchMovies] = useState([]);
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchMovie = () => {
    if (query.trim() === "") {
      setSearchMovies([]);
      return;
    }
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=84edaeedd68b9e73abbe95b5bb70617a`)
      .then(response => {
        // console.log(response.data.results);
        setSearchMovies(response.data.results);
        // console.log(searchMovies);
      })
      .catch(err => {
        console.error("Error searching for movie by name:", err);
      });
  };

  return (
    <div className="searchbar">
      <Input variant='outline' type="text"
        placeholder="Search movie"
        value={query}
        onChange={handleInputChange} name="search movie"></Input>
      <Button colorScheme='pink' onClick={handleSearchMovie}><SearchIcon></SearchIcon></Button>
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

