const db = require('./db');
db.init();

const express = require('express');
const app = express();
const port = 3000;

const multer  = require('multer')
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.put('/images/:userEmail', upload.array('images', 6), (req, res) => {

  db.upsertUserPhotos(req.params.userEmail, req.files);

  res.json("");
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

