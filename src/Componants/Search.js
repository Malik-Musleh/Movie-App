import React  from 'react';
import { useSelector } from 'react-redux';


function Search({state,handleInput,searchMovie}) {
  console.log("state",state);
  // console.log("handleInput",handleInput);
  // console.log("searchMovie",searchMovie);
  console.log(useSelector(s=>s)); 
  return (
<section className="search-box-wrap">
    <input className="search-box" placeholder="Search for a movie ... " 
    // onKeyDown={handleInput}
    onChange={(e) => handleInput(e.target.value)}
    onKeyPress={(e)=>searchMovie(e.target.value)}
    />
    <button onClick={handleInput} >test</button>
</section>
  );
}

export default Search;
