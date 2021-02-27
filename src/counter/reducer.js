import axios from 'axios';

const OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=df39af2c"


export const reducer = function (state = {
  s: 1,
  results: [],
  selected: {},
}, action) {

  switch (action.type) {

    case "HANDLEINPUT":
       let handleInput = (e) => {
        console.log(e);
      
        // var val = e.target.value
        return { ...state, s: e }
      }
     return handleInput("a")

    case "searchMovie":
      const searchMovie = (e) => {
        if (e.key === "Enter") {
          axios(OMDbAPI + "&s=" + state.s).then(({ data }) => {
            let results = data.Search;
            console.log(data);
            return { ...state, results: results }
          });
        }
      }
      return searchMovie;

    case "openPopup":
      const openPopup = title => {
        axios(OMDbAPI + "&t=" + title).then(({ data }) => {
          return { ...state, selected: data }
        });
      }
      return openPopup

    case "closePopup":
      return { ...state, selected: {} };
    default:
      return state
  }
};
