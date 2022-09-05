import React from "react";
import styled from "styled-components";
import { Tile } from "../Shared/Tile";
import CoinImage from "../Shared/WardExtra";
import { AppContext } from "../App/AppProvider";
const SpotlightHeader = styled.h1`
  text-align: center;
`;
const SpotlightWard = styled.h3`
  text-align: center;
`;
const SpotlightDistrict = styled.h3`
  text-align: center;
`;
const SpotlightPopulation = styled.h3`
  text-align: center;
`;


function CoinSpotlight() {
  return (
    <AppContext.Consumer>
      {({currentFavorite, coinList }) => (
        <Tile>
		<SpotlightHeader> Thông tin </SpotlightHeader>
          <SpotlightWard> XÃ: {coinList[currentFavorite].NAME_3}</SpotlightWard>
		  <SpotlightDistrict> Quận - Huyện: {coinList[currentFavorite].NAME_2}</SpotlightDistrict>
		  <SpotlightPopulation> Dân số: {coinList[currentFavorite].POPULATION}</SpotlightPopulation>


          {/* <CoinImage spotlight coin={coinList[currentFavorite]} /> */}
        </Tile>
      )}
    </AppContext.Consumer>
  );
}

export default CoinSpotlight;
