import Result from './Result';

function WishList({ results, openPopup }) {
    const wish = localStorage.getItem('myData');
    console.log(wish.split(","));
    const object =wish.split(",").map((e,i,a) => {
        if (i%3===0) {       
            return {Title:a[i],Poster:a[i+1],imdbID:a[i+2]}
        }else{
            return ""
        }
    });
    const rem =object.filter((e,i,a)=>typeof(e.Title)!=="undefined"&&e!==a[i+1])
    let bool =rem[0].Title==""
    if (bool) rem.length=0
    console.log(rem);
        
    const m = rem.map((result,i )=> (<div key={i} className="result" onClick={() => openPopup(result.imdbID)}>
        <img src={result.Poster} ></img>
        <h3>{result.Title}</h3>
    </div>
    ));
    localStorage.setItem('wishtot',rem.length);      

    return (
        <section className="results">
            {m}
        </section>
    );
}

export default WishList;
