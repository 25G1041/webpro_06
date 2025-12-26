"use strict";

const express = require("express");
const app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

//sqLite3の設定
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('webpro.db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS spend (game TEXT, money INTEGER, reason TEXT, day TEXT, satisfaction TEXT, remarks TEXT)");
});
// --------------------

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//一覧
app.get("/spend", (req, res) => {
  db.all("SELECT rowid AS id, * FROM spend", (err, rows) => {
      res.render('db_spend', { data: rows });
  });
});

//create
app.get("/spend/create", (req, res) => {
  res.redirect('/public/spend_add.html');
});

app.post("/spend", (req, res) => {
  db.run(
    "INSERT INTO spend VALUES (?, ?, ?, ?, ?, ?)",
    [
      req.body.game,
      req.body.money,
      req.body.reason,
      req.body.day,
      req.body.satisfaction,
      req.body.remarks
    ],
    () => {
      const message = `【課金通知】${req.body.game} に ${req.body.money} 円課金しました！`;
      io.emit('chat message', message);
      res.redirect("/spend");
    }
  );
});

//detail
app.get("/spend/:number", (req, res) => {
  db.all("SELECT rowid AS id, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows.find(row => row.id == number);
    res.render('db_spend_detail', { id: number, data: detail });
  });
});

//edit
app.get("/spend/edit/:number", (req, res) => {
  db.all("SELECT rowid AS id, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows.find(row => row.id == number);
    res.render('db_spend_edit', { id: number, data: detail });
  });
});

//update
// 更新処理
app.post("/spend/update/:number", (req, res) => {
  db.all("SELECT rowid AS id, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows.find(row => row.id == number);
    db.run(
      "UPDATE spend SET game=?, money=?, reason=?, day=?, satisfaction=?, remarks=? WHERE rowid=?",
      [
        req.body.game,
        req.body.money,
        req.body.reason,
        req.body.day,
        req.body.satisfaction,
        req.body.remarks,
        detail.id
      ],
      () => {
        const message = `【更新通知】${req.body.game}(${req.body.day}) の内容を修正しました！`;
        io.emit('chat message', message);
        res.redirect("/spend");
      }
    );
  });
});

//delate
app.get("/spend/delete/:number", (req, res) => {
  db.all("SELECT rowid AS id, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows.find(row => row.id == number);
    const gameName = detail.game;
    const day = detail.day;
    db.run("DELETE FROM spend WHERE rowid = ?", [detail.id], (err) => {
      const message = `【削除通知】${gameName}(${day}) のデータを削除しました！`;
      io.emit('chat message', message);
      res.redirect('/spend');
      });
  });
});




io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

server.listen(8080, () => {
  console.log("Server running on port 8080!");
});