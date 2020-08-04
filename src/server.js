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
        "esri/layers/FeatureLayer"
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
        url:"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0/query?where=1%3D1&outFields=POP,CITY_NAME&geometry=%7B%22rings%22%3A%5B%5B%5B-29.28%2C16.38%5D%2C%5B-18.52%2C35.10%5D%2C%5B-5.6%2C35.94%5D%2C%5B-5.09%2C35.98%5D%2C%5B10.79%2C37.9%5D%2C%5B33.99%2C31.52%5D%2C%5B34.82%2C29.31%5D%2C%5B34.54%2C27.39%5D%2C%5B43.55%2C12.40%5D%2C%5B55.01%2C13.21%5D%2C%5B65.2817%2C-37.23%5D%2C%5B6.81%2C-39.58%5D%5D%5D%2C%20%20%20%22spatialReference%22%20%3A%20%7B%22wkid%22%20%3A%204326%7D%7D&geometryType=esriGeometryPolygon&inSR=4326&spatialRel=esriSpatialRelContains&outSR=4326&f=json"
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
