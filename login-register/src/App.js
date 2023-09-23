import './App.css'
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Details from './components/movie/Movie';
import WatchList from './components/watchlist/WatchList';
import SearchBar from './components/homepage/SearchBar';

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


export default App;

