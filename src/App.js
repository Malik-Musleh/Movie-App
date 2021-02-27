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
