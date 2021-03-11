import { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthOProviderWithHistory from "./contexts/AuthOProviderWithHistory";
import MediaQueryContext from "./contexts/MediaQueryContext";
import ScrollContext from "./contexts/ScrollContext";
import { PrivateRoute } from "./utils/PrivateRoutes";

import LayoutGoals from "./layouts/LayoutGoals/LayoutGoals";
import Landing from "./layouts/Landing/Landing";

function App() {
  //  for Media Query Context
  const [mediaQuery, setMediaQuery] = useState(window.innerWidth);
  const mediaQueryContextValue = { mediaQuery, setMediaQuery };

  let vhMobile = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vhMobile", `${vhMobile}px`);

  let vwMobile = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vwMobile", `${vwMobile}px`);

  // change the media query on resize of window
  window.addEventListener("resize", () => setMediaQuery(window.innerWidth));

  return (
    <Router>
      <AuthOProviderWithHistory>
        <MediaQueryContext.Provider value={mediaQueryContextValue}>
          <Switch>
            <Route exact path="/">
              <Landing></Landing>
            </Route>
            <PrivateRoute path="/goals" component={LayoutGoals}></PrivateRoute>
          </Switch>
        </MediaQueryContext.Provider>
      </AuthOProviderWithHistory>
    </Router>
  );
}

export default App;
