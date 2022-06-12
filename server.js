const db = require('./db');
db.init();

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/userData/:userEmail', async (req, res) => {
  let result = await db.getUserInfo(req.params.userEmail);

  if (result === null) {
    res.json({});
  } else {
    res.json(result);
  }
});

app.put('/settings/:userEmail', (req, res) => {
  db.upsertUserSettings(req.params.userEmail, req.body);
  res.json(req.body);
});

app.put('/answers/:userEmail', (req, res) => {
  db.upsertUserAnswers(req.params.userEmail, req.body.answers);
  res.json(req.body);
});

// app.post('/similarUsers', async (req, res) => {
//   const result = await db.getExactSimilarUsers(req.body.email);
//   res.json(result);
// });

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const io = require('socket.io')().listen(server);

io.on('connection', socket => {

  console.log('new connection'); 
  
  socket.on('online', () => console.log("HERE"));

  socket.on('disconnect', () => console.log('disconnected')); 

})
