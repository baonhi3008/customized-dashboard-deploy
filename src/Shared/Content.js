import React from "react";
import { AppContext } from "../App/AppProvider";

function Content(props) {
  return (
    <AppContext.Consumer>
      {({ coinList, prices, firstVisit }) => {
        if (!coinList) {
          return <div>Loading Wards</div>;
        }
        if (!firstVisit && !prices) {
          return <div>Loading Information</div>;
        }
        return <div>{props.children}</div>;
      }}
    </AppContext.Consumer>
  );
}

export default Content;
