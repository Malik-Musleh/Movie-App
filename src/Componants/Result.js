import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Result({ result, openPopup }) {
    const OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=df39af2c"
    const [state,setState]=useState("") 

    const overveiw = () => {
        axios(OMDbAPI + "&t=" + result.Title).then(({ data }) => {
            return setState(data)
        });
      }
      useEffect(()=>overveiw(),[]) 
    //   results.forEach(e => {
    //    setState( overveiw(e.Title))
    //   });
    return (
        <div className="result" onClick={() => openPopup(result.Title)}>
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
