//require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

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

app.listen(process.env.PORT || 5000, () => console.log('Server started on port !{{PORT}}'));
