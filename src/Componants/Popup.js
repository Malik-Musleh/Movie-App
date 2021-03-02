import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Popup({ closePopUp, selected, addToWish }) {
    const [wL, setWl] = useState(true)

    var remVal = selected.Title + "," + selected.Poster + "," + selected.imdbID+","
    let lS = localStorage.getItem("myData")//.replace(/\s+/g, "")
    const removeFromWish = () => {
        console.log(lS.search(selected.Title));
        if (lS.search(selected.Title) == -1) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Already removed !',
                footer: '<a href>Why do I have this issue?</a>'
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let v = lS.replace(remVal, "")
                    localStorage.setItem("myData", v)
                    setWl(true)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }
    }
    return (
        <section className="popup">
            <div className="button-container" >
                <button className="close" onClick={closePopUp}>close</button>
                <button className="close" onClick={() => { addToWish(selected); setWl(false) }}>Add To Wish List</button>
                <button className="close" onClick={() => { removeFromWish(); }}>Remove From Wish List</button>
                {/* {wL ? <button className="close" onClick={() => { addToWish(selected); setWl(false) }}>Add To Wish List</button> :
                    <button className="close" onClick={() => { removeFromWish(); }}>Remove From Wish List</button>} */}
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
