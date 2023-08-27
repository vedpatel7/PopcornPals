import './App.css'
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Trailer from './components/details/Trailer';

function App() {
  const [user, setLoginUser] = useState(null);
  
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
          <Route path = "/trailer" element = {<Myfun/>} />
        </Routes>
      </Router>
    </div>
  );
}
function Myfun(){
  const location = useLocation();
  const id = location.state ? location.state.id : null;
  return (
    <>
      <Trailer id = {id}/>
    </>
  )
}

export default App;

