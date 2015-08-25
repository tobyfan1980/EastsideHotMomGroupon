var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');
var Address = require('../models/addresses');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query);


  User.find(req.query, function(err, users){
    if (err) next(err);
    else{
      console.log(users);
      users.forEach(function(user){
        user.pwd_hash = undefined;
        user.salt = undefined;
      });

      res.json(users);

    }
  });

});

router.get('/:userId', function(req, res, next) {


  User.findOne({"_id": req.params.userId})
  .populate('addresses')
  .exec(function(err, user){
    if (err) next(err);
    else{
      res.json(user);
    }
  });

});

router.post('/', function(req, res, next){
  var action = req.body.action;
  var user_info = req.body.user_info;

  console.log("req user");
  console.log(req.body.user_info);

  if (action == 'create'){
    console.log("finding user with email: " + user_info.email)
    User.findOne({"email": user_info.email}, function(err, user){
      if (err) next (err);
      else{
        if (user){
          console.log("cannot create user since this user already exist");
          console.log(user);
          err = new Error("user already exist");
          next(err);
        }
        else{
          console.log('create user to db:' + user_info.name);
          var user = new User(user_info);
          user.setPassword(user_info.password);
          user.save(function(err, user_data){
            if(err){
              console.log(err);
              next(err);
            }
            else{
              user_data.pwd_hash = undefined;
              user_data.salt = undefined;
              res.json(user_data);
            }

          });
        }
      }
    });
  }
  else if(action=='update'){
    User.findOne({"_id": user_info._id}, function(err, user){
      if (err)
        next (err);

      if (!user){
        next(new Error("user not found"));
      }

      if(user_info.hasOwnProperty('update_user_pwd')){
        if(!user.isValidPassword(user_info.update_user_pwd.old_password))
          next(new Error("cannot update user because of incorrect old password"));
        user.setPassword(user_info.update_user_pwd.new_password);
      }

      user.update(user_info);
      user.save(function(err, user_data){
        if(err)
          next(err);
        else{
          user_data.pwd_hash = undefined;
          user_data.salt = undefined;
          res.json(user_data);
        }
      });
    });

  }

});

module.exports = router;
