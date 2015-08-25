var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

mongoose.model('restaurants', {name: String});

router.get('/:id', function(req, res, next){
    mongoose.model('restaurants').find({"_id": req.params.id}, function(err, restaurants){
      res.send(restaurants);
    });
});

module.exports = router;
