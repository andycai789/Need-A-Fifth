const db = require('./db');
db.init();

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.put('/images/:userEmail', fileUpload(), (req, res) => {
  console.log(req.files);

  res.end();
})

app.use(express.json());

app.put('/settings/:userEmail', (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

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

