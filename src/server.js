import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StyleSheetServer } from "aphrodite";
import "ignore-styles"; // to ignore CSS files when importing components

// To use streams
import fs from "fs";

// React Components
import App from "./app/App";
// Stream ??
//import { Stream } from "stream";

// Get the port
const PORT = process.env.PORT || 3000;

// Create express server
const server = express();

// Set up server properties
server.use("/dist", express.static("dist/"));

// Tell express that when it sees /public make it translate go to the appropriate folder
const pathToPublic = __dirname.substring(0, __dirname.length - 4) + "/public";
server.use("/public", express.static(pathToPublic));

// Send neccessary files server->client
server.get("/public/images/:id", (req, res) => {
  // log the activity to the server console
  console.log('server.get("/public/images/:id") [html request]');

  //res.sendFile(__dirname + "/public/" + req.params.id);
  res.sendFile("/public/images/" + req.params.id);
});

// Send neccessary files server->client
server.get("/public/fonts/:id", (req, res) => {
  // log the activity to the server console
  console.log('server.get("/public/fonts/:id") [html request]');

  //res.sendFile(__dirname + "/public/" + req.params.id);
  res.sendFile("/public/fonts/" + req.params.id);
});

// Getting "/"
server.get("/", (req, res) => {
  console.log("get request to /");

  const HTML = ReactDOMServer.renderToString(
    <>
      <App />
    </>
  );

  res.send(`
  <html>
    <head>
      <title>ArcGIS API for Javascript</title>
      <meta name="charset" content="utf-8" />
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
      <meta name="author" content="Yuri Dubler" />
      <meta name="description" content="ArcGIS API" />
      <style>
      html, body, #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
      </style>
      <link rel="stylesheet" href="https://js.arcgis.com/4.16/esri/css/main.css">
      <script src="https://js.arcgis.com/4.16/"></script>
      <script>
      require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
      ], function(Map, MapView, FeatureLayer) {

        var map = new Map({
          basemap: "topo-vector"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          center: [17.5,3.4],
          zoom: 3
        });

        // Cities feature layer
        var citiesLayer = new FeatureLayer({
        url:"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0/",
        definitionExpression: "POP > 65000 AND POP < 85000",
        outFields: ["CITY_NAME", "POP"], // Return all fields so it can be queried client-side
        geometryType: "polygon",
        rings: {[[[-29.28,16.38],[-18.52,35.10],[-5.6,35.94],[-5.09,35.98],[10.79,37.9],[33.99,31.52],[34.82,29.31],[34.54,27.39],[43.55,12.40],[55.01,13.21],[65.2817,-37.23],[6.81,-39.58]]]},
        popupTemplate: {
          // Enable a popup
          title: "{CITY_NAME}", // Show attribute value
          content: "Population: {POP}." // Display in pop-up
        }
        });

        map.add(citiesLayer);
      });
      </script>
    </head>
    <body style="margin:0px;font-family:Helvetica Neue" id="body">
      <div id="mountnode">${HTML}</div>
      <script src="../dist/main.js"></script>
    </body>
  </html>
  `);
});

server.listen(PORT, console.log("Server on."));
