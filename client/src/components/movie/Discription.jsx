import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./movie.css";
import SharePopup from './SharePopup';

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
                <div>
                    <button onClick={watchLater}>WatchLater</button>
                    <button onClick={openPopup}>Share</button>
                </div>
            </div>
            {isPopupOpen && (
                <SharePopup movieId={props.id} onClose={closePopup} />
            )}
            <p>{discription}</p>
            <h4>Release Date: {date}</h4>

        </div>
    )
}
export default Discription;