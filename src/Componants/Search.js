import React  from 'react';

function Search({handleInput,searchMovie}) {
  return (
<section className="search-box-wrap">
    <input className="search-box" placeholder="Search for a movie ... " name=""
    onChange={handleInput}
    onKeyPress={searchMovie}/>
</section>
  );
}

export default Search;
