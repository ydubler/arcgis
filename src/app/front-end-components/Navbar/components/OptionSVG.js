// React
import React from "react";

// Aphrodite
import { StyleSheet, css } from "aphrodite";

import { withRouter } from "react-router";

import DropDownOption from "./components/DropDownOption";

// App Function Component
class OptionSVG extends React.Component {
  // GENERAL NOTES
  // The this.props.optionsList[i] is modified in this component to contain three more properties:
  // 2) the "compactWidth" property, accessed like this: this.props.optionsList[0].compactWidth
  // 1) the "totalWidthChange" property, accessed like this: this.props.optionsList[1].totalWidthChange
  // 2) the "percentTotalWidth" property, accessed like this: this.props.optionsList[2].percentTotalWidth
  // These properties are all related to scaling the navBar down to it's compact size when resizing the window

  constructor(props) {
    super(props);

    // STATE NOTES
    this.state = {
      mouseEnteredOption: false,
      mouseTriggeredAnimation: false,
      mouseClickedOption: false,

      outlineStrokeWidthWithdrawn: 2,
      outlineStrokeWidthExposed: 4,
      outlineStrokeOpacityWithdrawn: 0.5,
      outlineStrokeOpacityExposed: 0.85,

      textColorWithdrawn: "white",
      textColorExposed: "black",

      dropDownBarTransform: "translate(0 0)",
    };

    // Aphrodite Stylesheet
    this.styles = StyleSheet.create({
      optionWithdrawn: {
        transformOrigin: `${this.props.optionWidth}px ${this.props.optionVerticalOffsetIdeal}px`,
        transform:
          "rotate(" +
          this.props.c_optionRotationAngle +
          "deg) scale(" +
          this.props.c_optionScaleWithdrawn +
          ")",
      },
      optionExposed: {
        transformOrigin: `${this.props.optionWidth}px ${this.props.optionVerticalOffsetIdeal}px`,
        transform: "rotate(0deg) scale(1.0)",
      },
      outlineWithdrawn: {
        stroke: this.props.optionFillColor,
        strokeWidth: this.state.outlineStrokeWidthWithdrawn,
        strokeOpacity: this.state.outlineStrokeOpacityWithdrawn,
      },
      outlineExposed: {
        stroke: this.props.optionFillColor,
        strokeWidth: this.state.outlineStrokeWidthExposed,
        strokeOpacity: this.state.outlineStrokeOpacityExposed,
      },
      lightUpRectWithdrawn: {
        fillOpacity: "0.2",
      },
      lightUpRectExposed: {
        fillOpacity: "1.0",
      },
      expandingStripeWithdrawn: {
        height: this.props.optionHeightIdeal * 0.05,
        fillOpacity: "0.3",
      },
      expandingStripeExposed: {
        height: this.props.optionHeightIdeal * 0.63,
        fillOpacity: "0.7",
      },
      textWithdrawn: {
        fill: "white",
      },
      textExposed: {
        fill: "white",
      },
      dropDownBarWithdrawn: {
        transform: "translateY(0)",
      },
      dropDownBarExposed: {
        transform:
          "translate(0 " +
          (this.props.optionsListItem.subtitles.length *
            this.props.longestStringHeight +
            this.props.dropdownBarHeight) +
          ")",
      },
      dropDownPlaneWithdrawn: {
        height: 0,
      },
      dropDownPlaneExposed: {
        height:
          this.props.optionsListItem.subtitles.length *
            this.props.longestStringHeight -
          this.props.dropdownBarHeight,
      },
    });

    // Aphrodite Stylesheet
    this.animations = StyleSheet.create({
      optionWithdrawnExpose: {
        animationName: {
          from: {
            transform:
              "rotate(" +
              this.props.c_optionRotationAngle +
              "deg) scale(" +
              this.props.c_optionScaleWithdrawn +
              ")",
          },
          to: {
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
            transform: "rotate(0deg) scale(1.0)",
          },
          to: {
            transform:
              "rotate(" +
              this.props.c_optionRotationAngle +
              "deg) scale(" +
              this.props.c_optionScaleWithdrawn +
              ")",
          },
        },
        animationDuration: ".2s",
        animationIterationCount: "once",
        animationTimingFunction: "linear",
      },
      expandingStripeWithdrawnExpose: {
        animationName: {
          from: {
            height: this.props.optionHeightIdeal * 0.05,
            fillOpacity: "0.3",
          },
          to: {
            height: this.props.optionHeightIdeal * 0.6,
            fillOpacity: "0.7",
          },
        },
        animationDuration: ".2s",
        animationIterationCount: "once",
        animationTimingFunction: "linear",
      },
      expandingStripeExposedWithdraw: {
        animationName: {
          from: {
            height: this.props.optionHeightIdeal * 0.6,
            fillOpacity: "0.7",
          },
          to: {
            height: this.props.optionHeightIdeal * 0.05,
            fillOpacity: "0.3",
          },
        },
        animationDuration: ".2s",
        animationIterationCount: "once",
        animationTimingFunction: "linear",
      },
      reflectionCross: {
        animationName: {
          from: {
            transform: "skewX(30deg) translate(0)",
          },
          to: {
            transform:
              "skewX(30deg) translate(" + this.props.optionWidth * 2 + "px)",
          },
        },
        animationDuration: "0.3s",
        animationIterationCount: "2",
        animationTimingFunction: "linear",
        animationDelay: "-0.2s",
      },
      dropDownBarWithdrawnExpose: {
        animationName: {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform:
              "translateY(" +
              (this.props.optionsListItem.subtitles.length *
                this.props.longestStringHeight +
                this.props.dropdownBarHeight) +
              ")",
          },
        },
        animationDuration: "0.1s",
        animationIterationCount: "once",
        animationTimingFunction: "linear",
      },
      dropDownBarExposedWithdraw: {
        animationName: {
          from: {
            transform:
              "translateY(" +
              (this.props.optionsListItem.subtitles.length *
                this.props.longestStringHeight +
                this.props.dropdownBarHeight) +
              ")",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        animationDuration: "0.1s",
        animationIterationCount: "once",
        animationTimingFunction: "linear",
      },
    });
  }

  componentDidUpdate() {}

  componentDidMount() {}

  // APPROACH
  // Render the option SVG display component
  render() {
    return (
      <>
        <svg
          style={{
            display: "inline",
            position: "absolute",
            left: this.props.svgHorizontalShift,
            top: this.props.optionVerticalOffsetIdeal,
            zIndex: this.state.mouseEnteredOption ? 9999 : "auto",
          }}
          width={this.props.optionWidth}
          height={
            this.props.optionVerticalOffsetIdeal +
            this.props.optionHeightIdeal +
            this.props.dropdownBarHeight * 2 +
            this.props.optionsListItem.subtitles.length *
              this.props.longestStringHeight
          }
          onMouseEnter={() => {}}
          onMouseLeave={() => {
            this.setState({
              mouseEnteredOption: false,
              dropDownBarTransform: "translate(0 0)",
            });
          }}
          pointerEvents={this.state.mouseEnteredOption ? "visible" : "none"}
        >
          <g
            // everything should be inside this group component
            // (it does the rotational animation)
            className={
              this.state.mouseEnteredOption
                ? css(
                    this.styles.optionExposed,
                    this.animations.optionWithdrawnExpose
                  )
                : this.state.mouseTriggeredAnimation
                ? css(
                    this.styles.optionWithdrawn,
                    this.animations.optionExposedWidthdraw
                  )
                : css(this.styles.optionWithdrawn)
            }
            onMouseEnter={() => {
              this.setState({
                mouseEnteredOption: true,
                mouseTriggeredAnimation: true,
                dropDownBarTransform:
                  "translate(0 " +
                  (this.props.optionsListItem.subtitles.length *
                    this.props.longestStringHeight +
                    this.props.dropdownBarHeight) +
                  ")",
              });
            }}
          >
            <rect
              // optionRect
              className={
                this.state.mouseEnteredOption
                  ? css(this.styles.outlineExposed)
                  : css(this.styles.outlineWithdrawn)
              }
              x="0"
              y={this.props.optionVerticalOffsetIdeal}
              width="100%"
              height={this.props.optionHeightIdeal}
              fill={this.props.optionFillColor}
              pointerEvents="fill"
              onClick={() => {
                //<Redirect to={"/" + this.props.optionsListItem.title} />;
                // document.location.href = "/" + this.props.optionsListItem.title;
                //this.props.history.push(this.props.optionsListItem.titleURL);
                this.setState({ mouseClickedOption: true });
              }}
            />
            <rect
              // light up rect
              className={
                this.state.mouseEnteredOption
                  ? css(this.styles.lightUpRectExposed)
                  : css(this.styles.lightUpRectWithdrawn)
              }
              x="0"
              y={
                this.props.optionVerticalOffsetIdeal +
                this.props.optionHeightIdeal * 0.1
              }
              width={this.props.optionWidth}
              height={this.props.optionHeightIdeal * 0.1}
              fill="white"
              pointerEvents="none"
            />
            {/* <rect
              // expanding stripe
              className={
                this.state.mouseEnteredOption
                  ? css(
                      this.styles.expandingStripeExposed,
                      this.animations.expandingStripeWithdrawnExpose
                    )
                  : this.state.mouseTriggeredAnimation
                  ? css(
                      this.styles.expandingStripeWithdrawn,
                      this.animations.expandingStripeExposedWidthdraw
                    )
                  : css(this.styles.expandingStripeWithdrawn)
              }
              x="2.5%"
              y={
                this.props.optionVerticalOffsetIdeal +
                this.props.optionHeightIdeal * 0.3
              }
              width="95%"
              fill="white"
            /> */}
            <text
              className={
                this.state.mouseEnteredOption
                  ? css(this.styles.textExposed)
                  : css(this.styles.textWithdrawn)
              }
              x={this.props.optionWidth * 0.5}
              y={
                this.props.optionVerticalOffsetIdeal +
                this.props.optionHeightIdeal * 0.8
              }
              textAnchor="middle"
              fontSize="25"
              fontFamily="Optima"
              pointerEvents="none"
            >
              {this.props.optionsListItem.title}
            </text>
            {this.state.mouseEnteredOption ? (
              <g className={css(this.animations.reflectionCross)}>
                <rect
                  x={-this.props.optionWidth}
                  y={this.props.optionVerticalOffsetIdeal}
                  width={this.props.optionWidth * 0.3}
                  height={this.props.optionHeightIdeal}
                  transform="skewX(30)"
                  fill="white"
                  opacity="0.2"
                />
                <rect
                  x={-this.props.optionWidth}
                  y={this.props.optionVerticalOffsetIdeal}
                  width={this.props.optionWidth * 0.2}
                  height={this.props.optionHeightIdeal}
                  transform="skewX(30)"
                  fill="white"
                  opacity="0.5"
                />
              </g>
            ) : (
              <></>
            )}
            {this.props.optionsListItem.subtitles.length > 0 ? (
              <>
                {this.state.mouseEnteredOption ? (
                  <rect
                    // background plane
                    x="0"
                    y={
                      this.props.optionVerticalOffsetIdeal +
                      this.props.optionHeightIdeal +
                      this.props.dropdownBarHeight
                    }
                    width={this.props.optionWidth}
                    height={
                      this.props.optionsListItem.subtitles.length *
                      this.props.longestStringHeight
                    }
                    fill="white"
                    opacity="1.0"
                  />
                ) : (
                  <></>
                )}
                <rect
                  // dropdown bar top
                  x="0"
                  y={
                    this.props.optionVerticalOffsetIdeal +
                    this.props.optionHeightIdeal
                  }
                  width={this.props.optionWidth}
                  height={this.props.dropdownBarHeight}
                  fill={this.props.optionFillColor}
                  rx={this.props.dropdownBarHeight * 0.5}
                  opacity="1.0"
                  stroke="white"
                />
                <rect
                  // dropdown bar bottom
                  className={
                    this.state.mouseEnteredOption
                      ? css(
                          this.styles.dropDownBarExposed
                          //this.animations.dropDownBarWithdrawnExpose // this animation is no longer neccesary
                        )
                      : this.state.mouseTriggeredAnimation
                      ? css(
                          this.styles.dropDownBarWithdrawn
                          //this.animations.dropDownBarExposedWithdraw // this animation is no longer neccesary
                        )
                      : css(this.styles.dropDownBarWithdrawn)
                  }
                  x="0"
                  y={
                    this.props.optionVerticalOffsetIdeal +
                    this.props.optionHeightIdeal
                  }
                  width={this.props.optionWidth}
                  height={this.props.dropdownBarHeight}
                  fill={this.props.optionFillColor}
                  rx={this.props.dropdownBarHeight * 0.5}
                  opacity="1.0"
                  transform={this.state.dropDownBarTransform}
                  stroke="white"
                />
              </>
            ) : (
              <></>
            )}
            {[...Array(this.props.optionsListItem.subtitles.length).keys()].map(
              (index) =>
                this.state.mouseEnteredOption ? (
                  <g
                    key={Math.random()} // dropdown bar bottom
                  >
                    <DropDownOption
                      c_optionWidthBufferConstant={
                        this.props.c_optionWidthBufferConstant
                      }
                      optionVerticalOffsetIdeal={
                        this.props.optionVerticalOffsetIdeal
                      }
                      optionHeightIdeal={this.props.optionHeightIdeal}
                      dropdownBarHeight={this.props.dropdownBarHeight}
                      longestStringHeight={this.props.longestStringHeight}
                      optionFillColor={this.props.optionFillColor}
                      optionsListItem={this.props.optionsListItem}
                      optionVerticalOffsetIdeal={
                        this.props.optionVerticalOffsetIdeal
                      }
                      index={index}
                    />
                    {/* <text
                      x="2.5%"
                      y={
                        this.props.optionVerticalOffsetIdeal +
                        this.props.optionHeightIdeal +
                        this.props.dropdownBarHeight +
                        index * this.props.longestStringHeight
                      }
                      fontSize="25"
                      fontFamily="Optima"
                      dominantBaseline="text-before-edge"
                    >
                      {this.props.optionsListItem.subtitles[index]}
                    </text> */}
                  </g>
                ) : undefined
            )}
          </g>
        </svg>
      </>
    );
  }
}

// // Font: Proxima Nova
// const ProximaNovaFont = {
//   fontFamily: "Proxima Nova",
//   fontStyle: "normal",
//   fontWeight: "normal",
//   src:
//     "url('/src/fonts/ProximaNova/Proxima-Nova-Regular.woff2') format('woff2')"
//   // "local('ProximaNova'), local('ProximaNova-Regular'), url('src/fonts/ProximaNova/Proxima-Nova-Regular.woff2') format('woff2')"
// };

// // Aphrodite Fonts
// const fonts = StyleSheet.create({
//   proximaNova: {
//     fontFamily: [ProximaNovaFont, "sans-serif"]
//   }
// });

export default OptionSVG;
