"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _express = _interopRequireDefault(require("express"));

require("ignore-styles");

var _fs = _interopRequireDefault(require("fs"));

var _App = _interopRequireDefault(require("./app/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// to ignore CSS files when importing components
// To use streams
// React Components
// Stream ??
//import { Stream } from "stream";
// Get the port
var PORT = process.env.PORT || 3000; // Create express server

var server = (0, _express["default"])(); // Set up server properties

server.use("/dist", _express["default"]["static"]("dist/")); // Tell express that when it sees /public make it translate go to the appropriate folder

var pathToPublic = __dirname.substring(0, __dirname.length - 4) + "/public";
server.use("/public", _express["default"]["static"](pathToPublic)); // Send neccessary files server->client

server.get("/public/images/:id", function (req, res) {
  // log the activity to the server console
  console.log('server.get("/public/images/:id") [html request]'); //res.sendFile(__dirname + "/public/" + req.params.id);

  res.sendFile("/public/images/" + req.params.id);
}); // Getting "/experience"

server.get("/", function (req, res) {
  console.log("get request to /");

  var HTML = _server["default"].renderToString( /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_App["default"], null)));

  res.send("\n  <html>\n  <head>\n  <title>SSR React App</title>\n  </head>\n  <body style=\"margin:0px;font-family:Helvetica Neue\" id=\"body\">\n  <div id=\"mountnode\">".concat(HTML, "</div>\n  <script src=\"../dist/main.js\"></script>\n  </body>\n  </html>\n  "));
});
server.listen(PORT, console.log("Server on."));