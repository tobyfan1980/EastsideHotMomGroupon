var mongoose = require('mongoose');
var pickupLocationSchema = new mongoose.Schema({
                                        community: {type: String, unique: true, required: true},
                                        user: {
                                          type: mongoose.Schema.ObjectId,
                                          ref: 'User'
                                        },

                                      });

mongoose.model('PickupLocation', pickupLocationSchema, 'pickup_locations');
module.exports = mongoose.model('PickupLocation');
