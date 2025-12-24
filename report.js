"use strict";

const e = require("express");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// システム１つ目

let subject = [
  { semester: 2, name: "データ通信", person: "水本 旭洋", campus:"新習志野", location: 3212, difficult: "C", evaluation: "中間+期末" },
  { semester: 2, name: "データサイエンス", person: "三木 大輔", campus: "新習志野", location: 3212, difficult: "B", evaluation: "中間+期末" },
  { semester: 2, name: "アジャイルワーク", person: "三木 大輔、鎌倉 浩嗣、水本 旭洋", campus: "津田沼", location: 722, difficult: "S", evaluation: "レポート" },
  { semester: 2, name: "微分積分(A)", person: "東條 晃次", campus: "新習志野", location: 8108, difficult: "B", evaluation: "中間+期末" },
  { semester: 2, name: "Webプログラミング", person: "須田 宇宙", campus: "新習志野", location: 7104, difficult: "S", evaluation:"レポート" }
]

//一覧
app.get("/subject", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db_subject', { data: subject });
});

//Create
app.get("/subject/create", (req, res) => {
  res.redirect('/public/subject_add.html');
});

//Read
app.get("/subject/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = subject[number];
  res.render('db_subject_detail', { id: number, data: detail });
});

// Delete
app.get("/subject/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  subject.splice(req.params.number, 1);
  res.redirect('/subject');
});

// Create
app.post("/subject", (req, res) => {
  let semester = req.body.semester;
  let name = req.body.name;
  let person = req.body.person;
  let campus = req.body.campus;
  let location = req.body.location;
  let difficult = req.body.difficult;
  let evaluation = req.body.evaluation;

  if (Array.isArray(evaluation)) {
    evaluation = evaluation.join('+');
  }

  let newdata = { semester: semester, name: name, person: person, campus: campus, location: location, difficult: difficult , evaluation: evaluation};
  subject.push(newdata);
  res.redirect('/subject');
});

// Edit
app.get("/subject/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = subject[number];

  res.render('db_subject_edit', { id: number, data: detail });
});

// Update
app.post("/subject/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  subject[req.params.number].semester = req.body.semester;
  subject[req.params.number].name = req.body.name;
  subject[req.params.number].person = req.body.person;
  subject[req.params.number].campus = req.body.campus;
  subject[req.params.number].location = req.body.location;
  subject[req.params.number].difficult = req.body.difficult;
  subject[req.params.number].evaluation = req.body.evaluation;
  console.log(subject);
  res.redirect('/subject');
});



// ２つ目

let party = [
    { name: "自由民主党", reader: "高市早苗", syu: 199,san: 100, year: 1955, phrase: "日本列島を、強く豊かに。", url: "https://www.jimin.jp/", which: "与党" },
    { name: "公明党", reader: "斉藤鉄夫", syu: 24,san: 21, year: 1964, phrase: "やると言ったら、やり切る。", url: "https://www.komei.or.jp/", which: "野党" },
    { name: "立憲民主党", reader: "野田佳彦", syu: 148,san: 41, year: 2017, phrase: "物価高から、あなたを守り抜く", url: "https://cdp-japan.jp/", which: "野党" },
    { name: "日本維新の会", reader: "吉村洋文", syu: 34,san: 19, year: 2015, phrase: "身を切る改革、実行中。", url: "https://o-ishin.jp/", which: "与党" },
    { name: "国民民主党", reader: "玉木雄一郎", syu: 27,san: 25, year: 2020, phrase: "手取りを増やす。", url: "https://new-kokumin.jp/", which: "野党" },
    { name: "日本共産党", reader: "田村智子", syu: 8,san: 7, year: 1922, phrase: "暮らし優先の政治に変えます", url: "https://www.jcp.or.jp/", which: "野党" },
    { name: "れいわ新選組", reader: "山本太郎", syu: 9,san:6, year: 2019, phrase: "生きているだけで価値がある", url: "https://reiwa-shinsengumi.com/", which: "野党" },
    { name: "社会民主党", reader: "福島瑞穂", syu: 0,san: 1, year: 1996, phrase: "ミサイルよりコメを！", url: "https://sdp.or.jp/", which: "野党" }
]

//一覧
app.get("/party", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db_party', { data: party });
});

//Create
app.get("/party/create", (req, res) => {
  res.redirect('/public/party_add.html');
});

//Read
app.get("/party/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = party[number];
  res.render('db_party_detail', { id: number, data: detail });
});

// Delete
app.get("/party/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  party.splice(req.params.number, 1);
  res.redirect('/party');
});

// Create
app.post("/party", (req, res) => {
  let name = req.body.name;
  let reader = req.body.reader;
  let syu = req.body.syu;
  let san = req.body.san;
  let year = req.body.year;
  let phrase = req.body.phrase;
  let url = req.body.url;
  let which = req.body.which;
  

  let newdata = {name: name,reader: reader,syu: syu,san: san,year: year,phrase: phrase,url: url,which: which};
  party.push(newdata);
  res.redirect('/party');
});

// Edit
app.get("/party/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = party[number];

  res.render('db_party_edit', { id: number, data: detail });
});

// Update
app.post("/party/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  party[req.params.number].name = req.body.name;
  party[req.params.number].reader = req.body.reader;
  party[req.params.number].syu = req.body.syu;
  party[req.params.number].san = req.body.san;
  party[req.params.number].year = req.body.year;
  party[req.params.number].phrase = req.body.phrase;
  party[req.params.number].url = req.body.url;
  party[req.params.number].which = req.body.which;
  
  console.log(party);
  res.redirect('/party');
});

// 3つ目

let spend = [
  { game: "プロジェクトセカイ", money: "2000", reason: "イベランの追い込み", day: "2025-11-17", satisfaction: "S", remarks:"これのおかげでTOP300取れた" }
]

//一覧
app.get("/spend", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db_spend', { data: spend });
});

//Create
app.get("/spend/create", (req, res) => {
  res.redirect('/public/spend_add.html');
});

//Read
app.get("/spend/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = spend[number];
  res.render('db_spend_detail', { id: number, data: detail });
});

// Delete
app.get("/spend/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  spend.splice(req.params.number, 1);
  res.redirect('/spend');
});

// Create
app.post("/spend", (req, res) => {
  let game = req.body.game;
  let money = req.body.money;
  let reason = req.body.reason;
  let day = req.body.day;
  let satisfaction = req.body.satisfaction;
  let remarks = req.body.remarks;

  let newdata = {game: game, money: money, reason: reason, day: day, satisfaction: satisfaction, remarks: remarks};
  spend.push(newdata);
  res.redirect('/spend');
});

// Edit
app.get("/spend/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = spend[number];

  res.render('db_spend_edit', { id: number, data: detail });
});

// Update
app.post("/spend/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  spend[req.params.number].game = req.body.game;
  spend[req.params.number].money = req.body.money;
  spend[req.params.number].reason = req.body.reason;
  spend[req.params.number].day = req.body.day;
  spend[req.params.number].satisfaction = req.body.satisfaction;
  spend[req.params.number].remarks = req.body.remarks;

  console.log(spend);
  res.redirect('/spend');
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
