// React
import React from "react";

// App Function Component
export default class LinearGradient extends React.Component {
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
      gradientHeight: this.props.gradientHeight,
      svgHorizontalOverlapIdeal: this.props.svgHorizontalOverlapIdeal,
      optionsListLength: this.props.optionsListLength,
      windowInnerWidth: this.props.windowInnerWidth,
      windowExtraWidth: this.props.windowExtraWidth,
      optionWidthIdeal: this.props.optionWidthIdeal
    };

    this.resizeTimer;
  }

  componentDidUpdate() {}

  componentWillReceiveProps() {}

  componentDidUpdate() {}

  componentDidMount() {
    console.log(
      "CDM LINE STUFF : " +
        this.props.gradientHeight +
        " , " +
        this.props.svgHorizontalOverlapIdeal +
        " , " +
        this.props.optionsListLength +
        " , " +
        this.props.windowInnerWidth +
        " , " +
        this.props.windowExtraWidth +
        " , " +
        this.props.optionWidthIdeal
    );
  }

  // APPROACH
  // Render browser navbar
  render() {
    return (
      <>
        <defs>
          <linearGradient id="linearGradient">
            <stop
              key={Math.random()}
              offset="0%"
              stopColor={this.props.navBarColorsBlueSchema[0]}
            />
            <stop
              key={Math.random()}
              offset={
                (this.props.windowExtraWidth / 2 +
                  this.props.optionWidthIdeal / 4) /
                this.props.windowInnerWidth
              }
              stopColor={this.props.navBarColorsBlueSchema[1]}
            />
            {[...Array(this.props.optionsListLength).keys()].map(index => (
              <>
                <stop
                  key={Math.random()}
                  offset={
                    (this.props.windowExtraWidth / 2 +
                      ((index + 1) * this.props.optionWidthIdeal) / 2 -
                      index * this.props.svgHorizontalOverlapIdeal) /
                    this.props.windowInnerWidth
                  }
                  stopColor={this.props.navBarColorsBlueSchema[index + 2]}
                />
              </>
            ))}
            <stop
              key={Math.random()}
              offset={
                (this.props.windowInnerWidth -
                  (this.props.windowExtraWidth / 2 +
                    this.props.optionWidthIdeal / 4)) /
                this.props.windowInnerWidth
              }
              stopColor={
                this.props.navBarColorsBlueSchema[
                  this.props.optionsListLength + 1
                ]
              }
            />
            <stop
              key={Math.random()}
              offset="100%"
              stopColor={
                this.props.navBarColorsBlueSchema[
                  this.props.optionsListLength + 2
                ]
              }
            />
          </linearGradient>
        </defs>

        <rect
          x="0"
          y="0"
          width="100%"
          height={this.props.gradientHeight}
          fill="url(#linearGradient)"
        />
        {[...Array(this.props.optionsListLength).keys()].map(index => (
          <>
            <line
              key={Math.random()}
              x1={
                "" +
                Number.parseFloat(
                  (this.props.windowExtraWidth / 2 +
                    ((index + 1) * this.props.optionWidthIdeal) / 2 -
                    index * this.props.svgHorizontalOverlapIdeal) /
                    this.props.windowInnerWidth
                )
              }
              y1="0"
              x2={
                "" +
                Number.parseFloat(
                  (this.props.windowExtraWidth / 2 +
                    ((index + 1) * this.props.optionWidthIdeal) / 2 -
                    index * this.props.svgHorizontalOverlapIdeal) /
                    this.props.windowInnerWidth
                )
              }
              y2="50"
              stroke="white"
            />
          </>
        ))}
      </>
    );
  }
}
