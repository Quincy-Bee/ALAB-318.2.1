import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// __dirname setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("success");
});


// home route
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});

// about
app.get("/about", (req, res) => {
    res.render("about");
});

// services
app.get("/services", (req, res) => {
    res.render("services");
});


// api
app.get("/api", (req, res) => {
    res.send("API is working");
});


// data
let users = [];
let posts = [];
let comments = [];


// POSTS

app.get("/api/posts", (req, res) => {
    const { userId } = req.query;

    let result = posts;

    if (userId) {
        result = result.filter(p => p.userId == userId);
    }

    res.json(result);
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

app.patch("/api/posts/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (post) {
        post.title = req.body.title;
    }

    res.json(post);
});

app.delete("/api/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.json({ message: "deleted" });
});


// COMENTS

app.get("/comments", (req, res) => {
    const { userId, postId } = req.query;

    let result = comments;

    if (userId) {
        result = result.filter(c => c.userId == userId);
    }

    if (postId) {
        result = result.filter(c => c.postId == postId);
    }

    res.json(result);
});

app.post("/comments", (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    res.json(newComment);
});

app.get("/comments/:id", (req, res) => {
    const comment = comments.find(c => c.id == req.params.id);
    res.json(comment);
});

app.patch("/comments/:id", (req, res) => {
    const comment = comments.find(c => c.id == req.params.id);

    if (comment) {
        comment.body = req.body.body;
    }

    res.json(comment);
});

app.delete("/comments/:id", (req, res) => {
    comments = comments.filter(c => c.id != req.params.id);
    res.json({ message: "deleted" });
});


// Users

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/users", (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json(newUser);
});

app.get("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    res.json(user);
});


// relationships

app.get("/api/users/:id/posts", (req, res) => {
    res.json(posts.filter(p => p.userId == req.params.id));
});

app.get("/api/posts/:id/comments", (req, res) => {
    res.json(comments.filter(c => c.postId == req.params.id));
});

app.get("/api/users/:id/comments", (req, res) => {
    res.json(comments.filter(c => c.userId == req.params.id));
});


// username routes
app.get("/user/:name", (req, res) => {
    res.render("index", {
        title: req.params.name
    });
});


// 
app.use(express.static("public"));


// download
app.get("/download", (req, res) => {
    res.download(path.join(__dirname, "public", "pika.PNG"));
});


// start server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});