import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Suggestion=(props)=>{
  const navigate= useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:9002/suggestions/${props.email}`)
        .then(response => {
          setSuggestions(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);

    return(
        <div>
        <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}><p onClick={()=>navigate(`/searchMoviebyName/${suggestion.MovieId}`)}>{suggestion.MovieId} suggested by {suggestion.sender}</p></li>
        ))}
      </ul>
        </div>
    )
}

export default Suggestion;
