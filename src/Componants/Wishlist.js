
function WishList({ results, openPopup }) {
    let wish = localStorage.getItem('myData');
    wish = wish.replaceAll(/\s+/g, "")
    if (wish[0] === ",") wish = wish.replace(",", "")
    const object = wish.split(",").map((e, i, a) => {
        if (i % 3 === 0) {
            return { Title: a[i], Poster: a[i + 1], imdbID: a[i + 2] }
        } else {
            return ""
        }
    });

    const rem = object.filter((e, i, a) => typeof (e.Poster) !== "undefined" && e !== a[i + 1])
    const m = rem.map((result, i) => (<div key={i} className="result animate__animated animate__pulse" onClick={() => openPopup(result.imdbID)}>
        <img src={result.Poster} ></img>
        <h3>{result.Title}</h3>
    </div>
    ));

    localStorage.setItem('wishtot', rem.length);
    return (

        <section className="results ">
            {m}
        </section>
    );
}

export default WishList;
