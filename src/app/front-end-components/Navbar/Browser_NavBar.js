// React
import React from "react";

// Aphrodite
import { StyleSheet, css } from "aphrodite";

// React Components
import LinearGradient from "./components/LinearGradient";
import OptionSVG from "./components/OptionSVG";
import MinifiedOption from "./components/MinifiedOption";

// App Function Component
export default class Browser_NavBar extends React.Component {
  // GENERAL NOTES
  // The this.props.optionsList[i] is modified in this component to contain one more properties:
  // 1) the "compactWidth" property, accessed like this: this.props.optionsList[0].compactWidth
  constructor(props) {
    super(props);

    // This gets the width of a string -- not yet used
    String.prototype.width = function (font) {
      var f = font || "20px Optima",
        o = $("<div></div>")
          .text(this)
          .css({
            position: "absolute",
            float: "left",
            "white-space": "nowrap",
            visibility: "hidden",
            font: f,
          })
          .appendTo($("body")),
        w = o.width();

      o.remove();

      return w;
    };

    // STATE NOTES
    this.state = {
      _isMounted: false,
      orientation: "landscape",

      colorScheme: navBarColorsRedSchema,

      c_optionFontSizePixelConstant: 25 / 2, // modify
      c_widthPerCharApproxLowerCase: 0,
      c_widthPerCharApproxUpperCase: 0,
      c_optionWidthBufferConstant: 20, // modify
      c_optionRotationAngle: 2, // modify
      c_optionScaleWithdrawn: 0.98, // modify
      c_svgOverlapConstant: 5, // modify
      c_dropDownTextBuffer: 3, // modify (pixels)

      longestStringWidthUpperCase: 0,
      longestStringWidthLowerCase: 0,
      longestStringHeight: 0,

      windowInnerWidth: 0,
      windowExtraWidth: 0,

      screenHeight: 0,

      gradientWidth: 0,
      gradientHeight: 0,

      optionWidthIdeal: 0,
      optionHeightIdeal: 0,
      optionVerticalOffsetIdeal: 0,
      optionHorizontalShiftIdeal: 0,

      optionsTotalWidthIdeal: 0,

      optionsTotalWidthCompact: 0,

      svgHeight: 0,
      svgHorizontalOverlapIdeal: 0,

      dropdownBarHeight: 0,

      // Minified Menu
      minifiedScaleFactor: 1.0,

      minifiedOptionGapWidth: 0,

      minifiedOptionsTotalWidthIdeal: 0,

      minifiedOptionsCurrentWidthCompact: 0,

      minifiedOptionsTotalWidthCompact: 0,
    };

    // Bindings
    this.onResize = this.onResize.bind(this);
    this.onResizeWrapper = this.onResizeWrapper.bind(this);
    this.addCompactPropertiesToOptionsList = this.addCompactPropertiesToOptionsList.bind(
      this
    );
    this.getSVGHorizontalShiftCompact = this.getSVGHorizontalShiftCompact.bind(
      this
    );
    this.getOptionsTotalWidthCompact = this.getOptionsTotalWidthCompact.bind(
      this
    );
    this.determineWidestWidthOfOptionsList = this.determineWidestWidthOfOptionsList.bind(
      this
    );
    this.getSumOfOptionTextDivWidths = this.getSumOfOptionTextDivWidths.bind(
      this
    );
    // this.getMinifiedIdealOptionTextStartX = this.getMinifiedIdealOptionTextStartX.bind(
    //   this
    // );

    // Resize timer to make the window resize after a delay (increases performance)
    this.resizeTimer;

    // Aphrodite Stylesheet
    this.styles = StyleSheet.create({
      optionWithdrawn: {
        transformOrigin: "top right",
        transform:
          "rotate(" +
          this.state.c_optionRotationAngle +
          "deg) scale(" +
          this.state.c_optionScaleWithdrawn +
          ")",
      },
      optionExposed: {
        transformOrigin: "top right",
        transform: "rotate(0deg) scale(1.0)",
      },
    });
  }

  componentDidUpdate() {}

  componentDidMount() {
    const numberOptions = this.props.optionsList.length;

    const longestStringLength = this.props.longestStringLength;

    const longestStringDivLowerCase = document.getElementById(
      "navbarStringDimensionsLowerCase"
    );
    const longestStringHeight = longestStringDivLowerCase.clientHeight;
    const longestStringWidthLowerCase = longestStringDivLowerCase.clientWidth;
    const c_widthPerCharApproxLowerCase =
      longestStringWidthLowerCase / longestStringLength;

    const longestStringDivUpperCase = document.getElementById(
      "navbarStringDimensionsUpperCase"
    );
    const longestStringWidthUpperCase = longestStringDivUpperCase.clientWidth;
    const c_widthPerCharApproxUpperCase =
      longestStringWidthUpperCase / longestStringLength;

    // console.log("WIDTH PER CHARACTER : " + c_widthPerCharApproxUpperCase);

    const windowInnerWidth = window.innerWidth;
    const screenHeight = screen.height;

    const c_optionWidthBufferConstant = this.state.c_optionWidthBufferConstant;
    const c_optionRotationAngle = this.state.c_optionRotationAngle;
    const c_optionScaleWithdrawn = this.state.c_optionScaleWithdrawn;
    const c_svgOverlapConstant = this.state.c_svgOverlapConstant;

    //console.log("longestStringWidth = " + this.props.longestStringWidth);

    const gradientHeight = longestStringHeight * 2;

    const optionWidthIdeal =
      this.determineWidestWidthOfOptionsList() + c_optionWidthBufferConstant;

    //console.log("option width ideal : " + optionWidthIdeal);

    const optionHeightIdeal = longestStringHeight * 2;

    const optionVerticalOffsetIdeal =
      Math.sin((c_optionRotationAngle / 360) * 2 * Math.PI) *
        optionWidthIdeal *
        c_optionScaleWithdrawn +
      1;

    const optionHorizontalShiftIdeal =
      optionWidthIdeal -
      Math.cos((c_optionRotationAngle / 360) * 2 * Math.PI) *
        optionWidthIdeal *
        c_optionScaleWithdrawn;

    const svgHorizontalOverlapIdeal =
      optionHorizontalShiftIdeal + c_svgOverlapConstant;

    const optionsTotalWidthIdeal =
      numberOptions * optionWidthIdeal -
      (numberOptions - 1) * svgHorizontalOverlapIdeal;

    // console.log(
    //   " CDM: optionsTotalWidthIdeal = " +
    //     optionsTotalWidthIdeal +
    //     " , " +
    //     numberOptions +
    //     " , " +
    //     optionWidthIdeal +
    //     " , " +
    //     svgHorizontalOverlapIdeal
    // );

    // Add compact properties to optionsList
    // const optionsTotalWidthCompact = this.addCompactPropertiesToOptionsList(
    //   c_widthPerCharApproxUpperCase,
    //   c_widthPerCharApproxLowerCase
    // );

    const optionsTotalWidthCompact = this.addCompactPropertiesToOptionsList();

    // MINIFIED MENU

    // The gap is the space between Options (including a buffer gap at the beginning of the set and at the end )
    const minifiedOptionGapWidth = document.getElementById(
      "navbarStringWidth_MinifiedGap"
    ).clientWidth;

    // This measurement is using fontSize 25 but it should be returning a value of fontSize 20,
    // so, the scaling factor of 20/25 = 0.8 is being used
    const minifiedOptionsTotalWidthIdeal =
      this.getSumOfOptionTextDivWidths() * 0.8 +
      (this.props.optionsList.length + 1) * minifiedOptionGapWidth;

    // This corresponds with a font size of 15 (the minified menu will be scaling down in font size continuously)
    // The 0.75 scaling factor comes from 15/20 (fontSize ratio)
    const minifiedOptionsTotalWidthCompact =
      minifiedOptionsTotalWidthIdeal * 0.75;

    // Scale factor comes into play when scaling down text
    const minifiedScaleFactor =
      windowInnerWidth >= minifiedOptionsTotalWidthIdeal
        ? 1.0
        : windowInnerWidth >= minifiedOptionsTotalWidthCompact
        ? 1.0 -
          ((minifiedOptionsTotalWidthIdeal - windowInnerWidth) /
            (minifiedOptionsTotalWidthIdeal -
              minifiedOptionsTotalWidthCompact)) *
            (1 - 15 / 20)
        : 0;

    const minifiedOptionsCurrentWidthCompact =
      minifiedOptionsTotalWidthIdeal * minifiedScaleFactor;

    // Window Extra Width (Tends to be the last thing the be computed)
    const windowExtraWidth =
      windowInnerWidth >= optionsTotalWidthIdeal
        ? windowInnerWidth - optionsTotalWidthIdeal
        : windowInnerWidth >= optionsTotalWidthCompact
        ? windowInnerWidth - optionsTotalWidthCompact
        : windowInnerWidth >= minifiedOptionsTotalWidthIdeal
        ? windowInnerWidth - minifiedOptionsTotalWidthIdeal
        : windowInnerWidth >= minifiedOptionsTotalWidthCompact
        ? windowInnerWidth - minifiedOptionsCurrentWidthCompact
        : 0;

    // Dropdown Bar Height
    const dropdownBarHeight = optionHeightIdeal * 0.1;

    // Set state _isMounted to true
    this.setState((prevState) => {
      return {
        _isMounted: true, // is mounted

        longestStringWidthLowerCase: longestStringWidthLowerCase,
        longestStringWidthUpperCase: longestStringWidthUpperCase,
        longestStringHeight: longestStringHeight,

        c_widthPerCharApproxLowerCase: c_widthPerCharApproxLowerCase,
        c_widthPerCharApproxUpperCase: c_widthPerCharApproxUpperCase,

        windowInnerWidth: windowInnerWidth,
        windowExtraWidth: windowExtraWidth,

        screenHeight: screenHeight,

        gradientWidth: windowInnerWidth,
        gradientHeight: gradientHeight,

        optionWidthIdeal: optionWidthIdeal,
        optionHeightIdeal: optionHeightIdeal,
        optionVerticalOffsetIdeal: optionVerticalOffsetIdeal,
        optionHorizontalShiftIdeal: optionHorizontalShiftIdeal,

        svgHorizontalOverlapIdeal: svgHorizontalOverlapIdeal,

        optionsTotalWidthIdeal: optionsTotalWidthIdeal,
        optionsTotalWidthCompact: optionsTotalWidthCompact,

        dropdownBarHeight: dropdownBarHeight,

        // Minified Options
        minifiedScaleFactor: minifiedScaleFactor,

        minifiedOptionGapWidth: minifiedOptionGapWidth,

        minifiedOptionsTotalWidthIdeal: minifiedOptionsTotalWidthIdeal,

        minifiedOptionsTotalWidthCompact: minifiedOptionsTotalWidthCompact,
      };
    });

    // Add a window-resize event listener
    // window.addEventListener("resize", this.onResizeWrapper);   // use this line to use resize timer (might improve performance)
    window.addEventListener("resize", this.onResize); // use this line to not use a resize timer at all

    console.log("Component mounted.");
  }

  // Wraps resize in a timer so that it only fires the resize event periodically (to increase page smoothness)
  onResizeWrapper() {
    const timeAmount = 250;
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.onResize(), timeAmount);
  }

  // This updates the window properties of the state
  onResize() {
    if (this.state._isMounted) {
      // Update the window properties
      this.setState((prevState) => {
        const numberOptions = this.props.optionsList.length;

        const longestStringDivLowerCase = document.getElementById(
          "navbarStringDimensionsLowerCase"
        );
        const longestStringHeight = longestStringDivLowerCase.clientHeight;

        const windowInnerWidth = window.innerWidth;
        const screenHeight = screen.height;

        const c_optionWidthBufferConstant =
          prevState.c_optionWidthBufferConstant;
        const c_optionRotationAngle = prevState.c_optionRotationAngle;
        const c_optionScaleWithdrawn = prevState.c_optionScaleWithdrawn;
        const c_svgOverlapConstant = prevState.c_svgOverlapConstant;

        const gradientHeight = longestStringHeight * 2;

        const optionWidthIdeal =
          this.determineWidestWidthOfOptionsList() +
          c_optionWidthBufferConstant;

        const optionHeightIdeal = longestStringHeight * 2;

        const optionVerticalOffsetIdeal =
          Math.sin((c_optionRotationAngle / 360) * 2 * Math.PI) *
            optionWidthIdeal *
            c_optionScaleWithdrawn +
          1;

        const optionHorizontalShiftIdeal =
          optionWidthIdeal -
          Math.cos((c_optionRotationAngle / 360) * 2 * Math.PI) *
            optionWidthIdeal *
            c_optionScaleWithdrawn;

        const optionsTotalWidthCompact = this.state.optionsTotalWidthCompact;

        // console.log(
        //   "optionHorizontalShiftIdeal = " +
        //     optionWidthIdeal +
        //     " - " +
        //     "Math.cos(" +
        //     c_optionRotationAngle +
        //     ")*" +
        //     optionWidthIdeal +
        //     "*" +
        //     c_optionScaleWithdrawn
        // );

        // console.log(
        //   "Math.cos(" +
        //     this.state.c_optionRotationAngle +
        //     ")=" +
        //     Math.cos(this.state.c_optionRotationAngle)
        // );

        const svgHorizontalOverlapIdeal =
          optionHorizontalShiftIdeal + c_svgOverlapConstant;

        const optionsTotalWidthIdeal =
          numberOptions * optionWidthIdeal -
          (numberOptions - 1) * svgHorizontalOverlapIdeal;

        // MINIFIED MENU

        // This measurement is using fontSize 25 but it should be returning a value of fontSize 20,
        // so, the scaling factor of 20/25 = 0.8 is being used
        const minifiedOptionsTotalWidthIdeal =
          prevState.minifiedOptionsTotalWidthIdeal;

        // This corresponds with a font size of 15 (the minified menu will be scaling down in font size continuously)
        // The 0.75 scaling factor comes from 15/20 (fontSize ratio)
        const minifiedOptionsTotalWidthCompact =
          minifiedOptionsTotalWidthIdeal * 0.75;

        // Scale factor comes into play when scaling down text
        const minifiedScaleFactor =
          windowInnerWidth >= minifiedOptionsTotalWidthIdeal
            ? 1.0
            : windowInnerWidth >= minifiedOptionsTotalWidthCompact
            ? 1.0 -
              ((minifiedOptionsTotalWidthIdeal - windowInnerWidth) /
                (minifiedOptionsTotalWidthIdeal -
                  minifiedOptionsTotalWidthCompact)) *
                (1 - 15 / 20)
            : 0;

        // The gap is the space between Options (including a buffer gap at the beginning of the set and at the end )
        const minifiedOptionGapWidth = document.getElementById(
          "navbarStringWidth_MinifiedGap"
        ).clientWidth;

        const minifiedOptionsCurrentWidthCompact =
          minifiedOptionsTotalWidthIdeal * minifiedScaleFactor;

        // Window Extra Width (Tends to be the last thing the be computed)
        const windowExtraWidth =
          windowInnerWidth >= optionsTotalWidthIdeal
            ? windowInnerWidth - optionsTotalWidthIdeal
            : windowInnerWidth >= optionsTotalWidthCompact
            ? windowInnerWidth - optionsTotalWidthCompact
            : windowInnerWidth >= minifiedOptionsTotalWidthIdeal
            ? windowInnerWidth - minifiedOptionsTotalWidthIdeal
            : windowInnerWidth >= minifiedOptionsTotalWidthCompact
            ? windowInnerWidth - minifiedOptionsCurrentWidthCompact
            : 0;

        const dropdownBarHeight = optionHeightIdeal * 0.1;

        return {
          windowInnerWidth: windowInnerWidth,
          windowExtraWidth: windowExtraWidth,

          screenHeight: screenHeight,

          gradientWidth: windowInnerWidth,
          gradientHeight: gradientHeight,

          optionWidthIdeal: optionWidthIdeal,
          optionHeightIdeal: optionHeightIdeal,
          optionVerticalOffsetIdeal: optionVerticalOffsetIdeal,
          optionHorizontalShiftIdeal: optionHorizontalShiftIdeal,

          svgHorizontalOverlapIdeal: svgHorizontalOverlapIdeal,

          optionsTotalWidthIdeal: optionsTotalWidthIdeal,

          dropdownBarHeight: dropdownBarHeight,

          minifiedScaleFactor: minifiedScaleFactor,

          minifiedOptionGapWidth: minifiedOptionGapWidth,

          minifiedOptionsCurrentWidthCompact: minifiedOptionsCurrentWidthCompact,
        };
      });
    }
  }

  // This evaluates the options in this.props.optionsList to determine
  // 1)the compact navbar width (.compactWidth)
  determineWidestWidthOfOptionsList() {
    const numOptions = this.props.optionsList.length; // iteration boundary

    let curMaxLength = 0;

    // Determine every option's minimum width
    for (let curOption = 0; curOption < numOptions; curOption++) {
      let curTitle = document.getElementById(
        "navBarStringWidth_" + this.props.optionsList[curOption].title
      );

      let curMaxLengthTitle = Math.ceil(curTitle.clientWidth + 1);
      if (curMaxLengthTitle > curMaxLength) {
        curMaxLength = curMaxLengthTitle;
      }

      let numSubtitles = this.props.optionsList[curOption].subtitles.length;

      // Iterate through subtitles to determine the maximum local length
      if (numSubtitles > 0) {
        for (let j = 0; j < numSubtitles; j++) {
          let curSubtitle = document.getElementById(
            "navBarStringWidth_" +
              this.props.optionsList[curOption].title +
              "_" +
              this.props.optionsList[curOption].subtitles[j]
          );

          let curSubtitleLength = Math.ceil(curSubtitle.clientWidth + 1);

          if (curSubtitleLength > curMaxLength) {
            curMaxLength = curSubtitleLength;
          }
        }
      }
    }

    //console.log("widestWidth: " + curMaxLength);

    return curMaxLength;
  }

  // This evaluates the options in this.props.optionsList to determine
  // 1)the compact navbar width (.compactWidth)
  addCompactPropertiesToOptionsList() {
    const numOptions = this.props.optionsList.length; // iteration boundary
    let totalCompactNavbarWidth = 0;

    // Determine every option's minimum width
    for (let curOption = 0; curOption < numOptions; curOption++) {
      let curTitle = document.getElementById(
        "navBarStringWidth_" + this.props.optionsList[curOption].title
      );

      // This property ".minifiedWidthIdeal" is used in the ideal minified menu (to set the width of the option SVG)
      const fontScalar = 20 / 25;
      this.props.optionsList[curOption].minifiedWidthIdeal = Math.ceil(
        curTitle.clientWidth * fontScalar + 1
      );

      let curMaxLength =
        Math.ceil(curTitle.clientWidth + 1) +
        this.state.c_optionWidthBufferConstant;
      let numSubtitles = this.props.optionsList[curOption].subtitles.length;
      let longestString = this.props.optionsList[curOption].title;
      let isTitle = true;

      // Iterate through subtitles to determine the maximum local length
      if (numSubtitles > 0) {
        for (let j = 0; j < numSubtitles; j++) {
          let curSubtitle = document.getElementById(
            "navBarStringWidth_" +
              this.props.optionsList[curOption].title +
              "_" +
              this.props.optionsList[curOption].subtitles[j]
          );
          let curSubtitleLength =
            Math.ceil(curSubtitle.clientWidth) +
            this.state.c_optionWidthBufferConstant;

          if (curSubtitleLength > curMaxLength) {
            isTitle = false;
            curMaxLength = curSubtitleLength;
            longestString = this.props.optionsList[curOption].subtitles[j];
          }
        }
      }

      // Determine the compact width of the current option
      const optionCompactWidth = curMaxLength;

      // Add the "compactWidth" property to the optionsList
      this.props.optionsList[curOption].compactWidth = optionCompactWidth;

      // Increment the total width of the compact navbar
      totalCompactNavbarWidth = this.getOptionsTotalWidthCompact(
        this.props.optionsList.length
      );

      // Log
      // console.log(
      //   this.props.optionsList[curOption].title +
      //     " has compact width of " +
      //     optionCompactWidth +
      //     " as a result of string " +
      //     longestString +
      //     (isTitle ? " isUpperCase! " : " isLowerCase! ")
      // );
    }

    // console.log(
    //   "Options have a total compact width of: " + totalCompactNavbarWidth
    // );

    return totalCompactNavbarWidth;
  }

  addMinifiedCompactPropertiesToOptionsList() {
    const numOptions = this.props.optionsList.length; // iteration boundary
    let totalCompactNavbarWidth = 0;

    // Determine every option's minimum width
    for (let curOption = 0; curOption < numOptions; curOption++) {
      let curTitle = document.getElementById(
        "navBarStringWidth_" + this.props.optionsList[curOption].title
      );

      let curMaxLength =
        Math.ceil(curTitle.clientWidth + 1) +
        this.state.c_optionWidthBufferConstant;
      let numSubtitles = this.props.optionsList[curOption].subtitles.length;
      let longestString = this.props.optionsList[curOption].title;
      let isTitle = true;

      // Iterate through subtitles to determine the maximum local length
      if (numSubtitles > 0) {
        for (let j = 0; j < numSubtitles; j++) {
          let curSubtitle = document.getElementById(
            "navBarStringWidth_" +
              this.props.optionsList[curOption].title +
              "_" +
              this.props.optionsList[curOption].subtitles[j]
          );
          let curSubtitleLength =
            Math.ceil(curSubtitle.clientWidth) +
            this.state.c_optionWidthBufferConstant;

          if (curSubtitleLength > curMaxLength) {
            isTitle = false;
            curMaxLength = curSubtitleLength;
            longestString = this.props.optionsList[curOption].subtitles[j];
          }
        }
      }

      // Determine the compact width of the current option
      const optionCompactWidth = curMaxLength;

      // Add the "compactWidth" property to the optionsList
      this.props.optionsList[curOption].compactWidth = optionCompactWidth;

      // Increment the total width of the compact navbar
      totalCompactNavbarWidth = this.getOptionsTotalWidthCompact(
        this.props.optionsList.length
      );

      // Log
      // console.log(
      //   this.props.optionsList[curOption].title +
      //     " has compact width of " +
      //     optionCompactWidth +
      //     " as a result of string " +
      //     longestString +
      //     (isTitle ? " isUpperCase! " : " isLowerCase! ")
      // );
    }

    // console.log(
    //   "Options have a total compact width of: " + totalCompactNavbarWidth
    // );

    return totalCompactNavbarWidth;
  }

  // This gets the sum of the widths up to the index Option
  getSumOfWidthsCompact(index) {
    // Get sum of previous compact widths and their SVG shifts
    let sumOfPreviousOptionWidthsCompact = 0;
    for (let i = 0; i < index; i++) {
      sumOfPreviousOptionWidthsCompact += this.props.optionsList[i]
        .compactWidth;
    }

    return sumOfPreviousOptionWidthsCompact;
  }

  // This gets the sum of all of the horizontal shifts made by all SVGs up to and including the index Option
  getSumOfHorizontalShiftsCompact(index) {
    // Get total overlap offset
    let sumOfPreviousSVGHorizontalShifts = 0;
    for (let i = 1; i <= index; i++) {
      const optionHorizontalShiftCompact =
        this.props.optionsList[i].compactWidth -
        Math.cos((this.state.c_optionRotationAngle / 360) * 2 * Math.PI) *
          this.props.optionsList[i].compactWidth *
          this.state.c_optionScaleWithdrawn;

      const svgHorizontalOverlapCompact =
        optionHorizontalShiftCompact + this.state.c_svgOverlapConstant;

      sumOfPreviousSVGHorizontalShifts += svgHorizontalOverlapCompact;
    }

    return sumOfPreviousSVGHorizontalShifts;
  }

  // This gets the total compact width of all of the options, including their overlap
  getOptionsTotalWidthCompact(indexIn) {
    // Get sum of previous compact widths and their SVG shifts
    let sumOfPreviousOptionWidthsCompact = this.getSumOfWidthsCompact(indexIn);

    // Get total overlap offset
    let sumOfPreviousSVGHorizontalShifts = this.getSumOfHorizontalShiftsCompact(
      indexIn - 1
    );

    const svgHorizontalShift =
      sumOfPreviousOptionWidthsCompact - sumOfPreviousSVGHorizontalShifts;

    return svgHorizontalShift;
  }

  // This is used in the OptionSVG when the menu is compacted
  getSVGHorizontalShiftCompact(index) {
    // Get sum of previous compact widths and their SVG shifts
    let sumOfPreviousOptionWidthsCompact = this.getSumOfWidthsCompact(index);

    // Get total overlap offset
    let sumOfPreviousSVGHorizontalShifts = this.getSumOfHorizontalShiftsCompact(
      index
    );

    const svgHorizontalShift =
      this.state.windowExtraWidth / 2 +
      sumOfPreviousOptionWidthsCompact -
      sumOfPreviousSVGHorizontalShifts;

    return svgHorizontalShift;
  }

  // This evaluates the options in this.props.optionsList to determine
  // 1)the compact navbar width (.compactWidth)
  getSumOfOptionTextDivWidths() {
    const numOptions = this.props.optionsList.length; // iteration boundary

    let sumOfWidths = 0;

    // Determine every option's minimum width
    for (let curOption = 0; curOption < numOptions; curOption++) {
      let curTitle = document.getElementById(
        "navBarStringWidth_" + this.props.optionsList[curOption].title
      );

      sumOfWidths += Math.ceil(curTitle.clientWidth + 1);
    }

    return sumOfWidths;
  }

  getMinifiedIdealOptionTextStartX(index) {
    let gapWidth = this.state.minifiedOptionGapWidth;
    let fontScalar = 20 / 25;

    let startX = (index + 1) * gapWidth;

    // Determine every option's minimum width
    for (let curOption = 0; curOption < index; curOption++) {
      let curTitle = document.getElementById(
        "navBarStringWidth_" + this.props.optionsList[curOption].title
      );

      startX += Math.ceil(curTitle.clientWidth * fontScalar + 1);
    }

    return startX * this.state.minifiedScaleFactor;
  }

  getMinifiedScaledOptionTextStartX(index, fontSize) {
    let gapWidth = this.state.minifiedOptionGapWidth;
    let fontScalar = fontSize / 20;

    let startX = (index + 1) * gapWidth;

    // Determine every option's minimum width
    for (let curOption = 0; curOption < index; curOption++) {
      let curTitle = document.getElementById(
        "navBarStringWidth_" + this.props.optionsList[curOption].title
      );

      startX += Math.ceil(
        curTitle.clientWidth * fontScalar * this.state.minifiedScaleFactor + 1
      );
    }

    return startX;
  }

  // APPROACH
  // Render browser navbar
  render() {
    return (
      <>
        {this.props.optionsList.map((option) => (
          <div key={Math.random()}>
            <div
              key={Math.random()}
              id={"navBarStringWidth_" + option.title}
              style={{
                position: "absolute",
                visibility: "hidden",
                height: "auto",
                width: "auto",
                whiteSpace: "nowrap",
                fontSize: 25,
                fontFamily: "Optima",
              }}
            >
              {option.title}
            </div>
            {option.subtitles.map((subtitle) => (
              <div
                key={Math.random()}
                id={"navBarStringWidth_" + option.title + "_" + subtitle}
                style={{
                  position: "absolute",
                  visibility: "hidden",
                  height: "auto",
                  width: "auto",
                  whiteSpace: "nowrap",
                  fontSize: 25,
                  fontFamily: "Optima",
                }}
              >
                {subtitle}
              </div>
            ))}
          </div>
        ))}
        <div
          id="navbarStringWidth_MinifiedGap"
          style={{
            position: "absolute",
            visibility: "hidden",
            height: "auto",
            width: "auto",
            whiteSpace: "nowrap",
            fontSize: 25,
            fontFamily: "Optima",
          }}
        >
          ____
        </div>
        <div
          id="navbarStringDimensionsLowerCase"
          style={{
            position: "absolute",
            visibility: "hidden",
            height: "auto",
            width: "auto",
            whiteSpace: "nowrap",
            fontSize: 25,
            fontFamily: "Optima",
          }}
        >
          {this.props.longestString}
        </div>
        <div
          id="navbarStringDimensionsUpperCase"
          style={{
            position: "absolute",
            visibility: "hidden",
            height: "auto",
            width: "auto",
            whiteSpace: "nowrap",
            fontSize: 25,
            fontFamily: "Optima",
          }}
        >
          {this.props.longestString.toUpperCase()}
        </div>
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            //pointerEvents: "none"
          }}
        >
          <svg x="0" y="0" width="100%" height={this.state.gradientHeight}>
            {/* The Linear Gradient Option is broken because a state change in a parent component only propagates to it's first children? */}
            {/* <LinearGradient
              gradientHeight={this.state.gradientHeight}
              navBarColorsBlueSchema={this.state.colorScheme}
              svgHorizontalOverlapIdeal={this.state.svgHorizontalOverlapIdeal}
              optionsListLength={this.props.optionsList.length}
              windowInnerWidth={this.state.windowInnerWidth}
              windowExtraWidth={this.state.windowExtraWidth}
              optionWidthIdeal={this.state.optionWidthIdeal}
            /> */}

            {/* LINEAR GRADIENT */}
            {/* We have to initialize the gradient after the component has been mounted */}
            {this.state._isMounted ? (
              this.state.windowInnerWidth >=
              this.state.optionsTotalWidthIdeal ? (
                // LINEAR GRADIENT FOR IDEAL MENU
                <>
                  <defs>
                    <linearGradient id="navbarGradient">
                      <stop
                        key={Math.random()}
                        offset="0%"
                        stopColor={this.state.colorScheme[0]}
                      />

                      {/* <stop
                      key={Math.random()}
                      offset={
                        ((this.state.windowExtraWidth / 2 +
                          this.state.optionWidthIdeal / 4) /
                          this.state.windowInnerWidth) *
                          100 +
                        "%"
                      }
                      stopColor={this.state.colorScheme[1]}
                    /> */}

                      {[...Array(this.props.optionsList.length).keys()].map(
                        (index) => (
                          <stop
                            key={Math.random()}
                            offset={
                              ((this.state.windowExtraWidth / 2 +
                                (index + 0.5) * this.state.optionWidthIdeal -
                                index * this.state.svgHorizontalOverlapIdeal) /
                                this.state.windowInnerWidth) *
                                100 +
                              "%"
                            }
                            stopColor={this.state.colorScheme[index + 2]}
                          />
                        )
                      )}

                      {/* <stop
                      key={Math.random()}
                      offset={
                        this.state.windowInnerWidth -
                        this.state.windowExtraWidth / 2 -
                        this.state.optionWidthIdeal / 4
                      }
                      stopColor={this.state.colorScheme[15]}
                    /> */}

                      <stop
                        key={Math.random()}
                        offset="100%"
                        stopColor={
                          this.state.colorScheme[
                            this.props.optionsList.length + 3
                          ]
                        }
                      />
                    </linearGradient>
                  </defs>

                  {/* This rect renders the gradient */}
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height={this.state.gradientHeight}
                    fill="url(#navbarGradient)"
                  />
                </>
              ) : this.state.windowInnerWidth >=
                this.state.optionsTotalWidthCompact ? (
                // LINEAR GRADIENT FOR COMPACTED MENU
                <>
                  <defs>
                    <linearGradient id="navbarGradient">
                      <stop
                        key={Math.random()}
                        offset="0%"
                        stopColor={this.state.colorScheme[0]}
                      />

                      {/* <stop
                      key={Math.random()}
                      offset={
                        ((this.state.windowExtraWidth / 2 +
                          this.state.optionWidthIdeal / 4) /
                          this.state.windowInnerWidth) *
                          100 +
                        "%"
                      }
                      stopColor={this.state.colorScheme[1]}
                    /> */}

                      {[...Array(this.props.optionsList.length).keys()].map(
                        (index) => (
                          <stop
                            key={Math.random()}
                            offset={
                              ((this.getSVGHorizontalShiftCompact(index) +
                                this.props.optionsList[index].compactWidth /
                                  2) /
                                this.state.windowInnerWidth) *
                                100 +
                              "%"
                            }
                            stopColor={this.state.colorScheme[index + 2]}
                          />
                        )
                      )}

                      {/* <stop
                      key={Math.random()}
                      offset={
                        this.state.windowInnerWidth -
                        this.state.windowExtraWidth / 2 -
                        this.state.optionWidthIdeal / 4
                      }
                      stopColor={this.state.colorScheme[15]}
                    /> */}

                      <stop
                        key={Math.random()}
                        offset="100%"
                        stopColor={
                          this.state.colorScheme[
                            this.props.optionsList.length + 3
                          ]
                        }
                      />
                    </linearGradient>
                  </defs>

                  {/* This rect renders the gradient */}
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height={this.state.gradientHeight}
                    fill="url(#navbarGradient)"
                  />
                </>
              ) : (
                // LINEAR GRADIENT FOR COMPACT SCALED MENU
                <>
                  <defs>
                    <linearGradient id="navbarGradient">
                      <stop
                        key={Math.random()}
                        offset="0%"
                        stopColor={this.state.colorScheme[0]}
                      />

                      {/* <stop
                      key={Math.random()}
                      offset={
                        ((this.state.windowExtraWidth / 2 +
                          this.state.optionWidthIdeal / 4) /
                          this.state.windowInnerWidth) *
                          100 +
                        "%"
                      }
                      stopColor={this.state.colorScheme[1]}
                    /> */}

                      {[...Array(this.props.optionsList.length).keys()].map(
                        (index) => (
                          <stop
                            key={Math.random()}
                            offset={
                              ((this.getSVGHorizontalShiftCompact(index) +
                                this.props.optionsList[index].compactWidth /
                                  2) /
                                this.state.windowInnerWidth) *
                                100 +
                              "%"
                            }
                            stopColor={this.state.colorScheme[index + 2]}
                          />
                        )
                      )}

                      {/* <stop
                      key={Math.random()}
                      offset={
                        this.state.windowInnerWidth -
                        this.state.windowExtraWidth / 2 -
                        this.state.optionWidthIdeal / 4
                      }
                      stopColor={this.state.colorScheme[15]}
                    /> */}

                      <stop
                        key={Math.random()}
                        offset="100%"
                        stopColor={
                          this.state.colorScheme[
                            this.props.optionsList.length + 3
                          ]
                        }
                      />
                    </linearGradient>
                  </defs>

                  {/* This rect renders the gradient */}
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height={this.state.gradientHeight}
                    fill="url(#navbarGradient)"
                  />
                </>
              )
            ) : // object is not mounted (don't render anything!)
            undefined}

            {/* DEBUG LINES -- THIS SHOWS THE POSITIONS OF THE GRADIENT COLOR POINTS ON COMPACTED MENU */}
            {/* {[...Array(this.props.optionsList.length).keys()].map(index => (
              <line
                key={Math.random()}
                x1={
                  this.getSVGHorizontalShiftCompact(index) +
                  this.props.optionsList[index].compactWidth / 2
                }
                y1="0"
                x2={
                  this.getSVGHorizontalShiftCompact(index) +
                  this.props.optionsList[index].compactWidth / 2
                }
                y2="50"
                stroke="white"
                strokeWidth="5"
              />
            ))} */}

            {/* DEBUG LINES -- THIS SHOWS THE POSITIONS OF THE GRADIENT COLOR POINTS ON IDEAL MENU */}
            {/* <g>
              <line
                key={Math.random()}
                x1="1%"
                y1="0"
                x2="1%"
                y2="50"
                stroke="white"
                strokeWidth="5"
              />
              <line
                key={Math.random()}
                x1={
                  this.state.windowExtraWidth / 2 +
                  this.state.optionWidthIdeal / 4
                }
                y1="0"
                x2={
                  this.state.windowExtraWidth / 2 +
                  this.state.optionWidthIdeal / 4
                }
                y2="50"
                stroke="white"
                strokeWidth="5"
              />
              {[...Array(this.props.optionsList.length).keys()].map(index => (
                <line
                  key={Math.random()}
                  x1={
                    this.state.windowExtraWidth / 2 +
                    (index + 0.5) * this.state.optionWidthIdeal -
                    index * this.state.svgHorizontalOverlapIdeal
                  }
                  y1="0"
                  x2={
                    this.state.windowExtraWidth / 2 +
                    (index + 0.5) * this.state.optionWidthIdeal -
                    index * this.state.svgHorizontalOverlapIdeal
                  }
                  y2="50"
                  stroke="white"
                  strokeWidth="5"
                />
              ))}
              <line
                key={Math.random()}
                x1={
                  this.state.windowInnerWidth -
                  this.state.windowExtraWidth / 2 -
                  this.state.optionWidthIdeal / 4
                }
                y1="0"
                x2={
                  this.state.windowInnerWidth -
                  this.state.windowExtraWidth / 2 -
                  this.state.optionWidthIdeal / 4
                }
                y2="50"
                stroke="white"
                strokeWidth="5"
              />
              <line
                key={Math.random()}
                x1="99%"
                y1="0"
                x2="99%"
                y2="50"
                stroke="white"
                strokeWidth="5"
              />
            </g> */}
          </svg>
          {/* OPTIONS LIST */}
          {this.state.windowInnerWidth >= this.state.optionsTotalWidthIdeal ? (
            [...Array(this.props.optionsList.length).keys()].map((index) => (
              // IDEAL OPTIONS
              <OptionSVG
                key={Math.random()}
                index={index}
                c_optionRotationAngle={this.state.c_optionRotationAngle}
                c_optionScaleWithdrawn={this.state.c_optionScaleWithdrawn}
                c_optionWidthBufferConstant={
                  this.state.c_optionWidthBufferConstant
                }
                longestStringHeight={this.state.longestStringHeight}
                windowExtraWidth={this.state.windowExtraWidth}
                gradientHeight={this.state.gradientHeight}
                svgHorizontalShift={
                  this.state.windowExtraWidth / 2 +
                  index * this.state.optionWidthIdeal -
                  index * this.state.svgHorizontalOverlapIdeal
                }
                optionWidth={this.state.optionWidthIdeal}
                optionWidthIdeal={this.state.optionWidthIdeal}
                optionHeightIdeal={this.state.optionHeightIdeal}
                optionVerticalOffsetIdeal={this.state.optionVerticalOffsetIdeal}
                optionFillColor={this.state.colorScheme[index + 2]}
                dropdownBarHeight={this.state.dropdownBarHeight}
                optionsListItem={this.props.optionsList[index]}
              />
            ))
          ) : this.state.windowInnerWidth >=
            this.state.optionsTotalWidthCompact ? (
            [...Array(this.props.optionsList.length).keys()].map((index) => {
              // COMPACT OPTIONS
              // console.log(
              //   "optionWidth=" + this.props.optionsList[index].compactWidth
              // );
              return (
                <OptionSVG
                  key={Math.random()}
                  index={index}
                  c_optionRotationAngle={this.state.c_optionRotationAngle}
                  c_optionScaleWithdrawn={this.state.c_optionScaleWithdrawn}
                  c_optionWidthBufferConstant={
                    this.state.c_optionWidthBufferConstant
                  }
                  longestStringHeight={this.state.longestStringHeight}
                  windowExtraWidth={this.state.windowExtraWidth}
                  gradientHeight={this.state.gradientHeight}
                  svgHorizontalShift={this.getSVGHorizontalShiftCompact(index)}
                  optionWidth={this.props.optionsList[index].compactWidth}
                  optionWidthIdeal={this.state.optionWidthIdeal}
                  optionHeightIdeal={this.state.optionHeightIdeal}
                  optionVerticalOffsetIdeal={
                    this.state.optionVerticalOffsetIdeal
                  }
                  optionFillColor={this.state.colorScheme[index + 2]}
                  dropdownBarHeight={this.state.dropdownBarHeight}
                  optionsListItem={this.props.optionsList[index]}
                  fontFamily={fonts.proximaNova}
                />
              );
            })
          ) : this.state.windowInnerWidth >=
            this.state.minifiedOptionsTotalWidthIdeal ? (
            [...Array(this.props.optionsList.length).keys()].map((index) => {
              // MINIFIED OPTION IDEAL
              return (
                <MinifiedOption
                  key={Math.random()}
                  index={index}
                  windowExtraWidth={this.state.windowExtraWidth}
                  minifiedIdealOptionTextStartX={this.getMinifiedIdealOptionTextStartX(
                    index
                  )}
                  minifiedScaleFactor={this.state.minifiedScaleFactor}
                  optionsList={this.props.optionsList}
                  gradientHeight={this.state.gradientHeight}
                />
              );
            })
          ) : this.state.windowInnerWidth >=
            this.state.minifiedOptionsTotalWidthCompact ? (
            [...Array(this.props.optionsList.length).keys()].map((index) => {
              // MINIFIED OPTION SCALING
              return (
                <MinifiedOption
                  key={Math.random()}
                  index={index}
                  windowExtraWidth={this.state.windowExtraWidth}
                  minifiedIdealOptionTextStartX={this.getMinifiedIdealOptionTextStartX(
                    index
                  )}
                  minifiedScaleFactor={this.state.minifiedScaleFactor}
                  optionsList={this.props.optionsList}
                  gradientHeight={this.state.gradientHeight}
                />
              );
            })
          ) : (
            // Iconic Option
            <svg
              key={Math.random()}
              style={{
                display: "inline",
                position: "absolute",
                left: this.state.gradientHeight * 0.1,
                top: this.state.gradientHeight * 0.1,
              }}
              width={this.state.gradientHeight * 0.8}
              height={this.state.gradientHeight * 0.8}
              x="0"
              y="0"
            >
              <rect width="100%" height="100%" fill="white" />
              <rect
                width="90%"
                height="90%"
                fill="white"
                x="5%"
                y="5%"
                fill={this.state.colorScheme[0]}
              />
              <line
                x1="20%"
                y1="25%"
                x2="80%"
                y2="25%"
                strokeWidth="5"
                stroke="white"
              />
              <line
                x1="20%"
                y1="50%"
                x2="80%"
                y2="50%"
                strokeWidth="5"
                stroke="white"
              />
              <line
                x1="20%"
                y1="75%"
                x2="80%"
                y2="75%"
                strokeWidth="5"
                stroke="white"
              />
            </svg>
          )}
          <svg width="100%" height="100px" x="0" y="0">
            <line
              key={Math.random()}
              x1="0"
              y1="50"
              x2={this.state.optionsTotalWidthCompact}
              y2="50"
              stroke="red"
              strokeWidth="5"
            />
            <line
              key={Math.random()}
              x1="0"
              y1="60"
              x2={this.state.minifiedOptionsTotalWidthIdeal}
              y2="60"
              stroke="orange"
              strokeWidth="5"
            />
            <line
              key={Math.random()}
              x1="0"
              y1="70"
              x2={this.state.minifiedOptionsTotalWidthCompact}
              y2="70"
              stroke="yellow"
              strokeWidth="5"
            />
            <text x={this.state.optionsTotalWidthCompact + 10} y="55">
              Navbar Transition (Compact to Minified)
            </text>
            <text x={this.state.minifiedOptionsTotalWidthIdeal + 10} y="67">
              Minified Navbar Scaling Begin
            </text>
            <text x={this.state.minifiedOptionsTotalWidthCompact + 10} y="75">
              Minified Navbar Scaling End
            </text>
          </svg>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ textAlign: "left", maxWidth: "800px" }}>
          <h1>RESPONSIVE ANIMATED SVG NAVBAR</h1>
          <h4 style={{ color: "red", textDecoration: "underline" }}>
            DESKTOP BROWSER ONLY
          </h4>
          <h4 style={{ color: "red", textDecoration: "underline" }}>
            Be sure to change the screen width to see how the Navbar changes!
          </h4>
          In addition to a detailed gradient-based color scheme, this Navbar
          features a smooth animated SVG interface and precision placement of
          suboptions. In addition, the appearance of the entire Navbar can be
          modified using the control variables below.
          <h3> NAVBAR CONTROL VARIABLES</h3>
          Changing these will modify the appearance of the Navbar:
          <br />
          <br />
          <button
            onClick={() => {
              this.setState((prevState) => {
                let newColors = null;
                if (prevState.colorScheme === navBarColorsBlueSchema) {
                  newColors = navBarColorsRedSchema;
                } else {
                  newColors = navBarColorsBlueSchema;
                }
                return { colorScheme: newColors };
              });
            }}
          >
            Change Color Theme
          </button>
          <br />
          <br />
          <div>
            <input
              onChange={() => {
                let value = document.getElementById("optionWidthBuffer").value;
                this.setState({
                  c_optionWidthBufferConstant: Number.parseInt(value),
                });
                this.onResize();
              }}
              id="optionWidthBuffer"
              defaultValue={this.state.c_optionWidthBufferConstant}
              type="range"
              min="0"
              max="100"
            />
            Width Text Buffer (px): {this.state.c_optionWidthBufferConstant}
          </div>
          <div>
            <input
              onChange={() => {
                let value = document.getElementById("optionOverlap").value;
                this.setState({
                  c_svgOverlapConstant: Number.parseInt(value),
                });
                this.onResize();
              }}
              id="optionOverlap"
              type="range"
              min="-100"
              max="100"
            />
            Overlap Amount (px): {this.state.c_svgOverlapConstant}
          </div>
          <div>
            <input
              onChange={() => {
                let value = document.getElementById("optionScale").value / 100;
                this.setState({
                  c_optionScaleWithdrawn: Number.parseFloat(value),
                });
                this.onResize();
              }}
              defaultValue={this.state.c_optionScaleWithdrawn * 100}
              id="optionScale"
              type="range"
              min="1"
              max="100"
            />
            Scale when Withdrawn: {this.state.c_optionScaleWithdrawn}
          </div>
          <div>
            <input
              onChange={() => {
                let value = document.getElementById("optionRotation").value;
                this.setState({
                  c_optionRotationAngle: Number.parseFloat(value),
                });
                this.onResize();
              }}
              defaultValue={this.state.c_optionRotationAngle}
              id="optionRotation"
              type="range"
              min="-10"
              max="100"
            />
            Rotation: {this.state.c_optionRotationAngle}
          </div>
          <br />
          NOTE: The Navbar is intended to function properly within a certain
          range of values close to the presupplied values. Large changes to
          these values can disrupt the appearance of the Navbar (and make it
          appear buggy).
        </div>
      </>
    );
  }
}

// Aphrodite Stylesheet
const animations = StyleSheet.create({
  optionWithdrawnExpose: {
    animationName: {
      from: {
        transformOrigin: "top right",
        transform: "rotate(5deg) scale(0.8)",
      },
      to: {
        transformOrigin: "top right",
        transform: "rotate(0deg) scale(1.0)",
      },
    },
    animationDuration: "0.1s",
    animationIterationCount: "once",
    animationTimingFunction: "linear",
  },
  optionExposedWidthdraw: {
    animationName: {
      from: {
        transformOrigin: "top right",
        transform: "rotate(0deg) scale(1.0)",
      },
      to: {
        transformOrigin: "top right",
        transform: "rotate(5deg) scale(0.8)",
      },
    },
    animationDuration: "0.1s",
    animationIterationCount: "once",
    animationTimingFunction: "linear",
  },
  optionRotateIn: {
    animationName: {
      from: {
        transform: "rotate(5deg) scale(0.8) skew(5deg,0deg) translate(0px,0px)",
        fill: "lightblue",
        height: 75,
        transformOrigin: "bottom right",
      },
      to: {
        transform:
          "rotate(0deg) scale(1.0) skew(0deg,0deg) translate(50px,50px)",
        fill: "blue",
        height: 150,
        transformOrigin: "bottom right",
      },
    },
    animationDuration: "0.1s",
    animationIterationCount: "once",
    animationTimingFunction: "linear",
  },
  optionRotateOut: {
    animationName: {
      from: {
        transform:
          "rotate(0deg) scale(1.0) skew(0deg,0deg) translate(50px,50px)",
        fill: "orange",
        height: 150,
      },
      to: {
        transform: "rotate(5deg) scale(0.8) skew(5deg,0deg) translate(0px,0px)",
        fill: "yellow",
        height: 75,
      },
    },
    animationDuration: "0.1s",
    animationIterationCount: "once",
    animationTimingFunction: "linear",
  },
  rectIncreaseWidth: {
    animationName: {
      from: {
        width: "10%",
      },
      to: {
        width: "40%",
      },
    },
    animationDuration: "0.1s",
    animationIterationCount: "once",
    animationTimingFunction: "linear",
  },
  rectDecreaseWidth: {
    animationName: {
      from: {
        width: "40%",
      },
      to: {
        width: "10%",
      },
    },
    animationDuration: "0.1s",
    animationIterationCount: "once",
    animationTimingFunction: "linear",
  },
});

const navBarColors = {
  0: {
    red: 255,
    green: 54,
    blue: 105,
  },
  1: {
    red: 255,
    green: 54,
    blue: 72,
  },
  2: {
    red: 255,
    green: 70,
    blue: 54,
  },
  3: {
    red: 255,
    green: 104,
    blue: 54,
  },
  4: {
    red: 255,
    green: 138,
    blue: 54,
  },
  5: {
    red: 255,
    green: 173,
    blue: 54,
  },
  6: {
    red: 255,
    green: 206,
    blue: 54,
  },
  7: {
    red: 255,
    green: 239,
    blue: 54,
  },
  8: {
    red: 202,
    green: 255,
    blue: 54,
  },
};

const navBarColorsBlueSchema = {
  0: "rgb(54, 255, 195)",
  1: "rgb(54, 255, 229)",
  2: "rgb(54, 246, 255)",
  3: "rgb(54, 213, 255)",
  4: "rgb(54, 179, 255)",
  5: "rgb(54, 145, 255)",
  6: "rgb(54, 111, 255)",
  7: "rgb(54, 77, 255)",
  8: "rgb(65, 54, 255)",
  9: "rgb(99, 54, 255)",
  10: "rgb(133, 54, 255)",
  11: "rgb(166, 54, 255)",
  12: "rgb(200, 54, 255)",
  13: "rgb(233, 54, 255)",
  14: "rgb(255, 54, 242)",
  15: "rgb(255, 54, 209)",
  16: "rgb(255, 54, 175)",
  17: "rgb(255, 54, 141)",
  18: "rgb(255, 54, 107)",
};

const navBarColorsRedSchema = {
  0: "rgb(255, 54, 137)",
  1: "rgb(255, 54, 103)",
  2: "rgb(255, 54, 69)",
  3: "rgb(255, 72, 54)",
  4: "rgb(255, 106, 54)",
  5: "rgb(255, 140, 54)",
  6: "rgb(255, 174, 54)",
  7: "rgb(255, 208, 54)",
  8: "rgb(255, 242, 84)",
  9: "rgb(233, 255, 54)",
  10: "rgb(199, 255, 54)",
  11: "rgb(166, 255, 54)",
  12: "rgb(133, 255, 54)",
  13: "rgb(100, 255, 54)",
  14: "rgb(65, 255, 54)",
  15: "rgb(54, 255, 76)",
  16: "rgb(54, 255, 110)",
  17: "rgb(54, 255, 144)",
  18: "rgb(54, 254, 178)",
};

// Font: Proxima Nova
const ProximaNovaRegularFont = {
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  src:
    "local('ProximaNova'), local('Proxima-Nova-Regular'), url('src/fonts/ProximaNova/Proxima-Nova-Regular.woff2') format('woff2')",
};

const OpenSansRegularFont = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "normal",
  src:
    "local('OpenSans'), local('OpenSans-Regular'), url('src/fonts/open-sans/OpenSans-Regular.ttf') format('ttf')",
};

// Aphrodite Fonts
const fonts = StyleSheet.create({
  proximaNova: {
    fontFamily: [ProximaNovaRegularFont, "sans-serif"],
  },
  openSans: {
    fontFamily: [OpenSansRegularFont, "sans-serif"],
  },
});
