import React, { useState } from 'react';

function Popup({ closePopUp, selected, addToWish }) {
    const [wL, setWl] = useState(true)

    var remVal = selected.Title + "," + selected.Poster + "," + selected.imdbID
    let lS = localStorage.getItem("myData")
    // let accesse = lS.toString().search(remVal) > -1
    const removeFromWish = () => {
        let v = lS.replace(remVal, "").replace(/s+/g, "")
        localStorage.setItem("myData", v)
        setWl(true)
    }
    return (
        <section className="popup">
            <div className="button-container" >
                <button className="close" onClick={closePopUp}>close</button>
                {wL ? <button className="close" onClick={() => { addToWish(selected); setWl(false) }}>Add To Wish List</button> :
                    <button className="close" onClick={() => { removeFromWish(); }}>Remove From Wish List</button>}
            </div>
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
        </section>
    );
}

export default Popup;
