const express = require('express');
const app = express();
require('dotenv').config();
PORT = process.env.PORT;

const bodyParser = require('body-parser');
const { User } = require('./models/User');

app.user(bodyParser.urlencoded({ extended: true }));
app.user(bodyParser.json());

const mongoose = require('mongoose');
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@reactnode.ykm1o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World!!!'));
app.post('/register', (req, res) => {
  const User = new User(req.body);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
