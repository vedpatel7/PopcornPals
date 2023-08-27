import Trailer from "./Trailer";
const Base_Image='https://www.themoviedb.org/t/p/w440_and_h660_face';
const getPoster =(backdrop_path)=>{
    return `${Base_Image}${backdrop_path}`
}
const MovieCard=({backdrop_path, title,release_date,id})=>{
    return <div>
        <img src= {getPoster(backdrop_path)} alt={title}/>
        <div>
            <h1>{title}</h1>
            <p>{release_date}</p>
        </div>
        <Trailer id={id}/>
    </div>
}
export default MovieCard;