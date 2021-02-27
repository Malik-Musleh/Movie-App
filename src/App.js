import React, { useState } from 'react';
import Search from './Componants/Search';
import Results from './Componants/Results';
import Popup from './Componants/Popup';
import axios from 'axios';
import './App.css';

function App() {
  const OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=df39af2c"
  const [movie, setSearch] = useState({
    s: "",
    results: [],
    selected: {},
    overveiw:[]
  });

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
        {typeof movie.selected.Title != "undefined" ? <Popup selected={movie.selected} closePopUp={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
