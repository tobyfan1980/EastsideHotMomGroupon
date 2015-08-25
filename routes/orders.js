var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Deal = require('../models/deals');
var Order = require('../models/orders');
var User = require('../models/users');

/* GET orders listing. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  var filter = {};
  
  if ('userId' in req.query){
    filter.user = req.query.userId;
  }
  if ('dealId' in req.query){
    filter.deal = req.query.dealId;
  }
  if ('locationId' in req.query){
    filter.pickup_location = req.query.locationId;
  }
    

  console.log("finding order by ID:");
  console.log(filter);

  Order
  .find(filter)
  .populate('user', 'name wechat_id')
  .exec(function(err, orders){
    if (err) {
      console.log(err);
      next(err);
    }
    else {
      console.log(orders);
      res.json(orders);
    }
  });
});

router.get('/:orderId', function(req, res, next){
  console.log("finding order by id: " + req.params.orderId);
  Order
  .findOne({'_id': req.params.orderId})
  .populate('user', 'name wechat_id')
  .exec(function(err, order){
    if (err){
      console.log(err);
      next(err);
    }
    else{
      console.log(order);
      res.json(order)
    }
  });
});

router.post('/', function(req, res, next){
  console.log(req.body);
  if(req.body.action == "create"){
    var orderData = req.body.order;
    console.log(orderData);

    Order.create(orderData, function(err, order){
      if (err) next(err);
      else{
        console.log(order);
        res.json(order);
      }
    });
  }
  else if(req.body.action=="update"){
    console.log("update order");
    console.log(req.body);
    Order.update({_id:req.body.order.id}, {status: req.body.order.status}, {upsert:false}, function(err, order){
      if(err){
        console.log(err);
        next(err);
      }
      else{
        res.json(order);
      }

    });
  }
  else{
    console.log("unknown order post action: " + req.body.action);

    next(new Error("unknown order post action:"+req.body.action));
  }


});


module.exports = router;
