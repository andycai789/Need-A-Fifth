
const db = require('./db');
db.init();

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/test', (req, res) => {
  console.log("GOT TESTA");
  res.sendStatus(200);
})

app.post('/answers', (req, res) => {
    db.insertUserValues(req.body);
    res.json(req.body);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})