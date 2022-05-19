const db = require('./db');
db.init();

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.put('/answers', (req, res) => {
  db.upsertUserAnswers(req.body);
  res.json(req.body);
});

app.post('/similarUsers', async (req, res) => {
  const result = await db.getExactSimilarUsers(req.body.email);
  res.json(result);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});