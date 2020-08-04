// Stack Imports
import React, { useState, useEffect } from "react";

function Sidebar(props) {
  // MOUNTED
  const [MOUNTED, SET_MOUNTED] = useState(false);

  const [SIDEBAR_WIDTH, SET_SIDEBAR_WIDTH] = useState(0);

  const [OPTIONS, SET_OPTIONS] = useState([]);

  // This function is called when: the component mounts AND the component updates:
  // This function is intended to parse the input options into a linear array
  // for easier state setting.
  useEffect(() => {
    if (!MOUNTED) {
      let linearOptions = [];
      let startingDepth = 0;

      // Create an array from the recursive options
      props.options.map((option) => {
        linearizeOptionsRecursive(option, linearOptions, startingDepth);
      });

      // Get/set the sidebar's width
      let greatestWidth = 0;
      props.options.map((option) => {
        let returnWidth = getSidebarWidthRecursive(option, startingDepth, 0);
        greatestWidth =
          greatestWidth > returnWidth ? greatestWidth : returnWidth;
      });
      let sidebarLetterWidth = document.getElementById("sidebarLetterWidth")
        .clientWidth;
      SET_SIDEBAR_WIDTH((greatestWidth + 1) * sidebarLetterWidth);

      SET_OPTIONS(linearOptions);
      SET_MOUNTED(true);
    }
  });

  // Create completely expanded list
  const linearizeOptionsRecursive = (option, array, depth) => {
    // Only roots will be displayed at first
    const DISPLAYED = depth === 0 ? true : false;

    // Create the option object
    const optionObject = {
      label: option.label,
      hasSuboptions: option.suboptions === null ? false : true,
      expanded: option.expanded,
      depth: depth,
      displayed: DISPLAYED,
    };

    // Push the object to the array
    array.push(optionObject);

    // Recursively apply this method to suboptions
    if (option.suboptions != null) {
      depth++;
      option.suboptions.map((option) => {
        linearizeOptionsRecursive(option, array, depth);
      });
    }
  };

  // Determine the width of the sidebar
  const getSidebarWidthRecursive = (option, depth, greatestWidth) => {
    let MY_WIDTH = option.label.length;
    MY_WIDTH += depth;
    MY_WIDTH += 3; //option.suboptions != null ? 3 : 0;
    console.log(option.label + " : " + MY_WIDTH);
    let RETURN_WIDTH = MY_WIDTH > greatestWidth ? MY_WIDTH : greatestWidth;

    // Recursively apply this method to suboptions
    if (option.suboptions != null) {
      depth++;
      option.suboptions.map((option) => {
        let greatestChildWidth = getSidebarWidthRecursive(
          option,
          depth,
          MY_WIDTH
        );
        RETURN_WIDTH =
          RETURN_WIDTH > greatestChildWidth ? RETURN_WIDTH : greatestChildWidth;
      });
    }

    return RETURN_WIDTH;
  };

  const toggleExpanded = (option, index) => {
    // Handle all options previous to the clicked option
    let NEW_OPTIONS = [];
    for (let i = 0; i < index; i++) {
      const CURRENT_OPTION = OPTIONS[i];

      // Duplicate the option object
      const optionObject = {
        label: CURRENT_OPTION.label,
        hasSuboptions: CURRENT_OPTION.hasSuboptions,
        expanded: CURRENT_OPTION.expanded,
        depth: CURRENT_OPTION.depth,
        displayed: CURRENT_OPTION.displayed,
      };

      NEW_OPTIONS.push(optionObject);
    }

    // Handle the option that was clicked
    const TOGGLED_OPTION = option;
    // Duplicate the option object
    const optionObject = {
      label: TOGGLED_OPTION.label,
      hasSuboptions: TOGGLED_OPTION.hasSuboptions,
      expanded: !TOGGLED_OPTION.expanded,
      depth: TOGGLED_OPTION.depth,
      displayed: true,
    };
    NEW_OPTIONS.push(optionObject);
    let STARTING_DEPTH = TOGGLED_OPTION.depth;
    let TOGGLED_DISPLAYED = !TOGGLED_OPTION.expanded;

    // Handle all options following the clicked option
    let finalIndex = index + 1;
    for (let i = index + 1; i < OPTIONS.length; i++) {
      const CURRENT_OPTION = OPTIONS[i];
      const CURRENT_OPTION_DEPTH = CURRENT_OPTION.depth;

      if (CURRENT_OPTION_DEPTH === STARTING_DEPTH + 1) {
        // Duplicate the option object
        const optionObject = {
          label: CURRENT_OPTION.label,
          hasSuboptions: CURRENT_OPTION.hasSuboptions,
          expanded: false,
          depth: CURRENT_OPTION.depth,
          displayed: TOGGLED_DISPLAYED,
        };
        NEW_OPTIONS.push(optionObject);

        // Increment final index
        finalIndex++;
      } else if (CURRENT_OPTION_DEPTH > STARTING_DEPTH + 1) {
        // Duplicate the option object
        const optionObject = {
          label: CURRENT_OPTION.label,
          hasSuboptions: CURRENT_OPTION.hasSuboptions,
          expanded: false,
          depth: CURRENT_OPTION.depth,
          displayed: false,
        };
        NEW_OPTIONS.push(optionObject);

        // Increment final index
        finalIndex++;
      } else {
        break;
      }
    }

    for (let i = finalIndex; i < OPTIONS.length; i++) {
      const CURRENT_OPTION = OPTIONS[i];

      // Duplicate the option object
      const optionObject = {
        label: CURRENT_OPTION.label,
        hasSuboptions: CURRENT_OPTION.hasSuboptions,
        expanded: CURRENT_OPTION.expanded,
        depth: CURRENT_OPTION.depth,
        displayed: CURRENT_OPTION.displayed,
      };

      NEW_OPTIONS.push(optionObject);
    }

    SET_OPTIONS(NEW_OPTIONS);
  };

  return (
    <>
      {!MOUNTED && (
        <div
          id="sidebarLetterWidth"
          style={{
            position: "absolute",
            width: "auto",
            top: -1000,
            right: -1000,
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontFamily: "Courier",
            fontSize: "15px",
            visibility: "hidden",
          }}
        >
          M
        </div>
      )}
      {MOUNTED && (
        <div
          style={{
            display: "inline-block",
            width: SIDEBAR_WIDTH,
            fontFamily: "Courier",
            fontSize: "15px",
            border: "2px solid black",
          }}
        >
          {OPTIONS.map((option, index) => {
            if (option.displayed) {
              let OPTION_BACKGROUND_COLOR = "white";
              // The option's background color is a function of it's depth
              if (!props.blackAndWhite) {
                let red = Number.parseInt(props.baseColor[0]);
                let green = Number.parseInt(props.baseColor[1]);
                let blue = Number.parseInt(props.baseColor[2]);
                OPTION_BACKGROUND_COLOR =
                  "rgb(" +
                  (red + props.changeRed * option.depth) +
                  "," +
                  (green + props.changeGreen * option.depth) +
                  "," +
                  (blue + props.changeBlue * option.depth) +
                  ")";
              }

              return (
                <div
                  key={Math.random()}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    backgroundColor: OPTION_BACKGROUND_COLOR,
                  }}
                  onClick={() => {
                    option.hasSuboptions
                      ? toggleExpanded(option, index)
                      : undefined;
                    console.log("on click");
                  }}
                >
                  {option.hasSuboptions ? (
                    <>{"\u00A0".repeat(option.depth)}</>
                  ) : (
                    <>{"\u00A0".repeat(option.depth + 3)}</>
                  )}

                  {option.hasSuboptions
                    ? option.expanded
                      ? "(-)"
                      : "(+)"
                    : ""}

                  {option.label}
                </div>
              );
            } else {
              return <React.Fragment key={Math.random()}></React.Fragment>;
            }
          })}
        </div>
      )}
    </>
  );
}

export default Sidebar;
