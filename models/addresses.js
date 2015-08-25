var mongoose = require('mongoose');
var addressSchema = new mongoose.Schema({
                                        street: String,
                                        city: String,
                                        zipcode: String,
                                        state: String,
                                        country: String,
                                        is_default: {type: Boolean, default: false},
                                        user: {
                                          type: mongoose.Schema.ObjectId,
                                          ref: 'User'
                                        },

                                      });
addressSchema.methods.update = function(address_info){
  if (address_info.hasOwnProperty('street'))
    this.street = address_info.street;
  if (address_info.hasOwnProperty('city'))
    this.city = address_info.city;
  if (address_info.hasOwnProperty('zipcode'))
    this.zipcode = address_info.zipcode;
  if (address_info.hasOwnProperty('state'))
    this.state = address_info.state;


  if (address_info.hasOwnProperty('country'))
    this.country = address_info.country;

    if (address_info.hasOwnProperty('is_default'))
      this.is_default = address_info.is_default;
};

mongoose.model('Address', addressSchema);
module.exports = mongoose.model('Address');
