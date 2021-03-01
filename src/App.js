import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Search from './Componants/Search';
import Header from './Componants/Header';
import Results from './Componants/Results';
import Home from './Componants/Home';
import Wishlist from './Componants/Wishlist';
import Popup from './Componants/Popup';
import axios from 'axios';
import './App.css';

function App() {
  const OMDbAPI = "https://www.omdbapi.com/?apikey=df39af2c"
  const [movie, setSearch] = useState({
    s: "",
    results: [],
    selected: {},
    allMovie: [],
    page: "1",
    searchPage: "1",
    wishList: []
  });

  const handleInput = (e) => {
    setSearch(pre => { return { ...pre, s: e.target.value } });
  }

  const searchMovie = (e) => {
    if (e.key === "Enter") {
      axios(OMDbAPI + "&s=" + movie.s + "&page=" + movie.searchPage).then(({ data }) => {
        let results = data.Search;
        if (typeof (results) == "undefined") results = [];
        setSearch(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const addToWish = (e) => {
    const a = movie.wishList
    a.push(e)
    setSearch(pre => { return { ...pre, wishList: a } })
  }

  const getAllMovies = async () => {
    await axios(OMDbAPI + "&s=batman&page=" + movie.page).then(({ data }) => {
      setSearch(prevState => {
        return { ...prevState, allMovie: data.Search }
      })
    });
  }

  const openPopup = id => {
    axios(OMDbAPI + "&i=" + id).then(({ data }) => {
      setSearch(prevState => {
        return { ...prevState, selected: data }
      })
    });
  }

  const closePopup = () => {
    setSearch(prevState => {
      return { ...prevState, selected: {} }
    })
  }
  const set = () => movie.wishList.length == 0 ? true : movie.wishList.forEach(element => {
    let m = localStorage.getItem('myData');
    if (m.search(element.Title) == -1) {
      var s;
      m.length < 1 ? s = m.concat(" " + element.Title + "," + element.Poster + "," + element.imdbID) : s = m.concat("," + element.Title + "," + element.Poster + "," + element.imdbID)
      localStorage.setItem('myData', s);
    }
  });
  const decPage = () => { setSearch(prevState => { return { ...prevState, page: (Number(movie.page--)).toString() } }); getAllMovies() }
  const incPage = () => { setSearch(prevState => { return { ...prevState, page: (Number(movie.page++)).toString() } }); getAllMovies() }

  useEffect(() => getAllMovies(), [])

  useEffect(() => set)
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Header wishList={movie.wishList} />
          <header className="App-header">
            <h1>Movie App</h1>
          </header>
          <main>
            <Search handleInput={handleInput} searchMovie={searchMovie} />
          </main>
          {movie.results.length > 1 ? <Results results={movie.results} openPopup={openPopup} /> :
            <Home results={movie.allMovie} openPopup={openPopup} />}
        </Route>
        <Route exact path="https://my-movie-website.herokuapp.com/wish-list">
          <Header wishList={movie.wishList} />
          <Wishlist results={movie.wishList} openPopup={openPopup} />
        </Route>
        <div className="button-container" >
          {movie.page <= "1" ? (true) : <button onClick={() => decPage}>Pre Page</button>}
          <button onClick={incPage}>Next Page</button>
        </div>
        {typeof movie.selected.Title != "undefined" ? <Popup selected={movie.selected} addToWish={addToWish} closePopUp={closePopup} /> : false}
      </div>
    </Router>
  );
}

export default App;
