// React
import React from "react";

// React-Device-Detect
// This library is used to detect whether or not the user is on a mobile device
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  browserName,
} from "react-device-detect";

// React Components
import Browser_NavBar from "./Navbar/Browser_NavBar";

// App Function Component
class NavbarView extends React.Component {
  constructor(props) {
    super(props);

    // STATE NOTES
    // "orientation"  can be one of two possible values: "landscape" or "portrait".
    // Also note that the default setting is landscape which assumes user is on desktop browser
    this.state = {
      orientation: "landscape",
      longestStringLength: 0,
      longestString: "",
    };

    // optionsList is the navBar options titles with their dropdown subtitles
    this.optionsList = [
      {
        title: "HOME",
        subtitles: [],
        titleURL: "/",
        subtitleURLS: ["", ""],
      },
      {
        title: "SKILLS",
        subtitles: [
          "Programming",
          "Parallel Computing",
          "Machine Learning",
          "Web Development",
          "3-D Modeling",
          "Documentation",
        ],
        titleURL: "/skills",
        subtitleURLS: [
          "/programming",
          "/parallel",
          "/ml",
          "/webdev",
          "/3d",
          "/doc",
        ],
      },
      {
        title: "INTERACTIVE",
        subtitles: ["Graph Traversal"],
        titleURL: "/interactive",
        subtitleURLS: ["/graph"],
      },
      {
        title: "PORTFOLIO",
        subtitles: ["Game Stats", "Posilipo Lane"],
        titleURL: "/portfolio",
        subtitleURLS: ["/gameStats", "/posilipo"],
      },
      {
        title: "RESUME",
        subtitles: ["Download (PDF)", "Github"],
        titleURL: "/resume",
        subtitleURLS: ["/download"],
      },
    ];

    // Bindings
    this.updateStateOrientation = this.updateStateOrientation.bind(this);
    this.determineLongestString = this.determineLongestString.bind(this);
  }

  componentDidMount() {
    // DEVICE ORIENATION
    // Update orientation if on mobile phone
    if (isMobile) this.updateStateOrientation();

    // Add an event listener to the window that detects when the orientation of the device changes
    window.addEventListener("orientationchange", this.updateStateOrientation);

    // Determine the screen height (for browser view)
    this.setState({ screenHeight: screen.height });

    // Determine the longest string
    this.determineLongestString();
  }

  // Update the state orientation
  updateStateOrientation() {
    const orientation = window.orientation;

    if (orientation === 0) {
      this.setState({ orientation: "portrait" });
    } else {
      this.setState({ orientation: "landscape" });
    }
  }

  // Determine the longest string input in the options list
  determineLongestString() {
    // Define variables
    let longestString = "";
    let longestLength = -1;

    // Iterate through optionsList (checking titles and subtitles)
    // to determine the length of the longest string locally and globally
    for (let i = 0; i < this.optionsList.length; i++) {
      // Get the length of the current title
      let curLength = this.optionsList[i].title.length;

      console.log(
        "current title w/ length: " +
          this.optionsList[i].title +
          " / " +
          this.optionsList[i].title.length
      );

      // Check the title
      if (curLength > longestLength) {
        longestLength = this.optionsList[i].title.length;
        longestString = this.optionsList[i].title;
      }

      // Check the title's subtitles
      for (let j = 0; j < this.optionsList[i].subtitles.length; j++) {
        curLength = this.optionsList[i].subtitles[j].length;

        console.log(
          "current title w/ length: " +
            this.optionsList[i].subtitles[j] +
            " / " +
            this.optionsList[i].subtitles[j].length
        );

        if (curLength > longestLength) {
          longestLength = this.optionsList[i].subtitles[j].length;
          longestString = this.optionsList[i].subtitles[j];
        }
      }
    }

    // Log the information
    console.log(
      `Longest string ('${longestString}') has length of ${longestLength}`
    );

    // Set the longest string length in the component
    this.setState({
      longestStringLength: longestLength,
      longestString: longestString,
    });
  }

  // APPROACH
  // Render browser OR mobile (portrait or landscape) of website using react-device-detect.
  render() {
    return (
      <>
        <Browser_NavBar
          key={Math.random()}
          optionsList={this.optionsList}
          longestStringLength={this.state.longestStringLength}
          longestString={this.state.longestString}
          history={this.props.history}
        />
      </>
    );
  }
}

export default NavbarView;
