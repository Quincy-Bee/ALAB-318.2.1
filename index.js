import express from "express"
import path from "path"
import { fileURLToPath } from "url"
const app = express();
const port = 3000;



// Resolve __dirname in an ES module so the views path is absolute
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Set up the Pug view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));



//view engine
// app.set("veiw engine", "pug");

// app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res,) => {
    res.json().render("index", {
        title: "Home"
    });
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
})[4:00 PM]This is the index.js(edited)
[4:01 PM]{
    "name": "alab-318.2.1",
        "version": "1.0.0",
            "description": "",
                "main": "index.js",
                    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
        "author": "",
            "license": "ISC",
                "type": "module",
                    "dependencies": {
        "ejs": "^6.0.1",
            "express": "^5.2.1",
                "pug": "^3.0.4"
    }
}