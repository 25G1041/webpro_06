const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render('menu', {});
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/english", (req, res) => {
  const message = "Good Morning";
  res.render('greeting', { message: message });
});

app.get("/france", (req, res) => {
  const message = "Good Bonjour";
  res.render('greeting', { message: message });
});

app.get("/germany", (req, res) => {
  const message = "Guten Morgen";
  res.render('greeting', { message: message });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/omikuji", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '社長';
  else if (num == 2) luck = '普通';
  else if (num == 3) luck = '高熱';
  else if (num == 4) luck = '落単';
  else if (num == 5) luck = '退学';
  else if (num == 6) luck = '死亡';

  res.send('今日の運勢は' + luck + 'です');
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  else if (num == 3) luck = '高熱';
  else if (num == 4) luck = '落単';
  else if (num == 5) luck = '退学';
  else if (num == 6) luck = '死亡';

  res.send('今日の運勢は' + luck + 'です');
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  else if (num == 3) luck = '高熱';
  else if (num == 4) luck = '落単';
  else if (num == 5) luck = '退学';
  else if (num == 6) luck = '死亡';

  res.render('omikuji2', { result: luck });
});

app.get("/omikuji3", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  let comment = '';
  if (num == 1) {
    luck = '大吉';
    comment = '絶好調';
  } else if (num == 2) {
    luck = '中吉';
    comment = '普通';
  } else if (num == 3) {
    luck = '高熱';
    comment = '嫌';
  } else if (num == 4) {
    luck = '落単';
    comment = 'めっちゃ嫌';
  } else if (num == 5) {
    luck = '退学';
    comment = '終了';
  } else if (num == 6) {
    luck = '死亡';
    comment = '死亡';
  }

  res.render('omikuji3', { result: luck, come: comment });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
