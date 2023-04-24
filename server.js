//require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

var url = require('url');
var HttpsProxyAgent = require('https-proxy-agent');
var request = require('request');

var endpoint = process.env.DATABASE_URL;
var proxy = process.env.QUOTAGUARDSTATIC_URL;
var agent = new HttpsProxyAgent(proxy);
var options = {
  uri: url.parse(endpoint),
  agent
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('body: ', body);
  } else {
    console.log('error: ', error);
  }
}

request(options, callback);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

/*mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));*/

app.use(express.json());

const userRouter = require('./routes/users');
app.use("/users", userRouter);

app.listen(process.env.PORT || 5000, () => console.log('Server started on port ${PORT}'));
