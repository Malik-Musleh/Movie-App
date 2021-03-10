import React from 'react';

const Header = () => {
    const m = localStorage.getItem("wishtot")
    return (
        <div className="header" >
            <div>
                <a href="https://my-movie-website.herokuapp.com/" class="logo">Movie App |</a>
            </div>
            <a href="https://my-movie-website.herokuapp.com/" >Home</a>
            <a href="https://my-movie-website.herokuapp.com/wish-list">Wish List <span className="total-wish">{m}</span> </a>
            <a href="https://my-movie-website.herokuapp.com/favorite-list">Favorite List <span className="total-wish">{m}</span> </a>
        </div>
    );
};

export default Header;