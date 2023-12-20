const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

db.serialize(() => {
  db.run('CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed BOOLEAN)');
});

app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

app.post('/todos', (req, res) => {
  const { text } = req.body;
  db.run('INSERT INTO todos (text, completed) VALUES (?, ?)', [text, false], function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "id": this.lastID
    });
  });
});

app.post('/reset', (req, res) => {
  db.serialize(() => {
    db.run('DELETE FROM todos', [], (err) => {
      if (err) {
        res.status(500).json({ "error": err.message });
        return;
      }
      res.json({ "message": "success" });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
