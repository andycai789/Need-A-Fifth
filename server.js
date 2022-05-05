const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json());

app.post('/answers', (req, res) => {
    db.insertUserValues(req.body);
    res.json(req.body);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})