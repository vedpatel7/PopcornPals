import React from "react";
import "./MovieCard.css"; 
import { Navigate, useNavigate } from "react-router-dom";

const Base_Image = 'https://www.themoviedb.org/t/p/w440_and_h660_face';

const getPoster = (backdrop_path) => {
  return `${Base_Image}${backdrop_path}`;
}

const MovieCard = (props) => {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate("/details", {state: {id : props.id}});
    }
  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={getPoster(props.backdrop_path)} alt={props.title} />
      <div className="movie-details">
        <h1 className="movie-title">{props.title}</h1>
        <p className="movie-release-date">{props.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;
