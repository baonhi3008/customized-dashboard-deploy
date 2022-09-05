import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import PriceTile from "./DataTile";

const PriceGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 80fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

function PriceGrid() {
  return (
    <AppContext.Consumer>
      {({coinList,prices }) => (
        <PriceGridStyled>
          {prices.map((price, index) => (
            <PriceTile key={index} price={price} index={index} coinList = {coinList} />
          ))}
        </PriceGridStyled>
      )}
    </AppContext.Consumer>
  );
}

export default PriceGrid;
