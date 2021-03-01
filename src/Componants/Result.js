import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Result({ result, openPopup }) {
    const OMDbAPI = "https://www.omdbapi.com/?apikey=df39af2c"
    const [state, setState] = useState("")

    const overveiw = () => {
        axios(OMDbAPI + "&i=" + result.imdbID).then(({ data }) => {
            return setState(data)
        });
    }

    useEffect(() => overveiw(), [])
    return (
        <div className="result" onClick={() => openPopup(result.imdbID)}>
            <img src={result.Poster} ></img>
            <h3>{result.Title}</h3>
            <div className="movie-over">
                <h3>overview : </h3>
                <p>{state.Plot}</p>
            </div>
        </div>
    );
}

export default Result;
