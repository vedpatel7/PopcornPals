import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import Trailer from './Trailer';
import Discription from './Discription';

const Details=(props)=>{
    return(
        <div>
        <Discription id={props.id}></Discription>
        <Trailer id={props.id}></Trailer>
        </div>
    )
}

export default Details;