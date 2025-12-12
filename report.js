const e = require("express");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let subject = [
  { semester: 2, name: "データ通信", person: "水本 旭洋", location: 3212, difficult: "C", evaluation: "中間+期末" },
  { semester: 2, name: "データサイエンス", person: "三木 大輔", location: 3212, difficult: "B", evaluation: "中間+期末" },
  { semester: 2, name: "アジャイルワーク", person: "三木 大輔、鎌倉 浩嗣、水本 旭洋", location: 722, difficult: "S", evaluation: "レポート" },
  { semester: 2, name: "微分積分(A)", person: "東條 晃次", location: 8108, difficult: "B", evaluation: "中間+期末" },
  { semester: 2, name: "Webプログラミング", person: "須田 宇宙", location: 7104, difficult: "S", evaluation:"レポート" }
]

// システム１つ目
app.get("/subject", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db_subject', { data: subject });
});

app.get("/subject/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = subject[number];
  res.render('db_subject_detail', { data: detail });
});

app.get("/subject_add", (req, res) => {
  let semester = req.query.semester;
  let name = req.query.name;
  let person = req.query.person;
  let location = req.query.location;
  let difficult = req.query.difficult;
  let evaluation = req.query.evaluation;
  let newdata = { semester: semester, name: name, person: person, location: location, difficult: difficult , evaluation: evaluation};
  subject.push(newdata);
  res.redirect('/public/yes2.html');
});

// ２つ目

// 3つ目

app.listen(8080, () => console.log("Example app listening on port 8080!"));
