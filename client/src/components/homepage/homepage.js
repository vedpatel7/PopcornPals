import React, { useEffect, useState } from "react";
import axios from 'axios';
import MovieCard from "./MovieCard";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import SearchUser from "./SearchUser";
import SearchMovie from "./SearchMovie";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';
const Base_URL = 'https://api.themoviedb.org/3';
const Popular = `${Base_URL}/movie/popular?api_key=${API_KEY}`;
const Upcoming = `${Base_URL}/movie/upcoming?api_key=${API_KEY}`;
const Now_Playing = `${Base_URL}/movie/now_playing?api_key=${API_KEY}`;

const Homepage = ({ setLoginUser }) => {

  const [popularmovies, setPopularMovies] = useState([]);
  const [upcomingmovies, setUpcomingMovies] = useState([]);
  const [playingmovies, setPlayingMovies] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('EmailId');
    setLoginUser({});
  }

  const handleWatchList = () => {
    const emailId = localStorage.getItem('EmailId');
    navigate(`/watchlist/${emailId}`);
  }

  const hadleSuggestion=()=>{
    const emailId = localStorage.getItem('EmailId');
    navigate(`suggestion/${emailId}`);
  }

  useEffect(() => {

    axios.get(Popular)
      .then(response => {
        setPopularMovies(response.data.results);
      })
      .catch(err => {
        console.log(err);
      });
    axios.get(Upcoming)
      .then(response => {
        setUpcomingMovies(response.data.results);
      })
      .catch(err => {
        console.log(err);
      });
    axios.get(Now_Playing)
      .then(response => {
        setPlayingMovies(response.data.results);
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  const imageUrl = 'https://drive.google.com/uc?export=view&id=1ivYJ-sw7jsJDlwERUV4IE-SaUt-c36OR';
  return (
    <div>
     <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center', height: '20vh',  }}>
    <img src={imageUrl} style={{ width: '200px',height:'auto' }}></img>
    </div>
      <div className="search-bars">
        <SearchUser />
        <SearchMovie/>
      <Button colorScheme= 'pink' onClick={handleLogout}>Logout</Button>
      <Button colorScheme='pink' onClick={handleWatchList}>WatchList</Button>
      <Button colorScheme='pink' onClick={hadleSuggestion}>Suggestions</Button>
      </div>
      <h1 className="trending-title">Trending Movies</h1>
      <div className="carousel-container">
        <div className="carousel">
          {popularmovies.map((movie, index) => (
            <div key={index} className="carousel-item">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
      </div>

      <h1 className="trending-title">Upcoming Movies</h1>
      <div className="carousel-container">
        <div className="carousel">
          {upcomingmovies.map((movie, index) => (
            <div key={index} className="carousel-item">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
      </div>
      <h1 className="trending-title">Now Playing Movies</h1>
      <div className="carousel-container">
        <div className="carousel">
          {playingmovies.map((movie, index) => (
            <div key={index} className="carousel-item">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Homepage;
