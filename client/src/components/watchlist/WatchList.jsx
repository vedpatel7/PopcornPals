import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteIcon } from '@chakra-ui/icons'

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';
const Base_URL = 'https://api.themoviedb.org/3';

const WatchList = () => {
  const navigate = useNavigate();
  const { emailId } = useParams();
  const [movieIds, setMovieIds] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9002/watchlist/${emailId}`)
      .then(response => {
        setMovieIds(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [emailId]);

  useEffect(() => {
    const fetchMovieDetails = () => {
      const promises = movieIds.map(movieId => {
        return axios.get(`${Base_URL}/movie/${movieId}?api_key=${API_KEY}`);
      });

      axios.all(promises)
        .then(axios.spread((...responses) => {
          const movieDetails = responses.map(response => response.data);
          const filteredMovieDetails = movieDetails.filter(movie => movie !== null);
          setMovieDetails(filteredMovieDetails);
        }))
        .catch(err => {
          console.log(err);
        });
    };

    fetchMovieDetails();
  }, [movieIds]);

  const removeFromWatchlist = (movieIdToRemove) => {
    axios.delete(`http://localhost:9002/watchlist/${emailId}/${movieIdToRemove}`)
      .then(response => {
        // Remove the movie from movieDetails without the one being removed
        setMovieDetails(prevMovieDetails => prevMovieDetails.filter(movie => movie.id !== movieIdToRemove));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {movieDetails.map((movieDetail, index) => (
        <div key={index} style={{ width: '20%', padding: '10px', position: 'relative', height: '400px' }}>
          <div className="movie-card" style={{ height: '100%' }}>
            <button
              onClick={() => removeFromWatchlist(movieDetail.id)}
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
            <img src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movieDetail.poster_path}`} alt={movieDetail.title} style={{ width: '100%', height: '75%', objectFit: 'cover' }} />
            <div className="movie-details" style={{ height: '25%' }}>
              <h1 className="movie-title" style={{ fontSize: '1.2rem', margin: '5px 0' }}>{movieDetail.title}</h1>
              <p onClick={() => navigate(`/searchMoviebyName/${movieDetail.id}`)} style={{ fontSize: '0.9rem', margin: '5px 0' }}>more details</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WatchList;
