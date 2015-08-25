var mongoose = require('mongoose');

var dealSchema = new mongoose.Schema({title: String,
                                      category: String,
                                      description: String,
                                      price: Number,
                                      pic_link: String,
                                      start_date: Date,
                                      end_date: Date,
                                      max_per_user: Number,
                                      total_quantity: Number,
                                      status: String});


dealSchema.methods.update = function(deal_info){
  if (deal_info.hasOwnProperty('title'))
    this.title = deal_info.title;
  if (deal_info.hasOwnProperty('end_date'))
    this.end_date = deal_info.end_date;
  if (deal_info.hasOwnProperty('total_quantity'))
    this.total_quantity = deal_info.total_quantity;
  

};

mongoose.model('Deal', dealSchema);
module.exports = mongoose.model('Deal');
