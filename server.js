// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var notesDb = require("./db/db.json")
app.get("/api/notes", function(req, res) {
    return res.json(notesDb)
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "/assets/css/styles.css"));
  });

  app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/assets/js/index.js"));
  });

  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    notesDb.push(newNote);
    res.json(newNote);
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
