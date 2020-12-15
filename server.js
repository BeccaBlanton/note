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

//for Deleting
  app.delete("/api/notes/:id", function(req, res) {
    var chosen = req.params.id;
  
    console.log("ID is "+ chosen);
  //
    for (var i = 0; i < notesDb.length; i++) {
      if (chosen === notesDb[i].id) {
        notesDb.splice(i,1)
      }
    }
    return res.json(false);
  });
// posts data from note into API
  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    notesDb.push(newNote);
    res.json(newNote);
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  /*
  
  DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.*/
