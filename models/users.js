var mongoose = require('mongoose');
var uuid = require('node-uuid');
var crypto = require("crypto");

var userTypes = ['customer', 'admin', 'distributor'];

var userSchema = new mongoose.Schema({name: String,
                                      email: {type: String, required: true, unique: true},
                                      wechat_id: String,
                                      phone: String,
                                      salt: {type: String, required: true, default: uuid.v1},
                                      pwd_hash: {type: String, required: true},
                                      addresses:[{type: mongoose.Schema.ObjectId, ref: 'Address'}],
                                      user_type: {type: String, enum: userTypes},
                                      pickup_location: String,
                                      });

userSchema.path('user_type').validate(function(v){

  return userTypes.indexOf(v) >= 0;
}, "user_type unknown");

var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

userSchema.methods.setPassword = function(passwordString) {
    this.pwd_hash = hash(passwordString, this.salt);
};

userSchema.methods.isValidPassword = function(passwordString) {
    return this.pwd_hash === hash(passwordString, this.salt);
};

userSchema.methods.update = function(user_info){
  if (user_info.hasOwnProperty('name'))
    this.name = user_info.name;
  if (user_info.hasOwnProperty('email'))
    this.email = user_info.email;
  if (user_info.hasOwnProperty('wechat_id'))
    this.wechat_id = user_info.wechat_id;
  if (user_info.hasOwnProperty('phone'))
    this.phone = user_info.phone;

  if (user_info.hasOwnProperty('addresses'))
    this.addresses = user_info.addresses;

};

userSchema.methods.deleteAddress = function(address){
  var index = this.addresses.indexOf(address._id);
  if(index > -1)
    this.addresses.splice(index, 1);
};

userSchema.methods.addAddress = function(address){
  this.addresses.push(address._id);
};

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');
