import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Result({ result, openPopup }) {
    const OMDbAPI = "https://www.omdbapi.com/?apikey=df39af2c"
    const [state, setState] = useState("")
    const [fav, setFav] = useState(false)

    let myFav =localStorage.getItem("favList")
    let bool =myFav.toString().search(result.Title)>-1
    // bool>-1?(setFav(true)):(setFav(false));
    // if(bool){setFav(true)}
    // console.log(bool);
    const isFav =()=>{if(bool){setFav(true)}}
    const overveiw = () => {
        axios(OMDbAPI + "&i=" + result.imdbID).then(({ data }) => {
            return setState(data)
        });
    }

    useEffect(() => {overveiw();isFav()}, [])
    return (
        <div className="result" onClick={() => openPopup(result.imdbID)}>
            
            <img src={result.Poster} ></img>
            <h3>{result.Title} 
            {fav?<span> &#9733;</span> :
            <span> &#9734;</span>}
            
            </h3>
            <div className="movie-over">
                <h3>overview : </h3>
                <p>{state.Plot}</p>
            </div>
        </div>
    );
}

export default Result;
