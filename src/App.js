import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
  // const OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=df39af2c"
  const OMDbAPI = "http://www.omdbapi.com/?apikey=df39af2c"
  const [movie, setSearch] = useState({
    s: "",
    results: [],
    selected: {},
    All: [],
    page: "1",
    wishList: []
  });
  // localStorage["array"] = ["s", 2, { 3: 3, 4: 4, 5: 4 }];
  // localStorage.array[1]="1"
  // localStorage["names"] = new Array();
  // localStorage.names[0] = prompt("New member name?");

  // movie.s.length == 0 ? setSearch((pre => { return { ...pre, results: [] } })) : setSearch((pre => { return { ...pre, All: [] } }))
  const handleInput = (e) => {
    setSearch(pre => { return { ...pre, s: e.target.value } });
  }

  const searchMovie = (e) => {
    if (e.key === "Enter") {
      axios(OMDbAPI + "&s=" + movie.s).then(({ data }) => {
        let results = data.Search;
        console.log(data);
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
  // const getAllMovies = () => {
  //   axios(OMDbAPI + "&s=Batman&page=" + movie.page).then(({ data }) => {
  //     console.log(data.Search);
  //     setSearch(prevState => {
  //       return { ...prevState, All: data.Search }
  //     })
  //   });
  // }
  // getAllMovies()
  const openPopup = id => {
    axios(OMDbAPI + "&i=" + id).then(({ data }) => {
      setSearch(prevState => {
        console.log(data);
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
    console.log(m);
    if (m.search(element.Title)==-1) {
      var s;
      m.length<1? s=m.concat(" "+element.Title+","+element.Poster+","+element.imdbID): s=m.concat(","+ element.Title+","+element.Poster+","+element.imdbID)
      localStorage.setItem('myData',s);
    }
    });      
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
            <Results results={movie.results} openPopup={openPopup} />
          </main>
        </Route>
        <Route exact path="/wish-list">
        <Header  wishList={movie.wishList}/>
          <Wishlist results={movie.wishList} openPopup={openPopup} />
        </Route>
        {/* <Home results={movie.All} ope nPopup={openPopup}  /> */}
        {/* <button onClick={() => setSearch(prevState =>{return {...prevState, page: (Number(movie.page++)).toString()}})}>+</button> */}
        {/* {movie.page===1? (true):<button onClick={() => setSearch(prevState =>{return {...prevState, page: (Number(movie.page--)).toString()}})}>-</button>} */}
        {typeof movie.selected.Title != "undefined" ? <Popup selected={movie.selected} addToWish={addToWish} closePopUp={closePopup} /> : false}
      </div>
    </Router>
  );
}

export default App;
