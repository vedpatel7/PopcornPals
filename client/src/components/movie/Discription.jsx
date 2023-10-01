import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./movie.css";
import SharePopup from './SharePopup';
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';
const getDiscription = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
}

const Discription = (props) => {
    const [discription, setDiscription] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    useEffect(() => {
        axios.get(getDiscription(props.id))
            .then(response => {
                const dis = response.data.overview;
                const title = response.data.title;
                const date = response.data.release_date;
                setDiscription(dis);
                setTitle(title);
                setDate(date);
            })
            .catch(err => { console.log(err) })
    }, [props.id]);

    const watchLater = () => {
        const emailId = JSON.stringify(localStorage.getItem('EmailId'));
        const movie = {
            emailId: emailId,
            movieId: props.id
        };
        axios.post("http://localhost:9002/watchlist", movie)
        .then(res => {
            if (res.data.message === "Successfully added") {
                toast({
                    title: 'Added to the watchlist',
                    status: 'success',
                    position: 'top',
                    duration: 9000,
                    isClosable: true
                });
            } else if (res.data.message === "Movie already in watchlist") {
                toast({
                    title: 'alredy there in the watchlist',
                    status: 'warning',
                    position: 'top',
                    duration: 9000,
                    isClosable: true
                });
            } else {
                toast({
                    title: 'unable to add to the watchlist',
                    status: 'error',
                    position: 'top',
                    duration: 9000,
                    isClosable: true
                });
            }
        })
        .catch(err => {
            console.error("Error adding movie:", err);
        });
    };

    return (
        <div>
            <div className="watchlater">
                <h1>{title}</h1>
                <div style={{ display: 'flex', gap: '40px', marginRight: '40px', marginTop: '20px' }}>
                    <p onClick={watchLater} style={{ cursor: 'pointer', fontSize: '23px' }}>
                        <AddIcon />
                    </p>
                    <p onClick={openPopup} style={{ cursor: 'pointer', fontSize: '23px' }}>
                        <ExternalLinkIcon />
                    </p>
                </div>
            </div>
            {isPopupOpen && (
                <SharePopup movieId={props.id} onClose={closePopup} />
            )}

            <p>{discription}</p>
        </div>
    )
}

export default Discription;
