var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Deal = require('../models/deals');
var Order = require('../models/orders');
var PickupLocation = require('../models/pickup_locations');
var Address = require('../models/addresses');
var sendgrid = require('sendgrid')('tobyfan', 'inter1908');


/* GET users listing. */
router.get('/', function(req, res, next) {
  Deal.find({}).sort({start_date: -1}).exec(function(err, deals){
    if (err) {
      console.log(err);
      next(err);
    }
    else {
      res.json(deals);
    }
  });
});

router.get('/:dealId', function(req, res, next){
  console.log("finding deal by id: " + req.params.dealId);
  Deal.findOne({'_id': req.params.dealId}, function(err, deal){
    if (err){
      console.log(err);
      next(err);

    }
    else{
      console.log(deal);
      res.json(deal)
    }
  });
});

router.post('/', function(req, res, next){

  var dealData = req.body;
  console.log(dealData);

  if(dealData.action == "create"){

    Deal.create(dealData, function(err, deal){
      if (err){
        console.log(err);
        next(err);
      } 
      else{
        console.log(deal);
        res.json(deal);
      }
    });
  }
  else if(dealData.action == "update"){
    Deal.findById(dealData.deal_info._id, function(err, deal){
      if(err){
        console.log(err);
        next(err);
      }
      else{
        Order.find({deal: deal._id}, function(err, orders){
          if (err) {
            console.log(err);
            next(err);
          }
          else {
            var sum_quantity = 0;
            orders.forEach(function(order){sum_quantity += order.quantity;});
            if(sum_quantity > dealData.deal_info.total_quantity){
              console.log("cannot update deal because the new total quantity is less than ordered quantity");
              next(new Error("cannot update deal because the new total quantity is less than ordered quantity"));
            }
            deal.update(dealData.deal_info);
            deal.save(function(err, deal_data){
              if(err){
                console.log(err);
                next(err);

              }
              else{
                res.json(deal_data);
              }
            });
          }
        });
      }

    })
  }
});

router.post('/notifyArrived/', function(req, res, next){
  var dealData = req.body;
  console.log(dealData);

  Deal.findById(dealData.id, function(err, deal){
    if (err) {
      console.log(err);
      next(err);
    }
    else{
      console.log(deal);
      PickupLocation
      .find({})
      .populate('user')
      .exec(function(err, locations){
        if (err) {
          console.log(err);
          next(err);
        }
        else {
          var email = new sendgrid.Email();
          var to_emails = [];
          locations.forEach(function(location){
            to_emails.push( location.user.email);
          });
          email.setTos(to_emails);
          email.setFrom('tobyfan1980@gmail.com');
          email.setFromName('Toby Xu');
          email.setSubject('EHMG deal arrived:' + deal.title);
          email.setText('Hi Distributors, the deal has arrived, please come to pickup');

          console.log('send email to Distributors');
          sendgrid.send(email, function(err, json){
            if(err){
              console.log("failed to send email");
              console.log(err);

            }

            console.log('update order status');
            Order.update({deal: deal._id}, {status: 'arrived'}, {upsert:false}, function(err){
              if(err){
                console.log('failed to update order status');
                console.log(err);
                next(err);
              }
              res.json({});
            });

          });

        }
      });
    }
  });
});

router.post('/notifyReadyForPickup/', function(req, res, next){
  var dealData = req.body;
  console.log(dealData);

  SendEmail = function(emailBody, toEmails){
    
    toEmails.forEach(function(toEmail){
      var email = new sendgrid.Email();
      
      email.addTo(toEmail.email);
      //change to actual admin's email
      email.setFrom('tobyfan1980@gmail.com');
      email.setFromName('Toby Xu');
      email.setSubject('EHMG deal arrived:');

      email.setHtml("<p>Dear " + toEmail.name + ":</p>" + emailBody);

      console.log('send email to customers');
      sendgrid.send(email, function(err, json){
        if(err){
          console.log("failed to send email to:" + toEmail.email);
          console.log(err);

        }
        else{
          console.log("email sent to customer: " + toEmail.name);
        }

      });
    });
  };

  var filter = {deal: dealData.id, pickup_location: dealData.pickup_location};

  Order.find(filter)
  .populate('user')
  .populate('deal', 'title')
  .exec(function(err, orders){
    if (err) {
      console.log(err);
      next(err);
    }
    else if(orders.length == 0){
      console.log("no orders");
      res.json({});
    }
    else{
      dealData.pickup_msg = "<p>" + dealData.pickup_msg + "</p>" + "<br><p>Eastside Hot Mon Groupon</p>";
      var emailBody = '<p>Your order for <b><i>' + orders[0].deal.title + '</i></b> is ready for pickup. </p>';
      var toEmails = [];
      orders.forEach(function(order){
        toEmails.push({name: order.user.name, email: order.user.email});
      });

      console.log(toEmails);

      if(dealData.use_distributor_address){
        PickupLocation.findById(dealData.pickup_location)
        .populate('user')
        .exec(function(err, location){
          if(err){
            console.log(err);
            SendEmail(emailBody + dealData.pickup_msg, toEmails);  
          }
          else{
            if (location.user.addresses){
              Address.findById(location.user.addresses[0], function(err, address){
                if(err){
                  console.log(err);
                  emailBody += "<p>PickupLocation: " + location.community + "</p>";
                }
                else{
                  emailBody += "<p>Pickup location is: " + address.street + " " + address.city + " " + address.state + " " + address.zipcode + "</p>";
                  
                }

                SendEmail(emailBody + dealData.pickup_msg, toEmails);
              });
            }
            else{
              emailBody += "<p>PickupLocation: " + location.community + "</p>";
              SendEmail(emailBody + dealData.pickup_msg, toEmails);  
            }
            
          }

        });
      }
      else{
        SendEmail(emailBody + dealData.pickup_msg, toEmails);
      }


      console.log('update order status');
      Order.update(filter, {status: 'ready_for_pickup'}, {upsert:false}, function(err){
        if(err){
          console.log('failed to update order status');
          console.log(err);
          next(err);
        }
        res.json({});
      });
     
    }
  });
  
});

module.exports = router;
