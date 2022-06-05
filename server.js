const db = require('./db');
db.init();

const express = require('express');
const app = express();
const port = 3000;

const multer  = require('multer')
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.use(express.json());

app.put('/settings/:userEmail', (req, res) => {
  db.upsertUserSettings(req.params.userEmail, req.body);
  res.json(req.body);
});

app.get('/settings/personal/:userEmail', async (req, res) => {
  let result = await db.getUserInfo(req.params.userEmail);

  if (result === null) {
    res.json({name: '', rank: '', gender: '', group: '', role: []})
  } else {
    res.json(result.personal);
  }
});

app.get('/settings/group/:userEmail', async (req, res) => {
  let result = await db.getUserInfo(req.params.userEmail);

  if (result === null) {
    res.json({name: '', rank: '', group: '', gender: '', role: []})
  } else {
    res.json(result.group);
  }
});

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

// app.put('/images/:userEmail', upload.array('images', 6), (req, res) => {
//   db.upsertUserPhotos(req.params.userEmail, req.files);
//   res.json({});
// });

// app.get('/images/:userEmail/:index', async (req, res) => {
//   let result = await db.getUserPhoto(req.params.userEmail, req.params.index);

//   if (!result) {
//     res.json({});
//   } else {
//     res.json(result);
//   }
// });