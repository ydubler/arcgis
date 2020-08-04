// React
import React from "react";

// Aphrodite
import { StyleSheet, css } from "aphrodite";

// App Function Component
export default class MinifiedOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseEnteredOption: false,
      mouseTriggeredAnimation: false,
    };
  }

  render() {
    return (
      <>
        <svg
          style={{
            display: "inline",
            position: "absolute",
            left:
              this.props.windowExtraWidth / 2 +
              this.props.minifiedIdealOptionTextStartX,
          }}
          width={
            this.props.optionsList[this.props.index].minifiedWidthIdeal *
            this.props.minifiedScaleFactor
          }
          height={this.props.gradientHeight}
          x="0"
          y="0"
          onMouseEnter={() => {
            this.setState({ mouseEnteredOption: true });
          }}
          onMouseLeave={() => {
            this.setState({ mouseEnteredOption: false });
          }}
        >
          <line
            x1="0"
            y1="35%"
            x2="100%"
            y2="35%"
            fill="white"
            stroke="white"
            strokeWidth="5"
            opacity={this.state.mouseEnteredOption ? "1.0" : "0.4"}
          />
          <text
            left="0"
            x="0"
            y="45%"
            fontSize={20 * this.props.minifiedScaleFactor}
            fontFamily="Optima"
            dominantBaseline="hanging"
            fill="white"
            pointerEvents="none"
          >
            {this.props.optionsList[this.props.index].title}
          </text>
        </svg>
      </>
    );
  }
}
