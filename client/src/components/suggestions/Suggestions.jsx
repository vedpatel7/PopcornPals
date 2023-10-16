import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CloseIcon,DeleteIcon } from '@chakra-ui/icons'

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';
const Base_URL = 'https://api.themoviedb.org/3';

const Suggestion = (props) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieIds, setMovieIds] = useState([]);

  useEffect(() => {
    axios.get(`https://popcorn-pals-backend.vercel.app/suggestions/${props.email}`)
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
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {movieDetails.map((movieDetail, index) => (
        <div key={index} style={{ width: '20%', padding: '10px', position: 'relative' , height: '400px'}}>
          <div className="movie-card" style={{ height: '100%' }}>
            <img src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movieDetail.poster_path}`} alt={movieDetail.title} style={{ width: '100%', height: '75%', objectFit: 'cover' }}/>
            <div className="movie-details" onClick={() => navigate(`/searchMoviebyName/${movieDetail.id}`)} style={{ height: '25%' }}>
              <h1 className="movie-title">{movieDetail.title}</h1>
              {/* <p onClick={() => navigate(`/searchMoviebyName/${movieDetail.id}`)}>More details</p> */}
              <p style={{ fontSize: '0.9rem', margin: '5px 0' }}>Suggested by {suggestions[index].sender}</p>
            </div>
            {/* Add the Remove button here */}
            <button
              // onClick={() => removeFromWatchlist(movieDetail.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'White',
                border: 'none',
                cursor: 'pointer',
                zIndex: '1',
              }}
            >
              <DeleteIcon></DeleteIcon>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Suggestion;
