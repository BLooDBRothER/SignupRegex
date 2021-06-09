
const { Client } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const staticpath = path.join(__dirname, "public");
app.use(express.static(staticpath));
app.use(bodyParser.json());

const client = new Client({
  connectionString: "postgres://user:password@host:port/Database",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

app.post("/mobile/:no([0-9]{10,10})", (req, res) => {
  client.query("SELECT * FROM users WHERE phone=($1)", [req.params.no],  (err, result) => {
    if (err) {
      console.log("insert"+err);
    }
      res.send({"status" : result.rows.length});
  });
})

app.post('/insert', (req, res) => {
  client.query("INSERT INTO USERS(phone, password) VALUES($1, $2)", [req.body.ph, req.body.pass],  (err, result) => {
    if (err) {
      res.send("insert"+err.stack);
      return;
    }
    res.send("Signup Successful");
  });
});

port = process.env.PORT || 3000

app.listen(port, () => {console.log("connected")});