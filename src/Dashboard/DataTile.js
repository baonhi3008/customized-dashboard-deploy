import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/WardHeaderGrid";
import { AppContext } from "../App/AppProvider";

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const ChangePct = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `}
`;

const numberFormat = number => +(number + "").slice(0, 7);

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3}
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}

  ${props =>
    props.currentFavorite &&
    css`
      ${greenBoxShadow}
      pointer-events: none;
    `}
`;

function ChangePercent({ data }) {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}%
      </ChangePct>
    </JustifyRight>
  );
}

function PriceTileTag({ sym, ward,district,data, currentFavorite, setCurrentFavorite }) {
  return (
    <PriceTileStyled
      onClick={setCurrentFavorite}
      currentFavorite={currentFavorite}
    >
      <CoinHeaderGridStyled>
        {/* <div>{sym}</div> */}
		<div>{ward}</div>
		<JustifyRight>{district}</JustifyRight>
        {/* <ChangePercent data={data} /> */}
      </CoinHeaderGridStyled>
      <TickerPrice>{numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
}

function PriceTileCompactTag({
  sym,
  data,
  currentFavorite,
  setCurrentFavorite
}) {
  return (
    <PriceTileStyled
      onClick={setCurrentFavorite}
      compact
      currentFavorite={currentFavorite}
    >
      <JustifyLeft>{sym}</JustifyLeft>
      <ChangePercent data={data} />
      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
}

function PriceTile({coinList,price, index }) {
  let sym = Object.keys(price)[0];
  let ward = coinList[sym]["NAME_3"]
  let district = coinList[sym]["NAME_2"]
  let data = price[sym]["USD"];
  let TileClass = index < 10 ? PriceTileTag : PriceTileCompactTag;

  return (
    <AppContext.Consumer>
      {({ currentFavorite, setCurrentFavorite }) => (
        <TileClass
          sym={sym}
          data={data}
		  ward = {ward}
		  district = {district}
          currentFavorite={currentFavorite === sym}
          setCurrentFavorite={() => setCurrentFavorite(sym)}
        />
      )}
    </AppContext.Consumer>
  );
}

export default PriceTile;
