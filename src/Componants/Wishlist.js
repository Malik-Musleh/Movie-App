
function WishList({ results, openPopup }) {
    let wish = localStorage.getItem('myData');
    wish=wish.replaceAll(/\s+/g,"")
    console.log(wish[0]);
    if (wish[0]==",") wish=wish.replace(",","")
    console.log(wish);
    // wish[0]===","?wish.replace(",",""):false
    const object = wish.split(",").map((e, i, a) => {
        if (i % 3 === 0) {
            return { Title: a[i], Poster: a[i + 1], imdbID: a[i + 2] }
        } else {
            return ""
        }
    });

    const rem = object.filter((e, i, a) => typeof (e.Poster) !== "undefined" && e !== a[i + 1])
    console.log("rem[0].Title",rem[0].Title);
    if (rem[0].Title == "") rem.length=0
console.log("rem",rem);

    const m = rem.map((result, i) => (<div key={i} className="result" onClick={() => openPopup(result.imdbID)}>
        <img src={result.Poster} ></img>
        <h3>{result.Title}</h3>
    </div>
    ));

    localStorage.setItem('wishtot', rem.length);

    return (
        <section className="results">
            {m}
        </section>
    );
}

export default WishList;
