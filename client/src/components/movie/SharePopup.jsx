import React, { useState, useEffect } from "react";
import axios from "axios";

const SharePopup = ({ movieId, onClose }) => {

    const [userList, setUserList] = useState([]);

    const emailId = localStorage.getItem('EmailId')
    const [suggestion, setSuggestion] = useState({
        sender: emailId,
        receiver: "",
        movieId: movieId,
    });

    useEffect(() => {
        axios.get("http://localhost:9002/userList")
            .then((response) => {
                setUserList(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    const handleUserClick = (user) => {
        setSuggestion(prevSuggestion => ({
            ...prevSuggestion,
            receiver: user.email,
        }));
        axios.post("http://localhost:9002/addSuggestion",suggestion)
            .then(res => {
                alert(res.data.message)
            })

    };


    return (
        <div className="share-popup">
            <h2>Share with Users</h2>
            <ul>
                {userList.map((user) => (
                    <li key={user.id} onClick={() => handleUserClick(user)}>{user.name} . {user.email}</li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    )
};

export default SharePopup;
