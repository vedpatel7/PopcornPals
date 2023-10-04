import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import "./Searchbar.css";

function SearchUser({ onSearch }) {
  const navigate = useNavigate();
  const [searchUsers, setSearchUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false); // Control whether to show search results

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setShowResults(inputValue.trim() !== ''); // Show results when there's input
    // Trigger search when the input changes
    handleSearch(inputValue);
  };

  const handleSearch = (queryValue) => {
    if (queryValue.trim() === "") {
      setSearchUsers([]);
      setShowResults(false); // Hide results if the input is empty
      return;
    }

    axios.get(`http://localhost:9002/searchUsersByName/${queryValue}`)
      .then(response => {
        setSearchUsers(response.data);
        setShowResults(true);
      })
      .catch(err => {
        console.error("Error searching for users by name:", err);
      });
  };

  const handleFriendClick = (index) => {
    const updatedUsers = [...searchUsers];
    updatedUsers[index].isFriend = !updatedUsers[index].isFriend;
    setSearchUsers(updatedUsers);
  };

  return (
    <div className="searchbar">
      <Input variant='outline' type="text"
        placeholder="Search user"
        value={query}
        onChange={handleInputChange} name="search user"></Input>
      <Button colorScheme='pink'><SearchIcon></SearchIcon></Button>
      {showResults && (
        <div className="search-results">
          <ul>
            {searchUsers.map((result, index) => (
              <li key={index}>
                <p>
                  <b>{result.name}</b><b>({result.isFriend ? 'Friend' : 'Not Friend'})</b> . 
                  {result.isFriend && (
                    <span>
                      <b onClick={() => navigate(`/watchlist/${result.email}`)}> See Watchlist  .  </b>
                    </span>
                  )}
                  <b onClick={() => handleFriendClick(index)}>
                    {result.isFriend ? 'Remove Friend' : 'Add Friend'}
                  </b>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchUser;
