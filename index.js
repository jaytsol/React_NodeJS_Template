const express = require('express');
const app = express();
require('dotenv').config();
PORT = process.env.PORT;

const bodyParser = require('body-parser');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@reactnode.ykm1o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World!!!'));
app.post('/register', (req, res) => {
  const user = new User(req.body);
  
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
