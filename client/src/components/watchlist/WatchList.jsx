import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WatchList=()=>{
    const { emailId } = useParams();
    const [movieIds, setMovieIds] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:9002/watchlist/${emailId}`)
        .then(response => {
          setMovieIds(response.data);
          console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
    }, [emailId]);

    return(
        <div>
        <ul>
        {movieIds.map((movieId, index) => (
          <li key={index}>{movieId}</li>
        ))}
      </ul>
        </div>
    )
}

export default WatchList;