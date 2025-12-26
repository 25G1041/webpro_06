"use strict";

const express = require("express");
const app = express();

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
      res.redirect("/spend");
    }
  );
});

//detail
app.get("/spend/:number", (req, res) => {
  db.all("SELECT rowid, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows[number];
    res.render('db_spend_detail', { id: number, data: detail });
  });
});

//edit
app.get("/spend/edit/:number", (req, res) => {
  db.all("SELECT rowid, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows[number];
    res.render('db_spend_edit', { id: number, data: detail });
  });
});

//update
app.post("/spend/update/:number", (req, res) => {
  db.all("SELECT rowid, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows[number];
      db.run(
        "UPDATE spend SET game=?, money=?, reason=?, day=?, satisfaction=?, remarks=? WHERE rowid=?",
        [
          req.body.game,
          req.body.money,
          req.body.reason,
          req.body.day,
          req.body.satisfaction,
          req.body.remarks,
          detail.rowid
        ]
      );
    res.redirect("/spend");
  });
});

//delate
app.get("/spend/delete/:number", (req, res) => {
  db.all("SELECT rowid, * FROM spend", (err, rows) => {
    const number = req.params.number;
    const detail = rows[number];
    db.run("DELETE FROM spend WHERE rowid = ?", [detail.rowid], (err) => {
        res.redirect('/spend');
      });
  });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));