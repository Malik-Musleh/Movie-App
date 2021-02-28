import React, { useState, useEffect } from 'react';
import Search from './Componants/Search';
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
    const a=movie.wishList
    a.push(e)
    setSearch(pre => { return { ...pre, wishList:a} })
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
  const openPopup = title => {
    axios(OMDbAPI + "&t=" + title).then(({ data }) => {
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
  // useEffect(() => getAllMovies(),[])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
      </header>
      <main>
        <Search handleInput={handleInput} searchMovie={searchMovie} />
        <Results results={movie.results} openPopup={openPopup} />
        {/* <Home results={movie.All} ope nPopup={openPopup}  /> */}
        {/* <button onClick={() => setSearch(prevState =>{return {...prevState, page: (Number(movie.page++)).toString()}})}>+</button> */}
        {/* {movie.page===1? (true):<button onClick={() => setSearch(prevState =>{return {...prevState, page: (Number(movie.page--)).toString()}})}>-</button>} */}
        {typeof movie.selected.Title != "undefined" ? <Popup selected={movie.selected} addToWish={addToWish} closePopUp={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
