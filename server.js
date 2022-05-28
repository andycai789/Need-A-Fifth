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

app.get('/images/:userEmail', async (req, res) => {
  let result = await db.getUserPhotos(req.params.userEmail);

  res.json(result);
})

app.use(express.json());

app.put('/settings/:userEmail', (req, res) => {
  db.upsertUserSettings(req.params.userEmail, req.body);
  res.json(req.body);
})

app.get('/settings/:userEmail', async (req, res) => {
  let result = await db.getUserSettings(req.params.userEmail);
  res.json({name: result.name, gender: result.gender, preferences: result.preferences});
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

