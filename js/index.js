const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// this tells express to serve static files through /public
app.use(express.static(path.join(__dirname, "/public")));

// this sets the default folder for "view" files (e.g. HTML)
// this makes it easy as you dont have to reference the full aboslute path, just the file name
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
   res.send("index");
});

app.listen(port, () => {
   `app listening on port ${port}`;
});