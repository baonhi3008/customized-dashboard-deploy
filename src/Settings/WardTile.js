import React from "react";
import { AppContext } from "../App/AppProvider";
import { SelectableTile, DeletableTile, DisabledTile } from "../Shared/Tile";
import CoinHeaderGrid from "./WardHeaderGrid";

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
  return topSection
    ? () => {
        removeCoin(coinKey);
      }
    : () => {
        addCoin(coinKey);
      };
}

function CoinTile({ coinKey, topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, addCoin, removeCoin, isInFavorites }) => {
        let coin = coinList[coinKey];
        let TileClass = SelectableTile;
        if (topSection) {
          TileClass = DeletableTile;
        } else if (isInFavorites(coinKey)) {
          TileClass = DisabledTile;
        }
        return (
          <TileClass
            onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
          >
            <CoinHeaderGrid
              topSection={topSection}
              district={coin.NAME_2}
              ward={coin.NAME_3}
            />
            {/* <CoinImage coin={coin} /> */}
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
}

export default CoinTile;
