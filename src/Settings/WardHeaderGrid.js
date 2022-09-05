import React from "react";
import styled from "styled-components";
import { DeletableTile } from "../Shared/Tile";

export const CoinHeaderGridStyled = styled.div`
display: grid;
grid-template-columns: 2fr 0.75fr;`

export const CoinSymbol = styled.div`
  justify-self: auto;
`;

const DeleteIcon = styled.div`
  justify-self: right;
  display: block;
  ${DeletableTile}:hover & {
    display: block;
    color: red;
  }
`;

function CoinHeaderGrid({ district, ward, topSection }) {
  return (
    <CoinHeaderGridStyled>
      <div>{district} </div>
		{/* <div>{district}</div> */}
		{topSection ? 
		(<DeleteIcon>{ward} </DeleteIcon> ) 
		: (<CoinSymbol>{ward}</CoinSymbol>)}
    </CoinHeaderGridStyled>
  );
}

export default CoinHeaderGrid;
