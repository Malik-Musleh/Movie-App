import React,{useState} from 'react';
import Result from './Result';

function Home({ results ,openPopup}) {


    return (
        <section className="results">
            {results.map(result => (
                <Result key={result.imdbID} result={result} openPopup={openPopup} />
            ))}
        </section>
    );
}

export default Home;
