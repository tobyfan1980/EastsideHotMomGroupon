var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Deal = require('../models/deals');
var Order = require('../models/orders');

/* GET users listing. */
router.get('', function(req, res, next) {
  var user_id = null;
  var deal_id = null;
  var order_id = null;
  console.log(req.query);
  if ('userId' in req.query){
    user_id = req.query['userId'];
  }
  if('dealId' in req.query){
    deal_id = req.query['dealId'];
  }
  if('orderId' in req.query ){
    order_id = req.query['orderId'];
  }

  if(user_id && deal_id && !order_id){
    Order.find({user: user_id, deal: deal_id}, function(err, orders){
      if(err){
        console.log(err);
        next(err);
      }
      else{
        var sum = 0;
        orders.forEach(function(order){
          sum += order.quantity;
        })
        res.json({
          order_count: orders.length,
          order_units: sum
        });
      }

    });
  }
  else if(!user_id && deal_id && !order_id){
    Order.find({deal: deal_id}, function(err, orders){
      if (err) {
        console.log(err);
        next(err);
      }
      else {
        var sum_quantity = 0;
        orders.forEach(function(order){sum_quantity += order.quantity;});
        res.json({
          order_count: orders.length,
          total_order_units: sum_quantity
        });
      }
    });
  }

});



module.exports = router;
