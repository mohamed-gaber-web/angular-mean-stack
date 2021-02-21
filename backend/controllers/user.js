const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');


exports.createUser = (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

    user.save()
    .then(response => {
      res.status(201).json({
        message: 'user created',
        response: response
      })
    }).catch(error => {
      res.status(500).json({
        message: 'Invalid authentcation credentials',
        errro: error
      })
    })

  })
}


exports.userLogin = (req, res, next) => {

  let fetchedUser;

  // 1. check email is exist

  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: "auth error "
      });
    }
    fetchedUser = user;
    // 2. convert hash password
    return bcrypt.compare(req.body.password, user.password);
  })

  // 3. jwt
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      tokenExpires: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Invalid authentcation credentials",
      error: err
    });
  });

}
