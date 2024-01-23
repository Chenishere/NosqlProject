const express = require("express");
const redis = require("redis");
const bodyParser = require("body-parser");

const app = express();
const port = 3001; // or any port you prefer

//const client = redis.createClient(6379);

//app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("ok ok ok ")
});

// Endpoint to save a note to Redis
app.post("/save-note", (req, res) => {
  const { content } = req.body;
  console.log(content);

  // Save the note content to Redis
  client.rpush("notes", content, (err, reply) => {
    if (err) {
      res.status(500).json({ error: "Error saving note." });
    } else {
      res.json({ success: true, noteId: reply });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
