import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Result({ result, openPopup }) {
    const OMDbAPI = "https://www.omdbapi.com/?apikey=3bd48de7"
    const [state, setState] = useState("")
    const [fav, setFav] = useState(false)

    let myFav = localStorage.getItem("favList")
    let bool = myFav.toString().search(result.imdbID) > -1
    const isFav = () => { if (bool) { setFav(true) } else (setFav(false)) }
    const overveiw = () => {
        axios(OMDbAPI + "&i=" + result.imdbID).then(({ data }) => {
            return setState(data)
        });
    }

    useEffect(() => { overveiw(); isFav() }, [])
    return (
        <a href="#header" onClick={() => openPopup(result.imdbID)} >
            <div className="result">
                <img src={result.Poster} ></img>
                <h3>{result.Title}
                    {fav ? <span> <span class="fa fa-star checked"></span></span> :
                        <span> <span class="fa fa-star"></span></span>}
                </h3>
                <div className="movie-over">
                    <h3>overview : </h3>
                    <p>{state.Plot}</p>
                </div>
            </div>
        </a>
    );
}

export default Result;
