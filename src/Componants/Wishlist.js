import React, { useState } from 'react';
import Result from './Result';

function WishList({ results, openPopup }) {
    const wish =localStorage.getItem('myData');
    // if (wish) {
    //     wish.map(result => (<div key={result.imdbID} className="result" onClick={() => openPopup(result.Title)}>
    //        <img src={result.Poster} ></img>
    //        <h3>{result.Title}</h3>
    //    </div>
    //    ))
    // }
    return (
        <section className="results">
            {wish? wish.map(result => (<div key={result.imdbID} className="result" onClick={() => openPopup(result.Title)}>
           <img src={result.Poster} ></img>
           <h3>{result.Title}</h3>
       </div>
       )):false}
        </section>
    );
}

export default WishList;
