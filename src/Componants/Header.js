import React from 'react';

const Header = ({wishList}) => {
    const m =localStorage.getItem("wishtot")
    console.log(m);
    return (
        <div className="header" >
            <div>
            <a href="http://localhost:3000/" class="logo">CompanyLogo <img src="https://previews.123rf.com/images/fokaspokas/fokaspokas1812/fokaspokas181200273/114275789-film-roll-old-movie-strip-icon-cinema-logo-white-icon-with-shadow-on-transparent-background.jpg" ></img></a>
            </div>
            <a href="http://localhost:3000/" >Home</a>
            <a href="http://localhost:3000/wish-list">Wish List {m}</a>
        </div>
    );
};

export default Header;