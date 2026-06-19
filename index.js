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

//creating route for about

app.get("/about", (req, res) => {
    res.render("about");
});

// creating route for services
app.get("/services", (req, res) => {
    res.render("services");
});

//Simple success response
app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("success");
});

//route for username

app.get("/user/:name", (req, res) => {
    res.render("index", {
        title: req.params.name
    });
});

//middleware
app.use (( req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.static("public"));

//

//download Pikachu route

app.get("/download", (req, res)=> {
  res.download(path.join(__dirname, "public", "pika.PNG"));
});


// Start server

app.listen(port, () => {

    console.log(`Listening on port: ${port}`);

});