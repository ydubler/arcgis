"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _reactDeviceDetect = require("react-device-detect");

var _App = _interopRequireDefault(require("./app/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// React & ReactDOM
// The BrowserRouter is required to allow URL routing with the Route Object (imported next)
// The Route object allows us to load the appropriate React-Object based on the supplied URL.
// Detect the device being used
// React Components
//document.body.style.fontFamily = "Helvetica Neue";
//document.body.style.margin = 0;
// Hydrate the DOM, choosing what to render based on the provided Route Path (like "/portfolio")
_reactDom["default"].hydrate( /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_App["default"], null)), document.getElementById("mountnode"));