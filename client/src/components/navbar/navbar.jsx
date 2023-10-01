import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import "./navbar.css";

function NavBar({ setLoginUser }) {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('EmailId');
        setLoginUser({});
    }

    const handleWatchList = () => {
        const emailId = localStorage.getItem('EmailId');
        navigate(`/watchlist/${emailId}`);
    }

    const hadleSuggestion = () => {
        const emailId = localStorage.getItem('EmailId');
        navigate(`suggestion/${emailId}`);
    }
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1ivYJ-sw7jsJDlwERUV4IE-SaUt-c36OR';
    return (
        <div className="headerPrimary">
            <div className="left part">
                <NavLink to={"/"}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', }}>
                        <img src={imageUrl} style={{ width: '200px', height: 'auto' }}></img>
                    </div>
                </NavLink>
            </div>
            <div className="right part">

                {/* <div className="teachDiv">
                    <span className="teach" onClick={function () { navigate("/login") }}>Teach on Udemy</span>
                </div> */}
                <Button colorScheme='pink' onClick={handleLogout}>Logout</Button>
                <Button colorScheme='pink' onClick={handleWatchList}>WatchList</Button>
                <Button colorScheme='pink' onClick={hadleSuggestion}>Suggestions</Button>
            </div>
        </div>
    );
}

export default NavBar;