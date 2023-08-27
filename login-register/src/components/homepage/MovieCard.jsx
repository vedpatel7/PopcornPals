import React from "react";
import "./MovieCard.css"; // Import the CSS file
import { Navigate, useNavigate } from "react-router-dom";

const Base_Image = 'https://www.themoviedb.org/t/p/w440_and_h660_face';

const getPoster = (backdrop_path) => {
  return `${Base_Image}${backdrop_path}`;
}

const MovieCard = ({ backdrop_path, title, release_date, id }) => {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate("/trailer", {state: {id : id}});
    }
  return (
    <div className="movie-card" onClick={handleClick}> {/* Apply the CSS class here */}
      <img src={getPoster(backdrop_path)} alt={title} />
      <div className="movie-details"> {/* Apply the CSS class here */}
        <h1 className="movie-title">{title}</h1>
        <p className="movie-release-date">{release_date}</p>
      </div>
      {/* <Trailer id={id}/> */}
    </div>
  );
}

export default MovieCard;
