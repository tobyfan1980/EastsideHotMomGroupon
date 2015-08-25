var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
                                        date: Date,
                                        deal: {
                                          type: mongoose.Schema.ObjectId,
                                          ref: 'Deal'
                                        },
                                        user: {
                                          type: mongoose.Schema.ObjectId,
                                          ref: 'User'
                                        },
                                        quantity: Number,
                                        pickup_location: {
                                          type: mongoose.Schema.ObjectId,
                                          ref: 'PickupLocation'
                                        },
                                        shipping: {
                                          address: {
                                            type: mongoose.Schema.ObjectId,
                                            ref: 'Address'
                                          },
                                          cost: Number,

                                        },
                                        discount: Number,
                                        status: String
                                      });

mongoose.model('Order', orderSchema);
module.exports = mongoose.model('Order');
