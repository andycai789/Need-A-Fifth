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
const PlayerPool = require('./playerPool');
const GroupPool = require('./groupPool');

let groupPool = new GroupPool();

let malePool = new PlayerPool('Male');
let femalePool = new PlayerPool('Female');
let otherPool = new PlayerPool('Other');

// malePool.printPool();
// malePool.addPlayer("asdf1234", {name: "asdf", tagline: "4444", groupPreference: "male", rank: "diamond"});
// malePool.addPlayer("a", {name: "sdaf", tagline: "4444", groupPreference: "male", rank: "diamond"});
// malePool.printPool();
// malePool.printPool();

io.on('connection', socket => {
  console.log("CONNECTION");
  console.log(socket.id);

  socket.on('playerOnline', () => {
    console.log("Player connection");
    console.log(socket.id);
  });

  socket.on('groupOnline', () => {
    console.log("Group connection");
    console.log(socket.id);
  });

  socket.on('disconnect', () => console.log('disconnected')); 

});





