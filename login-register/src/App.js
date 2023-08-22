import './App.css';
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from './components/register/register';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from 'react';
import VideoPlayer from './components/homepage/homepage';

function App() {
  const [videoId, setVideoId] = useState(null)

  function playVideo(e, videoId){
    e.preventDefault()
    setVideoId(videoId)
  }
  return (
    <div className="App">
     {videoId && <VideoPlayer videoId={videoId}></VideoPlayer>} <br />
      <button onClick={(e)=>{playVideo(e, 'cdn')}}>Play Video 1</button>
      <button onClick={(e)=>{playVideo(e, 'generate-pass')}}>Play Video 2</button>
      <button onClick={(e)=>{playVideo(e, 'get-post')}}>Play Video 3</button>
    <Router>
      <Routes>
        <Route exact path='/' element={< Homepage />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/register' element={< Register />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
