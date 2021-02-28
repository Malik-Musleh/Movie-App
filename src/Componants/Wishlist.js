import React, { useState } from 'react';
import Result from './Result';

function WishList({ results, openPopup }) {
    const wishList = results.map(result => (<div key={result.imdbID} className="result" onClick={() => openPopup(result.Title)}>
        <img src={result.Poster} ></img>
        <h3>{result.Title}</h3>
    </div>
    ))
    return (
        <section className="results">
            {wishList}
        </section>
    );
}

export default WishList;
