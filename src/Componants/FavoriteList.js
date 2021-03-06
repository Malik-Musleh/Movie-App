import Result from './Result';

function FavoriteList({ openPopup }) {
    let wish = localStorage.getItem('favList');
    if (wish[0] === ",") wish = wish.replace(",", "")
    const object = wish.split(",").map((e, i, a) => {
        if (i % 3 === 0) {
            return { Title: a[i], Poster: a[i + 1], imdbID: a[i + 2] }
        } else {
            return ""
        }
    });

    const rem = object.filter((e, i, a) => typeof (e.Poster) !== "undefined" && e !== a[i + 1])
    localStorage.setItem("favTot", rem.length)
    return (

        <section className="results ">
            {rem.map(result => (
                <Result key={result.imdbID} result={result} openPopup={openPopup} />
            ))}
        </section>
    );
}

export default FavoriteList;
