import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
const API_KEY='84edaeedd68b9e73abbe95b5bb70617a';
const getDiscription = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
}
const Discription=(props)=>{
    const[discription, setDiscription]=useState('')
    const[title, setTitle]=useState('');
    const[date,setDate]=useState('')
    useEffect(()=>{
        axios.get(getDiscription(props.id))
        .then(response=>{
            const dis=response.data.overview;
            const title=response.data.title;
            const date=response.data.release_date;
            setDiscription(dis);
            setTitle(title);
            setDate(date);
        })
        .catch(err=>{console.log(err)})
    })
    return(
        <div>
        <h1>{title}</h1>
        <p>{discription}</p>
        <h3>{date}</h3>
        </div>
    )
}
export default Discription;