import { connect } from 'react-redux';

import { Result } from '../Componants/Result';
import Results from '../Componants/Results';
import Popup from '../Componants/Popup';
import Search from '../Componants/Search';

const mapStateToProps = state => {
  return {
    state: state
  }
};
const mapStateToPropsResults = state => {
  return {
    results: state.results
  }
};
const mapStateToPropsPopup = state => {
  return {
    selected: state.selected
  }
};
const handleInput = (e) => {
  console.log(e.target.value );
 
  var val =e.target.value 
  return //{ ...state, s: e.target.value }
}
const mapDispatchToPropsSearch = dispatch => {
  return {
    handleInput:  () => dispatch({ type: 'HANDLEINPUT' }),
    searchMovie: () => dispatch({ type: 'searchMovie' }),
  }
};
const mapDispatchToPropsResults = dispatch => {
  return {
    openPopup: (title) => dispatch({ type: 'openPopup' }),
  }
};
const mapDispatchToPropsPopup = dispatch => {
  return {
    closePopUp: () => dispatch({ type: 'closePopUp' }),
  }
};

const ContainerSearch = connect(mapStateToProps, mapDispatchToPropsSearch)(Search);
const ContainerResults = connect(mapStateToPropsResults, mapDispatchToPropsResults)(Results);
const ContainerPopup = connect(mapStateToPropsPopup, mapDispatchToPropsPopup)(Popup);

export  { ContainerSearch, ContainerResults, ContainerPopup }
