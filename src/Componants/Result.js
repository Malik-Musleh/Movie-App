import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Result({ result, openPopup }) {
    const OMDbAPI = "http://www.omdbapi.com/?apikey=df39af2c"
    const [state,setState]=useState("") 
    // http://www.omdbapi.com/?apikey=df39af2c&i=tt2975590
    const overveiw = () => {
        axios(OMDbAPI + "&i=" + result.imdbID).then(({ data }) => {
            return setState(data)
        });
      }
      useEffect(()=>overveiw(),[]) 

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
