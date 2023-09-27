import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

function SearchUser({ onSearch }) {
  const navigate = useNavigate();
  const [searchUsers, setSearchUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false); // Control whether to show search results

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowResults(e.target.value.trim() !== ''); // Show results when there's input
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      setSearchUsers([]);
      setShowResults(false); // Hide results if the input is empty
      return;
    }

    axios.get(`http://localhost:9002/searchUsersByName/${query}`)
      .then(response => {
        setSearchUsers(response.data);
        setShowResults(true); // Show results when available
      })
      .catch(err => {
        console.error("Error searching for users by name:", err);
      });
  };

  return (
    <div className="search">
      <Input variant='outline' type="text"
        placeholder="Search user"
        value={query}
        onChange={handleInputChange} name="search user"></Input>
      <Button colorScheme='blue' onClick={handleSearch}><SearchIcon></SearchIcon></Button>
      <div className="search-results">
        <ul>
          {searchUsers.map((result, index) => (
            <li key={index}>
              <p onClick={() => navigate(`/watchlist/${result.email}`)}>
                <b>{result.name}</b> . {result.email}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchUser;
