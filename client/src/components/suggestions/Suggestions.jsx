import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';
const Base_URL = 'https://api.themoviedb.org/3';

const Suggestion = (props) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieIds, setMovieIds] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:9002/suggestions/${props.email}`)
      .then(response => {
        setSuggestions(response.data);
        // Extract movie IDs from suggestions
        const movieIds = response.data.map(suggestion => suggestion.MovieId);
        setMovieIds(movieIds);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.email]);

  useEffect(() => {
    const fetchMovieDetails = () => {
      const promises = movieIds.map(movieId => {
        return axios.get(`${Base_URL}/movie/${movieId}?api_key=${API_KEY}`);
      });

      axios.all(promises)
        .then(axios.spread((...responses) => {
          const movieDetails = responses.map(response => response.data);
          setMovieDetails(movieDetails);
        }))
        .catch(err => {
          console.log(err);
        });
    };

    if (movieIds.length > 0) {
      fetchMovieDetails();
    }
  }, [movieIds]);

  return (
    <div className='Watchlist'>
      <ul>
        {movieDetails.map((movieDetail, index) => (
          <li key={index}>
            <div className="movie-card" >
            <img src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movieDetail.poster_path}`} alt={movieDetail.title} />
              <div className="movie-details">
                <h1 className="movie-title">{movieDetail.title}</h1>
                <p onClick={() => navigate(`/searchMoviebyName/${movieDetail.id}`)}>More details</p>
                <p>Suggested by {suggestions[index].sender}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestion;
