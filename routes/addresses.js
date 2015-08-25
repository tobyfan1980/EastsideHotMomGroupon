var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Address = require('../models/addresses');
var User = require('../models/users');


/* GET addresss listing. */
router.get('/', function(req, res, next) {
  var address_id = req.param('addressId');
  var filter = {};
  if(address_id)
    filter['address_id'] = address_id;

  Address.find({"address_id": address_id}, function(err, addresses){
    if (err) next(err);
    else{
      res.json(addresses);
    }
  });

});

router.post('/', function(req, res, next){
  var action = req.body.action;
  var address_info = req.body.address_info;

  console.log("req address");
  console.log(req.body.address_info);

  if (action == 'create'){
    Address.find(address_info, function(err, addresss){
      if (err) next (err);
      else{
        if (addresss.length){
          console.log("cannot create address since this address already exist");
          console.log(addresss);
          err = new Error("address already exist");
          next(err);
        }
        else{
          console.log('create address to db, ' + JSON.stringify(address_info));
          var address = new Address(address_info);

          address.save(function(err, address_data){
            if(err)
              next(err);
            else{
              User.findById(address_data.user, function(err, user){
                if (err)
                  next (err);

                if (!user){
                  next(new Error("user not found"));
                }
                user.addresses.push(address_data._id);
                user.save(function(err){
                  if(err)
                    next(err);
                });
              });
              res.json(address_data);
            }

          });
        }
      }
    });
  }
  else if(action=='update'){
    Address.findOne({'_id': address_info._id}, function(err, address){
      if (err)
        next (err);

      if (!address){
        next(new Error("address not found"));
      }

      address.update(address_info);
      address.save(function(err, address_data){
        if(err) next(err);
        else {
          res.json(address_data);
        }
      });
    });

  }

});

router.delete('/:addressId', function(req, res, next){
  console.log("delete addres req: " + req.params.addressId);
  console.log(req.params);
  Address.findById(req.params.addressId, function(err, address){
    if(err)
    {
      console.log("find address err:" + err);
      next(err);
    }
    User.findById(address.user, function(err, user){
      if(err)
        next(err);

      console.log('remove address from user');
      user.deleteAddress(address);
      user.save(function(err, user_data){
        if (err)
          next(err);

        //set new default address
        if(address.is_default && user.addresses.length){
          Address.findById(user.addresses[0], function(err, default_address){
            if(err){
              console.log("find address failed, this user will have no default address")

            }
            else{
              default_address.is_default = true;
              default_address.save(function(err){
                if (err)
                  console.log("find address failed, this user will have no default address")
              });
            }
          });
        }

        console.log('remove address from db');
        address.remove(function(err){
          //if this happens, there will be inconsistency between user and address
          if (err){
            console.log("remove address failed, inconsistency between user and address, orphan address exists")
            next(err);
          }
          else{
            res.send(200);
          }

        });
      });
    });
  });
});

module.exports = router;
