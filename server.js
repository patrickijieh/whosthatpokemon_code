//require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

var http, options, proxy, url;

http = require("http");

url = require("url");

proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
target  = url.parse("https://cop4331-whosthatpokemon.herokuapp.com/");

options = {
  hostname: proxy.hostname,
  port: proxy.port || 80,
  path: target.href,
  headers: {
    "Proxy-Authorization": "Basic " + (new Buffer.from(proxy.auth).toString("base64")),
    "Host" : target.hostname
  }
};

http.get(options, function(res) {
  res.pipe(process.stdout);
  return console.log("status code", res.statusCode);
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

const userRouter = require('./routes/users');
app.use("/users", userRouter);

app.listen(process.env.PORT || 5000, () => console.log('Server started on port ${PORT}'));
