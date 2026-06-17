import express from "express";

import path from "path";

import { fileURLToPath } from "url";



const app = express();

const port = 3000;



// Fix __dirname for ES modules

const __dirname = path.dirname(fileURLToPath(import.meta.url));



// Set Pug as the view engine

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));



// Home route

app.get("/", (req, res) => {

    res.render("index", {

        title: "Home"

    });

});

app.get("/about", (req, res) => {
  res.render("about");
});


// Start server

app.listen(port, () => {

    console.log(`Listening on port: ${port}`);

});