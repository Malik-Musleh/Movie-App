import React, { useState } from 'react';
import Result from './Result';

function WishList({ results, openPopup }) {
    const wish = localStorage.getItem('myData');
    console.log(wish.split(","));
    const object =wish.split(",").map((e,i,a) => {
        if (i%2===0) {       
            return {Title:a[i],Poster:a[i+1]}
        }else{
            return ""
        }
    });
    const rem =object.filter((e,i,a)=>typeof(e.Title)!=="undefined"&&e!==a[i+1])
    console.log(rem);  
    // const w = wish.split(",").filter((e, i, a) => a.indexOf(e) > -1 ? a.splice(i, 0) : e)
    const m = rem.map((result,i )=> (<div key={i} className="result" onClick={() => openPopup(result.Title)}>
        <img src={result.Poster} ></img>
        <h3>{result.Title}</h3>
    </div>
    ));
    // console.log(w);

    return (
        <section className="results">
            {m}
        </section>
    );
}

export default WishList;
