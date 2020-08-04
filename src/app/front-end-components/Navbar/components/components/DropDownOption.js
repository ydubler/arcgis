// React
import React from "react";

// Aphrodite
import { StyleSheet, css } from "aphrodite";

// React-Device-Detect
// This library is used to detect whether or not the user is on a mobile device
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

// App Function Component
class DropDownOption extends React.Component {
  // GENERAL NOTES
  // DROP DOWN OPTION DOES NOT WORK YET -- SOMETHING ABOUT THE Y COMPONENT OF THE RECT & TEXT
  constructor(props) {
    super(props);

    // STATE NOTES
    this.state = {
      mouseEnteredDropdownOption: false,
      mouseTriggeredAnimation: false,
      fillColor: this.props.optionFillColor,
    };

    // // Aphrodite Stylesheet
    // this.styles = StyleSheet.create({});

    // Aphrodite Stylesheet
    //this.animations = StyleSheet.create({});
  }

  componentDidUpdate() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  // APPROACH
  // Render the option SVG display component
  render() {
    return (
      <>
        <rect
          x="0"
          y={
            this.props.optionVerticalOffsetIdeal +
            this.props.optionHeightIdeal +
            this.props.dropdownBarHeight +
            this.props.index * this.props.longestStringHeight
          }
          fill={this.state.fillColor}
          // opacity={
          //   1.0 -
          //   this.props.index / (this.props.optionsListItem.subtitles.length * 2)
          // }
          height={this.props.longestStringHeight}
          width="100%"
          onMouseEnter={() => {
            this.setState({
              mouseEnteredDropdownOption: true,
              fillColor: "white",
            });
          }}
          onMouseLeave={() => {
            this.setState({
              mouseEnteredDropdownOption: false,
              fillColor: this.props.optionFillColor,
            });
          }}
          pointerEvents="fill"
          onClick={() => {
            // if (
            //   this.props.optionsListItem.titleURL +
            //     this.props.optionsListItem.subtitleURLS[this.props.index] ===
            //   "/resume/download"
            // ) {
            //   window.location =
            //     this.props.optionsListItem.titleURL +
            //     this.props.optionsListItem.subtitleURLS[this.props.index];
            // } else {
            //   // this.props.history.push(
            //   //   this.props.optionsListItem.titleURL +
            //   //     this.props.optionsListItem.subtitleURLS[this.props.index]
            //   // );
            // }
          }}
        />
        <text
          key={Math.random()}
          x={this.props.c_optionWidthBufferConstant / 2}
          y={
            this.props.optionVerticalOffsetIdeal +
            this.props.optionHeightIdeal +
            this.props.dropdownBarHeight +
            this.props.index * this.props.longestStringHeight
          }
          fontSize="25"
          fontFamily="Optima"
          fontWeight={
            this.state.mouseEnteredDropdownOption ? "bold" : "regular"
          }
          dominantBaseline="text-before-edge"
          pointerEvents="none"
          fill={this.state.mouseEnteredDropdownOption ? "black" : "white"}
        >
          {this.props.optionsListItem.subtitles[this.props.index]}
        </text>
      </>
    );
  }
}

// Font: Proxima Nova
const ProximaNovaFont = {
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  src:
    "local('ProximaNova'), local('ProximaNova-Regular'), url('src/fonts/ProximaNova/Proxima-Nova-Regular.woff2') format('woff2')",
};

export default DropDownOption;
