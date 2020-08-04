import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StyleSheetServer } from "aphrodite";
import "ignore-styles"; // to ignore CSS files when importing components

// To use streams
import fs from "fs";

// React Components
import App from "./app/App";
import SidebarView from "./app/front-end-components/SidebarView";
import NavbarView from "./app/front-end-components/NavbarView";

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
      <title>Yuri Dubler's Portfolio</title>
      <meta name="charset" content="utf-8" />
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1.1">
      <meta name="author" content="Yuri Dubler" />
      <meta name="description" content="Yuri Dubler's Portfolio" />
      <link href="https://fonts.googleapis.com/css2?family=Fascinate+Inline&family=Lobster+Two&family=Open+Sans&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Fondamento&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Galada&family=Montserrat&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0px;font-family:Helvetica Neue" id="body">
      <div id="mountnode">${HTML}</div>
      <script src="../dist/main.js"></script>
    </body>
  </html>
  `);
});

server.get("/front-end-components/sidebar", (req, res) => {
  console.log("get request to /");

  const HTML = ReactDOMServer.renderToString(
    <>
      <SidebarView />
    </>
  );

  res.send(`
  <html>
  <head>
  <title>Yuri Dubler's Portfolio</title>
  <meta name="charset" content="utf-8" />
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1.1">
  
  <meta name="author" content="Yuri Dubler" />
  <meta name="description" content="Yuri Dubler's Portfolio" />
  <link href="https://fonts.googleapis.com/css2?family=Fascinate+Inline&family=Lobster+Two&family=Open+Sans&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Fondamento&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Galada&family=Montserrat&display=swap" rel="stylesheet">
  </head>
  <body style="margin:0px;font-family:Helvetica Neue" id="body">
  <div id="mountnode">${HTML}</div>
  <script src="../dist/main.js"></script>
  </body>
  </html>
  `);
});

// GET REQUEST
server.get("/lol", (req, res) => {
  // log the activity to the server console
  console.log('server.get("/") [html request]');

  // Incorporate Aphrodite's StyleSheetServer.renderStatic() function into the standard ReactDomServer function
  const { html, css } = StyleSheetServer.renderStatic(() => {
    // return ReactDOMServer.renderToString(<NavBar />);
    return ReactDOMServer.renderToString(<></>);
  });

  // Send the response, injecting the css content into the head and html into the body
  res.send(`
		<html>
			<head>
				<title>SSR React App</title>
            	<style data-aphrodite>${css.content}</style>
        	</head>
			<body>
				<div id="mountnode">${html}</div>
				<script src="/main.js"></script>
			</body>
		</html>
	`);
});

server.get("/front-end-components/navbar", (req, res) => {
  console.log("get request to /");

  const { HTML, CSS } = StyleSheetServer.renderStatic(() => {
    return ReactDOMServer.renderToString(<NavbarView />);
  });

  res.send(`
  <html>
    <head>
      <title>Yuri Dubler's Portfolio</title>
      <meta name="charset" content="utf-8" />
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1.1">
      <meta name="author" content="Yuri Dubler" />
      <meta name="description" content="Yuri Dubler's Portfolio" />
      <style data-aphrodite>${CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fascinate+Inline&family=Lobster+Two&family=Open+Sans&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Fondamento&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Galada&family=Montserrat&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0px;font-family:Helvetica Neue" id="body">
      <div id="mountnode">${HTML}</div>
      <script src="../dist/main.js"></script>
    </body>
  </html>
  `);
});

server.listen(PORT, console.log("Server on."));
