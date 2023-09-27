import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WatchList=()=>{
  const navigate = useNavigate();
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

    const removeFromWatchlist = (movieIdToRemove) => {
      axios.delete(`http://localhost:9002/watchlist/${emailId}/${movieIdToRemove}`)
        .then(response => {
          setMovieIds(prevMovieIds => prevMovieIds.filter(id => id !== movieIdToRemove));
        })
        .catch(err => {
          console.log(err);
        });
    };

    return(
        <div>
        <ul>
        {movieIds.map((movieId, index) => (
          <li key={index}  onClick={()=>navigate(`/searchMoviebyName/${movieId}`)}>{movieId}<button onClick={() => removeFromWatchlist(movieId)}>Remove</button></li>
        ))}
      </ul>
        </div>
    )
}

export default WatchList;

// https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}