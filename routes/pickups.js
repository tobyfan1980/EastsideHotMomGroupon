var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PickupLocation = require('../models/pickup_locations');

/* GET pickup locations listing. */
router.get('/', function(req, res, next) {
  console.log('get pickup locations');
  PickupLocation.count({}, function(err, location_count){
    if(err){
      console.log(err);
      next(err);
    }
    else if(location_count > 0){
      filter = {};
      if ('userId' in req.query){
        filter.user = req.query.userId;
      }
      console.log(filter);

      PickupLocation
      .find(filter)
      .populate('user')
      .exec(function(err, locations){
        if (err) {
          console.log(err);
          next(err);
        }
        else {
          console.log(locations);
          res.json(locations);
        }
      });
    }
    else {
      console.log("no pickup locations");
      res.json([]);
    }
  })

});

// Add a pickup location
router.post('/', function(req, res, next){
  var locationData = req.body;
  console.log(locationData);

  PickupLocation.create(locationData, function(err, location){
    if (err) next(err);
    else{
      res.json(location);
    }
  });

});

// Delete a pickup location
router.delete('/:id', function(req, res, next){
  PickupLocation.remove({_id: req.params.id}, function(err, location){
    if(err)
      next(err);
    else{
      res.json(location);
    }
  });

});


module.exports = router;
