import React from 'react';

const Header = () => {
    const m = localStorage.getItem("wishtot")
    return (
        <div className="header" >
            <div>
                <a href="https://my-movie-website.herokuapp.com/" class="logo">Movie App |</a>
            </div>
            <a href="https://my-movie-website.herokuapp.com/" >Home</a>
            <a href="https://my-movie-website.herokuapp.com/wish-list">Wish List {m}</a>
        </div>
    );
};

export default Header;