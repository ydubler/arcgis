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
      <div id="viewDiv"></div>
      {/* <img src="/public/images/coffee1.jpg"></img> */}
    </>
  );
}

export default App;
