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
import "../../public/css/PortfolioTitle.css";
import "../../public/css/Fonts.css"; // CSS Fonts

function App() {
  // State
  const [browserMobile, setBrowserMobile] = useState(false);
  const [browserDesktop, setBrowserDesktop] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const [windowInnerWidth, setWindowInnerWidth] = useState(0);
  const [contentWidthMax, setContentWidthMax] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  // Nav State
  const [webAppsOpen, setWebAppsOpen] = useState(false);
  const [frontEndCompsOpen, setFrontEndCompsOpen] = useState(false);
  const [demonstrationsOpen, setDemonstrationsOpen] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    determineBrowserType();
    getWindowWidth();
    getContentWidthMax();
    getContentWidth();

    window.onorientationchange = function (event) {
      getContentWidth();
    };

    window.onresize = function (event) {
      getContentWidth();
    };
  });

  function getWindowWidth() {
    const windowWidth = window.innerWidth;
    setWindowInnerWidth(windowWidth);
  }

  function determineBrowserType() {
    if (isMobile) {
      setBrowserMobile(true);
    } else {
      setBrowserDesktop(true);
    }
  }

  function getContentWidthMax() {
    let contentWidthMax = 0;

    if (isBrowser) {
      contentWidthMax = 0.7 * window.screen.width;
    } else {
      if (isMobile && isSafari) {
        //contentWidthMax = window.screen.availWidth - 46;
        contentWidthMax = document.body.clientWidth - 46;
      } else {
        contentWidthMax = window.innerWidth - 46;
      }
    }

    setContentWidthMax(contentWidthMax);
  }

  function getContentWidth() {
    let contentWidth = 0;

    if (isBrowser) {
      contentWidth =
        window.innerWidth >= contentWidthMax
          ? 0.7 * window.screen.width
          : window.innerWidth - 46;
    } else {
      if (isMobile && isSafari) {
        //contentWidth = window.screen.availWidth - 46;

        contentWidth = document.body.clientWidth - 46;
      } else {
        contentWidth = window.innerWidth - 46;
      }
    }

    setContentWidth(contentWidth);
  }

  function getWindowWidth() {
    const pageWidth = document.getElementById("page-width").offsetWidth;
    setPageWidth(pageWidth);
  }

  return (
    <>
      <div id="page-width" className="one-hundred">
        {/* {isBrowser ? "Desktop Browser" : "Mobile Browser"} */}
      </div>
      <>
        <div
          className="portfolio"
          style={{ minWidth: browserDesktop ? "400px" : undefined }}
        >
          <div className="portfolio-name">Yuri Dubler /&nbsp;</div>
          <div className="portfolio-text">Portfolio</div>
        </div>
        <div
          className="main-content"
          style={{
            width: browserMobile ? pageWidth - 46 : contentWidth,
            minWidth: browserMobile ? "0px" : "400px",
            //backgroundColor: webAppsOpen ? "rgb(219, 219, 206)" : "ivory",
            borderColor: webAppsOpen ? "black" : "darkgray",
          }}
        >
          <div
            className="main-content-title"
            onClick={() => {
              setWebAppsOpen(!webAppsOpen);
            }}
          >
            Web Apps (4)
          </div>
          {webAppsOpen && (
            <>
              <div
                className="main-content-item"
                style={{ border: "solid lime 5px" }}
              >
                <div className="main-content-item-title">
                  Portfolio Website (This Website)
                </div>
                <br />
                <div className="main-content-item-tech-affiliate">HOBBY</div>
                <br />
                <div className="main-content-item-tech-major">REACT</div>
                <div className="main-content-item-tech-major">NODE</div>
                <div className="main-content-item-tech-major">EXPRESS</div>
                <div className="main-content-item-cloud">HEROKU</div>
                <br />
                <div className="main-content-item-tech-minor">WEBPACK</div>
                <div className="main-content-item-tech-minor">BABEL</div>
                <br />
                <div className="main-content-item-feature">RESPONSIVE</div>
                <br />
                <div className="main-content-item-github">
                  <a
                    target="_blank"
                    href="https://github.com/ydubler/portfolio/"
                  >
                    VIEW ON GITHUB
                  </a>
                </div>
                <div className="main-content-item-descr">
                  Welcome to my Portfolio website! This website features
                  numerous projects which have helped me gain experience in
                  web-development and producing software.
                </div>
              </div>

              <div
                className="main-content-item"
                style={{ border: "solid lime 5px" }}
              >
                <div className="main-content-item-title">
                  <a target="_blank" href="https://yuri-dubler.herokuapp.com">
                    Resume Website
                  </a>
                </div>
                <br />
                <div className="main-content-item-tech-affiliate">HOBBY</div>
                <br />
                <div className="main-content-item-tech-major">REACT</div>
                <div className="main-content-item-tech-major">NODE</div>
                <div className="main-content-item-tech-major">EXPRESS</div>
                <div className="main-content-item-cloud">HEROKU</div>
                <br />
                <div className="main-content-item-tech-minor">WEBPACK</div>
                <div className="main-content-item-tech-minor">BABEL</div>
                <div className="main-content-item-tech-minor">APHRODITE</div>
                <div className="main-content-item-tech-minor">
                  SVG ANIMATION
                </div>
                <br />
                <div className="main-content-item-feature">
                  ALGORITHM VISUALIZATION
                </div>
                <br />
                <div className="main-content-item-github">
                  <a
                    target="_blank"
                    href="https://github.com/ydubler/resume-website"
                  >
                    View On Github
                  </a>
                </div>
                <div className="main-content-item-descr">
                  This was an earlier attempt at a resume/portfolio website
                  before I decided to create a new portfolio website. It
                  includes a fancy SVG animation of my name, an implementation
                  of a Navbar and a&nbsp;
                  <a
                    target="_blank"
                    href="https://yuri-dubler.herokuapp.com/articles/insertion-sort"
                  >
                    visual demo of insertion sort
                  </a>{" "}
                  using animated SVG.
                </div>
              </div>

              <div
                className="main-content-item"
                style={{ border: "solid lime 5px" }}
              >
                <div className="main-content-item-title">
                  <a
                    target="_blank"
                    href="https://atgculturecoin.herokuapp.com"
                  >
                    ATG CultureCoin
                  </a>
                </div>
                <br />
                <div className="main-content-item-tech-affiliate">
                  UNIVERSITY OF MONTANA
                </div>
                <div className="main-content-item-tech-affiliate">
                  ADVANCED TECHNOLOGY GROUP
                </div>
                <br />
                <div className="main-content-item-tech-major">REACT</div>
                <div className="main-content-item-tech-major">NODE</div>
                <div className="main-content-item-tech-major">EXPRESS</div>
                <div className="main-content-item-tech-major">POSTGRESQL</div>
                <div className="main-content-item-cloud">HEROKU</div>
                <br />
                <div className="main-content-item-tech-minor">
                  CREATE-REACT-APP
                </div>
                <br />
                <div className="main-content-item-feature">RESPONSIVE</div>
                <div className="main-content-item-feature">
                  HTTP REQUESTS/RESPONSES
                </div>
                <div className="main-content-item-feature">SQL QUERIES</div>
                <div className="main-content-item-feature">
                  PASSWORD HASHING
                </div>
                <div className="main-content-item-feature">
                  AUTHENTICATION/AUTHORIZATION
                </div>
                <div className="main-content-item-feature">LOGIN SYSTEM</div>
                <div className="main-content-item-feature">USER SESSIONS</div>
                <div className="main-content-item-feature">ADMIN CONTROLS</div>
                <div className="main-content-item-feature">
                  INVENTORY MANAGEMENT
                </div>
                <div className="main-content-item-feature">ONLINE STORE</div>
                <br />
                <div className="main-content-item-descr">
                  My team and I produced this web application for{" "}
                  <a target="_blank" href="https://atginfo.com/">
                    Advanced Technology Group
                  </a>{" "}
                  located in Missoula, Montana. It has numerous features
                  including a login system, password hashing, user sessions,
                  administrative controls, an award history page, an inventory
                  management system, and an online store.
                  <br />
                  <br />I do not own this project so I can not provide any links
                  to any source code and I can not provide credentials to allow
                  you to access the site.
                </div>
              </div>

              <div
                className="main-content-item"
                style={{ border: "solid lime 5px" }}
              >
                <div className="main-content-item-title">
                  <a target="_blank" href="https://yd-game-stats.herokuapp.com">
                    Game Stats
                  </a>
                </div>
                <br />
                <div className="main-content-item-tech-affiliate">HOBBY</div>
                <br />
                <div className="main-content-item-tech-major">REACT</div>
                <div className="main-content-item-tech-major">NODE</div>
                <div className="main-content-item-tech-major">EXPRESS</div>
                <div className="main-content-item-tech-major">POSTGRESQL</div>
                <br />
                <div className="main-content-item-tech-minor">BABEL</div>
                <div className="main-content-item-tech-minor">WEBPACK</div>
                <div className="main-content-item-tech-minor">SVG</div>
                <br />
                <div className="main-content-item-feature">
                  HTTP REQUESTS/RESPONSES
                </div>
                <div className="main-content-item-feature">SQL QUERIES</div>
                <div className="main-content-item-feature">
                  DATA VISUALIZATION
                </div>
                <br />
                <div className="main-content-item-github">
                  <a
                    target="_blank"
                    href="https://github.com/ydubler/game-stats"
                  >
                    View On Github
                  </a>
                </div>
                <div className="main-content-item-descr">
                  Game of Thrones: The Board Game is compelling and inspired
                  this web-application which allows the user to save a game
                  session into the database and then loads that data to display
                  numerous graphs about the game. It serves to preserve the
                  history of a game that has been central to our board game
                  group.
                </div>
              </div>

              <div
                className="main-content-item"
                style={{
                  background: "linear-gradient(lightgray,darkgray)",
                  border: "solid red 5px",
                }}
              >
                <div className="main-content-item-title">Vue Application</div>
                <br />
                <div className="main-content-item-warning">
                  FUTURE PROJECT (DOES NOT EXIST)
                </div>
              </div>

              <div
                className="main-content-item"
                style={{
                  background: "linear-gradient(lightgray,darkgray)",
                  border: "solid red 5px",
                }}
              >
                <div className="main-content-item-title">
                  Angular Application
                </div>
                <br />
                <div className="main-content-item-warning">
                  FUTURE PROJECT (DOES NOT EXIST)
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className="main-content"
          style={{
            width: browserMobile ? pageWidth - 46 : contentWidth,
            minWidth: browserMobile ? "0px" : "400px",
            //backgroundColor: frontEndCompsOpen ? "rgb(219, 219, 206)" : "ivory",
            borderColor: frontEndCompsOpen ? "black" : "darkgray",
          }}
        >
          <div
            className="main-content-title"
            onClick={() => {
              setFrontEndCompsOpen(!frontEndCompsOpen);
            }}
          >
            Front End Components (2)
          </div>
          {frontEndCompsOpen && (
            <>
              <div className="main-content-item">
                <div className="main-content-item-title">
                  <a target="_blank" href="/front-end-components/navbar">
                    SVG Navbar
                  </a>
                </div>
                <br />
                <div className="main-content-item-tech-affiliate">HOBBY</div>
                <br />
                <div className="main-content-item-tech-major">REACT</div>
                <div className="main-content-item-tech-major">SVG</div>
                <br />
                <div className="main-content-item-feature">RESPONSIVE</div>
                <br />
                <div className="main-content-item-github">
                  <a
                    target="_blank"
                    href="https://github.com/ydubler/portfolio/tree/master/src/app/front-end-components/Navbar"
                  >
                    View On Github
                  </a>
                </div>
                <div className="main-content-item-descr">
                  This NavBar has been carefully crafted to attract and engage
                  users with smooth SVG animations.
                </div>
              </div>

              <div className="main-content-item">
                <div className="main-content-item-title">
                  <a target="_blank" href="/front-end-components/sidebar">
                    Collapsing Sidebar
                  </a>
                </div>
                <br />
                <div className="main-content-item-tech-affiliate">HOBBY</div>
                <br />
                <div className="main-content-item-tech-major">REACT</div>
                <br />
                <div className="main-content-item-feature">RECURSIVE</div>
                <br />
                <div className="main-content-item-github">
                  <a
                    target="_blank"
                    href="https://github.com/ydubler/portfolio/tree/master/src/app/front-end-components/Sidebar"
                  >
                    View On Github
                  </a>
                </div>
                <div className="main-content-item-descr">
                  This collapsing Sidebar displays a tree of options
                  recursively.
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className="main-content"
          style={{
            width: browserMobile ? pageWidth - 46 : contentWidth,
            minWidth: browserMobile ? "0px" : "400px",
            // backgroundColor: demonstrationsOpen
            //   ? "rgb(219, 219, 206)"
            //   : "ivory",
            borderColor: demonstrationsOpen ? "black" : "darkgray",
          }}
        >
          <div
            className="main-content-title"
            onClick={() => {
              setDemonstrationsOpen(!demonstrationsOpen);
            }}
          >
            Algorithm Visualizations (1)
          </div>
          {demonstrationsOpen && (
            <>
              <div className="main-content-item">
                <div className="main-content-item-title">
                  <a
                    target="_blank"
                    href="https://yuri-dubler.herokuapp.com/articles/insertion-sort"
                  >
                    Insertion Sort
                  </a>
                </div>
                <br />
                <div className="main-content-item-tech-affiliate">HOBBY</div>
                <br />
                <div className="main-content-item-tech-major">REACT</div>
                <div className="main-content-item-tech-major">SVG</div>
                <br />
                <div className="main-content-item-feature">SVG ANIMATION</div>
                <br />
                <div className="main-content-item-github">
                  <a
                    target="_blank"
                    href="https://github.com/ydubler/resume-website/tree/master/src/components/articles/Articles/InsertionSort"
                  >
                    View On Github
                  </a>
                </div>
                <div className="main-content-item-descr">
                  This is a visual demonstration of an insertion sort algorithm.
                </div>
              </div>
            </>
          )}
        </div>
      </>

      {/* <img src="/public/images/coffee1.jpg"></img> */}
    </>
  );
}

export default App;
