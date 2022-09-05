import React from "react";
import { AppContext } from "../App/AppProvider";

function WelcomeMessage() {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to DART tracking customization, please select your customized wards to begin.
          </div>
        ) : null
      }
    </AppContext.Consumer>
  );
}

export default WelcomeMessage;
