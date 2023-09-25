import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Suggestion=(props)=>{
    // const { email } = useParams();
    const [suggestions, setSuggestions] = useState([]);
    // console.log(props.email);
    useEffect(() => {
      axios.get(`http://localhost:9002/suggestions/${props.email}`)
        .then(response => {
          setSuggestions(response.data);
          // console.log(response.data)
        })
        .catch(err => {
          console.log(err);
        });
    }, []);

    return(
        <div>
        <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion.MovieId} . {suggestion.sender}</li>
        ))}
      </ul>
        </div>
    )
}

export default Suggestion;
