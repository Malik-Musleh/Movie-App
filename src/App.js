import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {  ContainerSearch, ContainerResults, ContainerPopup } from './counter/container';
import { store } from './counter/configure-store';
import { useSelector } from 'react-redux';


// import Search from './Componants/Search';
// import Results from './Componants/Results';
// import Popup from './Componants/Popup';
// import axios from 'axios';
import './App.css';

function App() {
  // const movie =useSelector(state=>state.selected);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
      </header>
      <Provider store={store}>
        <main>
        <ContainerSearch/>
        {/* <ContainerResults/> */}
        {/* <ContainerPopup/> */}
        {/* {typeof movie.selected.Title != "undefined" ? <ContainerPopup/> : false} */}
        </main>
      </Provider>


    </div>
  );
}

export default App;

{/* <Search handleInput={handleInput} searchMovie={searchMovie} />
<Results results={movie.results} openPopup={openPopup} />
{typeof movie.selected.Title != "undefined" ? <Popup selected={movie.selected} closePopUp={closePopup} /> : false} */}
// const OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=df39af2c"
// const [movie, setSearch] = useState({
//   s: "",
//   results: [],
//   selected: {},
//   overveiw:[]
// });

// const handleInput = (e) => {
//   setSearch(pre => { return { ...pre, s: e.target.value } });
// }

// const searchMovie = (e) => {
//   if (e.key === "Enter") {
//     axios(OMDbAPI + "&s=" + movie.s).then(({ data }) => {
//       let results = data.Search;
//       console.log(data);
//       setSearch(prevState => {
//         return { ...prevState, results: results }
//       })
//     });
//   }
// }

// const openPopup = title => {
//   axios(OMDbAPI + "&t=" + title).then(({ data }) => {
//     setSearch(prevState => {
//       return { ...prevState, selected: data }
//     })
//   });
// }

// const closePopup = () => {
//   setSearch(prevState => {
//     return { ...prevState, selected: {} }
//   })
// }