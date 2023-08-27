import React, { useRef, useEffect, useState } from "react";
import "./homepage.css";
import axios from 'axios';
import MovieCard from "./MovieCard";

const API_KEY='84edaeedd68b9e73abbe95b5bb70617a';
const Base_URL='https://api.themoviedb.org/3';
var Popular=`${Base_URL}/movie/popular?api_key=${API_KEY}`;


const Homepage = ({ setLoginUser }) => {
  const[allmovies, setAllmovies]=useState([])
  useEffect(()=>{
    axios.get(Popular)
    .then(response =>{
      setAllmovies(response.data.results);
      })
    .catch(err=>{console.log(err)})
  },[])

  return (
    <div>
      <h1>Trending Movies</h1>
      <div>
        {allmovies.map((movie,index)=>{
            return( 
              <MovieCard key={index}{...movie}/>
            )
          })}
      </div>
      <div className="button" onClick={() => setLoginUser({})} >Logout</div>
    </div>
  )
}

export default Homepage;