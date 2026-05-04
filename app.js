console.log("web serverni boshlash");
const express = require("express");
const app = express();


const res = require("express/lib/response");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data);
  }
});

// MongoDB (CONNECT) chaqirish (malumotlarni yozish o'chirish uchun shu yerga yoziladi)
const db = require("./server").db();
const mongodb = require("mongodb");

//=============== 1 Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//================== 2 Session code

// ===============  3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

//================== 4 Routing code
/*app.get("/hello", function (req, res) {
  res.end(`<h1 style="background: aqua">HELLO WORLD</h1>`);
});
app.get("/gift", function (req, res) {
  res.end(`<h1 style="color: red">Siz sovg'alar bo'limidasiz</h1>`);
});
*/
//== post: o'zi bilan bir malumotni olib keladi va databasega yozadi
app.post("/create-item", (req, res) => {
  console.log("user enyered /create-item ");
  console.log(req.body);
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log(data.ops);
    res.json(data.ops[0]);
  });
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    function (err, data) {
      res.json({ state: "success" });
    },
  );
});

app.post("/edit-item", (req, res) => {
  const data = req.body;
  console.log(data);
  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) },
    { $set: { reja: data.new_input } },
    function (err, data) {
      res.json({ state: "success" });
    },
  );
});

app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "hamma rejalar o'chirildi" });
    });
  }
});

//=========== DATABASEDAN MALUMOTLARNI O'QITISH
app.get("/", function (req, res) {
  console.log("user enyered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("nimadur xatolik bo'ldi");
      } else {
        res.render("reja", { items: data });
      }
    });
});

//== get: database dan malumotni olish uchun ishlatiladi
app.get("/", function (req, res) {
  res.render("reja");
});

//=== author
app.get("/author", (req, res) => {
  res.render("author", { user: user });
});

module.exports = app;
