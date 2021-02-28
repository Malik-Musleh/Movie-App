import React, { useState } from 'react';
import Search from './Componants/Search';
import Results from './Componants/Results';
import Home from './Componants/Home';
import Popup from './Componants/Popup';
import axios from 'axios';
import './App.css';

function App() {
  const OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=df39af2c"
  const [movie, setSearch] = useState({
    s: "",
    results: [],
    selected: {},
    All:[],
    page:[]
  });
  movie.s.length==0?setSearch((pre => { return { ...pre, results: []} })):setSearch((pre => { return { ...pre, All: []} }))
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
  const changePage=()=>setSearch(prevState => {
    return { ...prevState, page: (Number(page++)).toString() }
  })
  const getAllMovies = (num) => {
      axios(OMDbAPI+ "&page=" + num).then(({ data }) => {
        // let All = data.slice(0,15);
        console.log(data);
        setSearch(prevState => {
          return { ...prevState, All: data }
        })
      });
    }
  
  // getAllMovies();
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
      </header>
      <main>
        <Search handleInput={handleInput} searchMovie={searchMovie} />
        <Results results={movie.results} openPopup={openPopup} />
        <Results results={movie.All} openPopup={openPopup} />
        {typeof movie.selected.Title != "undefined" ? <Popup selected={movie.selected} closePopUp={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
