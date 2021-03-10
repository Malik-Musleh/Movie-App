import React from 'react';

const Header = () => {
    const m = localStorage.getItem("wishtot")
    const f = localStorage.getItem("favTot")

    return (
        <div className="header" >
            <div>
                <a href="https://my-movie-website.herokuapp.com/" class="logo">Movie App |</a>
            </div>
                <a href="https://my-movie-website.herokuapp.com/wish-list">Wish List <span className="total-wish">{m}</span> </a>
                <a href="https://my-movie-website.herokuapp.com/favorite-list">Favorite List <span className="total-wish">{f}</span> </a>
 
        </div>
    );
};

export default Header;