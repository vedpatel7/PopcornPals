import './App.css'
import React, { useState } from "react";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Details from './components/movie/Movie';
import WatchList from './components/watchlist/WatchList';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from "react-router-dom";


function App() {
  const [user, setLoginUser] = useState(null);
  const emailId = JSON.stringify(localStorage.getItem('EmailId'))
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path = "/details" element = {<GetDetails/>} />
          <Route path = "/watchlist" element={<WatchList/>}/>
          <Route path = "/watchlist/:emailId" element={<WatchList/>}/>
          <Route path="/searchUserbyName/:name" element={<Homepage />} />
          <Route path="/searchMoviebyName/:id" element ={<DetailsWrapper/>}/>

        </Routes>
      </Router>
    </div>
  );
}

function GetDetails(){
  const location = useLocation();
  const id = location.state ? location.state.id : null;
  return (
    <div>
      <Details id = {id}/>
    </div>
  )
}

function DetailsWrapper() {
  const { id } = useParams();
  console.log(id);
  return <Details id= {id} />;
}

export default App;
