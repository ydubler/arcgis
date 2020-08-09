import React, { useState, useEffect } from "react";
import {
  isMobile,
  isBrowser,
  BrowserView,
  MobileView,
  isSafari,
  isIOS,
  isMobileSafari,
} from "react-device-detect";

import "../../public/css/App.css"; // CSS

function App() {
  // State
  //const [browserMobile, setBrowserMobile] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  /*
  useEffect(() => {
    console.log("...");
  });
  */

  return (
    <>
      <h1>ArcGIS API for Javascript</h1>
      <h3>(Please refresh the page if the map does not load.)</h3>
      <h3>
        All cities in Africa with a popluation similar to Missoula's //&nbsp;
        <a href="https://github.com/ydubler/ArcGIS/blob/master/src/server.js">
          Link to Code
        </a>
      </h3>
      <div className="centered">
        <div className="viewDiv" id="viewDiv"></div>
      </div>
      {/* <img src="/public/images/coffee1.jpg"></img> */}
    </>
  );
}

export default App;
