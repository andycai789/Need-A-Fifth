const db = require('./db');
db.init();

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/userData/:userEmail', async (req, res) => {
  let result = await db.getUserInfo(req.params.userEmail);

  if (result === null) {
    const userSettings = {
      riotID: "YourRiotID",
      tagline: "00000",
      rank: "Iron",
      gender: "Male",
      group: "All Male",
      role: ["Controller"]
    }

    const groupSettings = {
      riotID: "YourRiotID",
      tagline: "00000",
      rank: "Iron",
      group: "All Male",
      gender: "Male",
      role: ["Controller"]
    }

    db.upsertUserSettings(req.params.userEmail, {userSettings});
    db.upsertUserSettings(req.params.userEmail, {groupSettings});
    db.upsertUserAnswers(req.params.userEmail, [-1,-1,-1,-1,-1,-1]);

    let defaultSettings = await db.getUserInfo(req.params.userEmail);
    res.json(defaultSettings);
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

const Matchmaker = require('./matchmaker.js');
const matchmaker = new Matchmaker();

io.on('connection', socket => {

  console.log(`${socket.id} CONNECTION`);

  socket.on('playerOnline', (info) => {
    console.log(`Player ${socket.id} connected`);
    matchmaker.addPlayer(socket.id, info);
    matchmaker.printPlayerPools();
  });

  socket.on('groupOnline', (info) => {
    console.log(`Group ${socket.id} connected`);
    matchmaker.addGroup(socket.id, info);
    matchmaker.printIDPool();
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    matchmaker.removeUser(socket.id);
    matchmaker.printPlayerPools();
    matchmaker.printIDPool();
  });

  socket.on('requestPlayersFromGroup', () => {
    const players = matchmaker.getNPlayers(socket.id, 10);
    socket.emit('sendPlayersToGroup', players);
  });

  socket.on('sendInvitationFromGroup', (playerID) => {
    if (!matchmaker.hasID(playerID)) {
      socket.emit('playerUnavailable', playerID);
    } else {
      let info = matchmaker.getAllInfoFromID(socket.id)
      io.to(playerID).emit("sendInvitationToPlayer", {available: true, id: socket.id, info: info});
    }
  });

  socket.on('sendAcceptanceFromPlayer', (groupID) => {
    if (!matchmaker.hasID(groupID)) {
      socket.emit('groupUnavailable', groupID);
    } else {
      const playerInfo = matchmaker.getAllInfoFromID(socket.id);
      const groupInfo = matchmaker.getAllInfoFromID(groupID);

      io.to(groupID).emit("sendAcceptanceToGroup", playerInfo.riotID, playerInfo.tagline);
      socket.emit("sendAcceptanceToPlayer", groupInfo.riotID, groupInfo.tagline);
    }
  });

});





