import React, { useState } from 'react';
import Search from './Componants/Search';
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
  


  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
      </header>
      <main>
        <Search handleInput={handleInput} searchMovie={searchMovie} />
      </main>
    </div>
  );
}

export default App;
