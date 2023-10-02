import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';

const SharePopup = ({ movieId, onClose }) => {
    const [userList, setUserList] = useState([]);
    const emailId = localStorage.getItem("EmailId");

    const toast = useToast();

    const [suggestion, setSuggestion] = useState({
        sender: emailId,
        receiver: "",
        movieId: movieId,
    });

    useEffect(() => {
        axios
            .get("http://localhost:9002/userList")
            .then((response) => {
                setUserList(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (suggestion.receiver !== "") {
            axios.post("http://localhost:9002/addSuggestion", suggestion).then((res) => {
            });
        }
    }, [suggestion]);

    const handleUserClick = (user) => {
        setSuggestion((prevSuggestion) => ({
            ...prevSuggestion,
            receiver: user.email,
        }));

        toast({
            title: "Successfully suggested",
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
        });
    };

    return (
        <div className="share-popup" style={popupStyle}>
            <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: '150px' }}>Share With</h2>
                <button onClick={onClose} style={closeButtonStyle}>
                    <CloseIcon></CloseIcon>
                </button>
            </div>
            <ul style={userListStyle}>
                {userList.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => handleUserClick(user)}
                        style={userItemStyle}
                    >
                        {user.name} . {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const popupStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "300px",
    background: "#201843",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    padding: "10px",
};

const userListStyle = {
    listStyle: "none",
    padding: 0,
};

const userItemStyle = {
    cursor: "pointer",
    marginBottom: "10px",
};

const closeButtonStyle = {
    marginTop: "10px",
};

export default SharePopup;
