import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// __dirname setup

const __dirname = path.dirname(fileURLToPath(import.meta.url));


//this is the view engine
// Set Pug as the view engine

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use (( req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//Simple success response
app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("success");
});


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

//creating route for api
app.get("/api", (req, res) => {
    res.send("API is working");
});

//data for user and posts 
let users = [];
let posts = [];
let comments = [];

//POSTS

app.get("/api/posts", (req, res) => {
    res.json(posts);
});

app.post("/api/posts", (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.json(newPost);
});

app.get("/api/posts/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.json(post);
});

//user routes
app.get("/api/users", (req, res) => {
    res.json(users);
});


app.post("/api/users", (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json(newUser);
});
//ID
app.get("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    res.json(user);
});
//comments
app.get("/comments", (req, res) => {
    res.json(comments);
});

//route for username

app.get("/user/:name", (req, res) => {
    res.render("index", {
        title: req.params.name
    });
});


app.use(express.static("public"));


//download Pikachu route

app.get("/download", (req, res)=> {
  res.download(path.join(__dirname, "public", "pika.PNG"));
});


// Start server

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});