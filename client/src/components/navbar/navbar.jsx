import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import "./navbar.css";

function NavBar({ setLoginUser }) {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('EmailId');
        setLoginUser({});
        navigate("/");
    }

    const handleWatchList = () => {
        const emailId = localStorage.getItem('EmailId');
        navigate(`/watchlist/${emailId}`);
    }

    const hadleSuggestion = () => {
        const emailId = localStorage.getItem('EmailId');
        navigate(`/suggestion/${emailId}`);
    }
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1ivYJ-sw7jsJDlwERUV4IE-SaUt-c36OR';
    return (
        <div className="headerPrimary" style={{paddingTop: '30px', paddingBottom: '30px'}}>
            <div style={{marginLeft: '20px'}}>
                <NavLink to={"/"}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', }}>
                        <img src={imageUrl} style={{ width: '150px', height: 'auto' }}></img>
                    </div>
                </NavLink>
            </div>
            <div style={{ display: 'flex', gap: '50px', marginTop: '40px', marginRight: '20px' }}>
                <p onClick={handleWatchList}>WatchList</p>
                <p onClick={hadleSuggestion}>Suggestions</p>
                <p onClick={handleLogout}>Logout</p>
            </div>
        </div>
    );
}

export default NavBar;