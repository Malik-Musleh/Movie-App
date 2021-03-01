import React, { useState } from 'react';
import Result from './Result';

function Results({ results, openPopup }) {

    return (
        <section className="results">
            {typeof (results) != "undefined" ? results.map(result => (
                <Result key={result.imdbID} result={result} openPopup={openPopup} />
            )) : "X No movies found please check the title of the movie X"}
        </section>
    );
}

export default Results;
