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
app.post('/login', (req, res) => {
  // 데이터베이스에서 요청된 이메일이 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "wrong password"})

        //비밀번호가 맞다면
        user.generateToken((err, user) => {
          
        })
    })
  })
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
