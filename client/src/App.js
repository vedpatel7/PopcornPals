import './App.css';
import React, { useState } from 'react';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import Details from './components/movie/Movie';
import WatchList from './components/watchlist/WatchList';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Suggestion from './components/suggestions/Suggestions';
import NavBar from './components/navbar/navbar';

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
                <>
                  <NavBar setLoginUser={setLoginUser} />
                  <Homepage setLoginUser={setLoginUser} />
                </>
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details" element={<GetDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route
            path="/watchlist/:emailId"
            element={
              <>
                <NavBar setLoginUser={setLoginUser} />
                <WatchList />
              </>
            }
          />
          <Route path="/searchUserbyName/:name" element={<Homepage />} />
          <Route path="/searchMoviebyName/:id" element={<DetailsWrapper />} />
          <Route
            path="/suggestion/:email"
            element={
              <>
                <NavBar setLoginUser={setLoginUser} />
                <SuggestionWrapper setLoginUser={setLoginUser} />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

function GetDetails() {
  const location = useLocation();
  const id = location.state ? location.state.id : null;
  return (
    <div>
      <Details id={id} />
    </div>
  );
}

function DetailsWrapper() {
  const { id } = useParams();
  return <Details id={id} />;
}

function SuggestionWrapper(props) {
  const { email } = useParams();
  return <Suggestion email={email} setLoginUser={props.setLoginUser} />;
}

export default App;
