import React from "react";
import styled from "styled-components";
import Page from "../Shared/Page";
import PriceGrid from "./WardDataGrid";
import CoinSpotlight from "./WardSpotlight";
import PriceChart from "./RainFallChart";
import InteractiveReport from "./InteractiveReport";

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`;

function Dashboard() {
  return (
    <Page name="dashboard">
      <PriceGrid />
      <ChartGrid>
        <CoinSpotlight />
        <PriceChart />
      </ChartGrid>
	  <InteractiveReport/>
    </Page>
  );
}

export default Dashboard;
