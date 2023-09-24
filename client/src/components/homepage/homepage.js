import React, { useEffect, useState } from "react";
import axios from 'axios';
import MovieCard from "./MovieCard";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import SearchUser from "./SearchUser";
import SearchMovie from "./SearchMovie";

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

  return (
    <div>


      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleWatchList}>WatchList</button>
      <SearchUser />
      <SearchMovie/>
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
