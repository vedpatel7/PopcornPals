import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./movie.css";
import SharePopup from './SharePopup';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons'

const API_KEY = '84edaeedd68b9e73abbe95b5bb70617a';
const getDiscription = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
}

const Discription = (props) => {
    const [discription, setDiscription] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);

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
    }, [props.id])

    const navigate = useNavigate();

    const watchLater = () => {
        const emailId = JSON.stringify(localStorage.getItem('EmailId'))
        const movie = {
            emailId: emailId,
            movieId: props.id
        };
        axios.post("http://localhost:9002/watchlist", movie)
            .then(res => {
                alert(res.data.message)
            })
    }


    return (
        <div>
            <div className="watchlater">
                <h1>{title}</h1>
                <div style={{ display: 'flex', gap: '40px', marginRight: '40px', marginTop: '20px' }}>
                    <p onClick={watchLater} style={{ cursor: 'pointer', fontSize: '23px'}}>
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