import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Popup({ closePopUp, selected, addToWish, addTofav }) {
    const [wL, setWl] = useState(true)
    const [fav, setFav] = useState(false)

    var remVal = selected.Title + "," + selected.Poster + "," + selected.imdbID + ",";

    let urlTitle = selected.Title.replaceAll(/\s+/g, "-").replaceAll(/[_)(*&^%$#@!",:;?\\]|[0-9]+j/g, "") + "-" + selected.Year;
    let watchItUrl = `https://eg.egybest.com/explore/?q=${urlTitle}`;

    let lS = localStorage.getItem("myData")
    let myFav = localStorage.getItem("favList")

    const btn = () => {
        if (lS.search(selected.imdbID) !== -1) {
            setWl(true)
        } else {
            setWl(false)
        }
        if (myFav.search(selected.imdbID) !== -1) {
            setFav(true)
        } else {
            setFav(false)
        }
    }
    const removeFromWish = () => {
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
                confirmButtonText: 'Yes, Removed it!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    let v = lS.replace(remVal, "")
                    localStorage.setItem("myData", v)
                    setWl(false)
                    let tot = localStorage.getItem('wishtot');
                    tot--
                    localStorage.setItem('wishtot', tot);
                    Swal.fire(
                        'Deleted!',
                        'Your movie has been removed.',
                        'success'
                    )
                }
            })
        }
        setTimeout(() => {
            window.location.reload(false);
          }, 2000);
    }
    var remFav = selected.Title + "," + selected.Poster + "," + selected.imdbID + ",";

    const removeFav = () => {
        if (myFav.search(selected.Title) == -1) {
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
                confirmButtonText: 'Yes, Removed it!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    let v = myFav.replace(remFav, "")
                    localStorage.setItem("favList", v)
                    setWl(false)
                    let tot = localStorage.getItem('favTot');
                    tot--
                    localStorage.setItem('favTot', tot);
                    Swal.fire(
                        'Deleted!',
                        'Your movie has been removed.',
                        'success'
                    )
                }
            })
        }
        setTimeout(() => {
            window.location.reload(false);
          }, 2000);
    }

    useEffect(() => { btn(); })

    return (
        <section className="popup animate__animated animate__fadeInUp">
            <div>
                {fav ? <span> <span className="close closeA" onClick={() => removeFav()} class="fa fa-star checked"></span></span> :
                    <span> <span className="close closeA" onClick={() => addTofav(selected)} class="fa fa-star"></span></span>}
            </div>
            <div className="button-container" >
                <button className="close closeA" onClick={closePopUp}>close</button>
                {wL ? <button className="close closeA" onClick={() => { removeFromWish(); }}>Remove From Wish List</button> :
                    <button className="close closeA" onClick={() => { setWl(true); addToWish(selected); }}>Add To Wish List</button>}
                <a href={watchItUrl} ><button className="close closeA" > EgyBest</button></a>
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
