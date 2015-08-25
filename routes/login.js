var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');

router.post('/', function(req, res, next){
    console.log("loging in user with email: " + req.body.email)
    User
      .findOne({"email": req.body.email})
      .populate('addresses')
      .exec(function(err, user){
        if (err)
          next(err);
        else{
          if(!user){
            err = new Error("user email does not exist: " + req.body.email);
            next(err);
          }
          else{
            console.log(user);
            if (!user.isValidPassword(req.body.password)){
              console.log('user password not match');
              err = new Error("user password not match");
              next(err);
            }
            else{
              console.log('user login successfully at server');
              user.pwd_hash = undefined;
              user.salt = undefined;
              console.log(user);
              res.json(user);
            }
          }
        }
      });
  }
);

module.exports = router;
