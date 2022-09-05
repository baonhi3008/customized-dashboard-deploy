import React from "react";
import styled from "styled-components";
import _ from "lodash";
import fuzzy from "fuzzy";
import { AppContext } from "../App/AppProvider";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

// const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
//   // Get all the coin symbols
//   let coinSymbols = Object.keys(coinList);
//   // Get all the coin names, map symbol to name
//   let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
//   let allStringsToSearch = coinSymbols.concat(coinNames);
//   let fuzzyResults = fuzzy
//     .filter(inputValue, allStringsToSearch, {})
//     .map(result => result.string);

//   let filteredCoins = _.pickBy(coinList, (result, symKey) => {
//     let coinName = result.CoinName;
//     return (
//       _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
//     );
//   });

//   setFilteredCoins(filteredCoins);
// }, 500);

// function filterCoins(e, setFilteredCoins, coinList) {
//   let inputValue = e.target.value;
//   if (!inputValue) {
//     setFilteredCoins(null);
//     return;
//   }
//   handleFilter(inputValue, coinList, setFilteredCoins);
// }
const handleFilter = _.debounce((inputValue,coinList,setFilteredCoins)=>{
	// console.log(inputValue)
	// Get all the symbol
	let wardID = Object.keys(coinList)
	// get all name
	let districtName = wardID.map(id => coinList[id].NAME_2)
	// let wardName = wardID.map(id => coinList[id].NAME_3)
	let allStringToSearch = wardID.concat(districtName)
	// let allStringToSearch2 = allStringToSearch1.concat(districtName)

	let fuzzyResults = fuzzy.filter(inputValue,allStringToSearch,{})
	.map(result => result.string)
	let filteredCoins = _.pickBy(coinList,(result,key) => {
		let districtName = result.NAME_2
		return ( _.includes(fuzzyResults,districtName) )
	})
	console.log(filteredCoins)

	setFilteredCoins(filteredCoins)
	// console.log(allStringToSearch)


},500)
function filterCoins(e, setFilteredCoins,coinList){
	let inputValue = e.target.value;
	if(!inputValue){
		setFilteredCoins(null)
		return;
	}
	handleFilter(inputValue,coinList,setFilteredCoins)
	// console.log(inputValue)
}

function Search() {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search all wards</h2>
          <SearchInput
            onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)}
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
}

export default Search;
