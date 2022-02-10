// MongoDB에 들어갈 데이터 틀
const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const saltRounds = 10;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//becrypt를 통한 비밀번호 암호화
userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrpyt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrpyt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
      next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrpyt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err),
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };
