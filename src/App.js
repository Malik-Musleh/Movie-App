import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';

import Search from './Componants/Search';
import Header from './Componants/Header';
import Results from './Componants/Results';
import Home from './Componants/Home';
import Wishlist from './Componants/Wishlist';
import Popup from './Componants/Popup';
import './App.css';

function App() {
  const OMDbAPI = "https://www.omdbapi.com/?apikey=df39af2c"
  const [movie, setSearch] = useState({
    s: "",
    results: [],
    selected: {},
    allMovie: [],
    pages: {
      home: 1,
      searchPage: 1,
    },
    wishList: [],
    favList: []
  });

  const handleInput = (e) => {
    setSearch(pre => { return { ...pre, s: e.target.value } });
  }

  const searchMovie = async (e) => {
    if (e.key === "Enter") {
      await axios(OMDbAPI + "&s=" + movie.s + "&page=" + "1").then(({ data }) => {
        let results = data.Search;
        if (typeof (results) == "undefined") {
          results = [];
          Swal.fire({
            icon: 'info',
            title: 'Not found...',
            text: ' No movies with such title found, please checkout the movie title.!',
            footer: '<a href>Why do I have this issue?</a>',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        }
        setSearch(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const searchPageMovie = async () => {
    await axios(OMDbAPI + "&s=" + movie.s + "&page=" + movie.pages.searchPage).then(({ data }) => {
      let results = data.Search;
      if (typeof (results) == "undefined") {
        results = [];
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'No movies with this name found, please check movie title.!',
          footer: '<a href>Why do I have this issue?</a>',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      }
      setSearch(prevState => {
        return { ...prevState, results: results }
      })
    });
  }


  const addToWish = (e) => {
    let lS = localStorage.getItem('myData');
    if (lS.search(e.Title) != -1) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Already exist !',
        footer: '<a href>Why do I have this issue?</a>',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      const a = movie.wishList
      a.push(e)
      setSearch(pre => { return { ...pre, wishList: a } })
      let wlTot = Number(localStorage.getItem('wishtot'))
      wlTot++
      localStorage.setItem('wishtot', wlTot);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your movie has been saved in the wish list',
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
  }
  if (localStorage.getItem('favList') == null) localStorage.setItem('favList', "");

  const addTofav = (e) => {
    let lS = localStorage.getItem('favlist');
    if (lS.search(e.Title) != -1) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Already exist !',
        footer: '<a href>Why do I have this issue?</a>',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      const a = movie.favList
      a.push(e)
      setSearch(pre => { return { ...pre, favList: a } })
      console.log(a);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your movie has been saved in the wish list',
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
  }

  const getAllMovies = async () => {
    await axios(OMDbAPI + "&s=batman&page=" + movie.pages.home).then(({ data }) => {
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
  if (localStorage.getItem('myData') == null) localStorage.setItem('myData', "");

  const set = () => movie.wishList.length == 0 ? true : movie.wishList.forEach(element => {
    let m = localStorage.getItem('myData');
    if (m.toString().search(element.Title) == -1) {
      var s;
      m.length < 1 ? s = m.concat(" " + element.Title + "," + element.Poster + "," + element.imdbID + ",") : s = m.concat(element.Title + "," + element.Poster + "," + element.imdbID + ",")
      localStorage.setItem('myData', s);
    }
  });
  const setFav = () => movie.favList.length == 0 ? true : movie.favList.forEach(element => {
    let m = localStorage.getItem('favList');
    if (m.toString().search(element.Title) == -1) {
      var s;
      m.length < 1 ? s = m.concat(" " + element.Title + "," + element.Poster + "," + element.imdbID + ",") : s = m.concat(element.Title + "," + element.Poster + "," + element.imdbID + ",")
      localStorage.setItem('favList', s);
    }
  });
  const decPage = async () => { let home = movie.pages.home - 1; setSearch(prevState => { return { ...prevState, pages: { home: home, searchPage: 1 } } }); await getAllMovies() }
  const incPage = async () => { let home = movie.pages.home + 1; setSearch(prevState => { return { ...prevState, pages: { home: home, searchPage: 1 } } }); await getAllMovies() }

  const decPageS = async () => { let searchPage = movie.pages.searchPage - 1; setSearch(prevState => { return { ...prevState, pages: { searchPage: searchPage, home: 1 } } }); await searchPageMovie() }
  const incPageS = async () => { let searchPage = movie.pages.searchPage + 1; setSearch(prevState => { return { ...prevState, pages: { searchPage: searchPage, home: 1 } } }); await searchPageMovie() }
  useEffect(() => { getAllMovies(); set() ;setFav()})
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
          {movie.results.length > 0 ? <Results results={movie.results} openPopup={openPopup} /> :
            <Home results={movie.allMovie} openPopup={openPopup} />}

          {movie.results.length == 0 ? <div className="button-container" >
            {movie.pages.home <= "1" ? (true) : <button className="close" onClick={decPage}>Pre Page</button>}
            <span>| {movie.pages.home} |</span> 
            <button className="close"  onClick={incPage}>Next Page</button>
          </div> : <div className="button-container" >
              {movie.pages.searchPage <= "1" ? (true) : <button className="close"  onClick={decPageS}>Pre Page</button>}
              <span>| {movie.pages.searchPage} |</span>
              <button className="close"  onClick={incPageS}>Next Page</button>
            </div>}
        </Route>
        <Route exact path="/wish-list">
          <Header wishList={movie.wishList} />
          <Wishlist results={movie.wishList} openPopup={openPopup} />
        </Route>
        {typeof movie.selected.Title != "undefined" ? <Popup selected={movie.selected} addTofav={addTofav} addToWish={addToWish} closePopUp={closePopup} /> : false}
      </div>
    </Router>
  );
}

export default App;
