import React from 'react';

const Header = ({wishList}) => {
    const m =localStorage.getItem("wishtot")
    return (
        <div className="header" >
            <div>
            <a href="https://my-movie-website.herokuapp.com/" class="logo">
                 {/* <img src="https://previews.123rf.com/images/fokaspokas/fokaspokas1812/fokaspokas181200273/114275789-film-roll-old-movie-strip-icon-cinema-logo-white-icon-with-shadow-on-transparent-background.jpg" ></img> */}
                 Movie App |</a>
            </div>
            <a href="https://my-movie-website.herokuapp.com/" >Home</a>
            <a href="https://my-movie-website.herokuapp.com/wish-list">Wish List {m}</a>
        </div>
    );
};

export default Header;