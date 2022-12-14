import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
const cc = require('cryptocompare')
var data = require("../Data/data_hcmc.json")

cc.setApiKey('72d1dbf0d15712c71d3544f6ee6f847fd5444fb758fc3313803e9f1254d28f66')

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 30;

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BNB", "XMR", "QUICK", "SOL", "BNX"],
      timeInterval: "months",
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addWard,
      removeCoin: this.removeWard,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect
    };
  }

  addWard = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeWard = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  componentDidMount = () => {
    this.fetchWards();
    this.fetchData();
    this.fetchHistorical();
  };

  fetchWards = async () => {
    // let coinList1 = (await cc.coinList()).Data;
	// console.log(coinList1)
	let coinList = data;
	console.log(coinList)
    this.setState({ coinList });
  };

  fetchData = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    this.setState({ prices });
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let result = await this.historical();
    let historical = [
      {
        // name: this.state.currentFavorite,
        data: result.map((ticker, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];
    this.setState({ historical });
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }

    return Promise.all(promises);
  };

  prices = async () => {
    let returnData = [];
    for (let favorite of this.state.favorites) {
      try {
        let priceData = await cc.priceFull(favorite, "USD", {});
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
  };

  isInFavorites = key => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchData();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  setCurrentFavorite = sym => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null
      },
      this.fetchHistorical
    );

    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorite: sym
      })
    );
  };

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  };

  setPage = page => this.setState({ page });

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  changeChartSelect = value => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
