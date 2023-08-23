import React, { useRef, useEffect, useState } from "react"
import "./homepage.css"
import axios from 'axios';

const API="AIzaSyCqfE6uk9T8YT0pJTc36bRKK1fdDOLUYoo";
const search="movie trailer"
var fetchurl=`https://www.googleapis.com/youtube/v3/search?key=${API}&q=${search}&maxResult=20`
const Homepage = ({ setLoginUser }) => {
  const[allvideos,setAllvideos]=useState([])
  useEffect(()=>{
      axios.get(fetchurl)
      .then(response => {
        const result = response.data.items.map(item => ({
          ...item,
          Videolink: "https://www.youtube.com/embed/" + item.id.videoId
        }));
        setAllvideos(result);
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
      });
      
  },[])

  console.log(allvideos);
  return (
    <div className="homepage">
      <h1>Hello Homepage</h1>
      <div>
        <h1>Video List</h1>
        <div>
          {allvideos.map((item)=>{
            return(
              <div>
              <iframe width="560" height="315" src={item.Videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            );
          })}
        </div>
      </div>

      <div className="button" onClick={() => setLoginUser({})} >Logout</div>
    </div>
  )
}

export default Homepage;