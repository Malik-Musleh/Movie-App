import React from 'react';

function Popup({ closePopUp, selected }) {
    return (
        <section className="popup">
            <div className="content">
                <img src={selected.Poster} ></img>
                <h2>{selected.Title} <span>{selected.Year}</span></h2>
                <p className="rating">Raiting:{selected.imdbRating}</p>
                <p className="rating">Country:{selected.Country}</p>
                <p className="rating">Type:{selected.Genre}</p>
                <p className="rating">Language:{selected.Language}</p>
                <p className="rating">Plot:{selected.Plot}</p>
                <p className="rating">Runtime:{selected.Runtime}</p>
            </div>
            <button className="close" onClick={closePopUp}>close</button>
        </section>
    );
}

export default Popup;
