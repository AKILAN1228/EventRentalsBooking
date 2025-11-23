// // // backend/models/Booking.js
// // const mongoose = require('mongoose');
// // const Schema = mongoose.Schema;

// // const bookingSchema = new mongoose.Schema({
// //     user: {
// //         type: Schema.Types.ObjectId,
// //         ref: 'User',
// //         required: true
// //     },
// //     products: [
// //         {
// //             product: {
// //                 type: Schema.Types.ObjectId,
// //                 ref: 'Product',
// //                 required: true
// //             },
// //             quantity: {
// //                 type: Number,
// //                 required: true,
// //                 default: 1
// //             },
// //             pricePerItem: {
// //                 type: Number,
// //                 required: true
// //             }
// //         }
// //     ],
// //     totalPrice: {
// //         type: Number,
// //         required: true
// //     },
// //     eventDate: {
// //         type: Date,
// //         required: true
// //     },
// //     status: {
// //         type: String,
// //         enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
// //         default: 'Pending'
// //     },
// //     customerName: { type: String, required: true },
// //     customerPhone: { type: String, required: true },
// //     deliveryAddress: { type: String, required: true },
// //     locationLink: { type: String },
// // }, { timestamps: true });

// // const Booking = mongoose.model('Booking', bookingSchema);
// // module.exports = Booking;
// // backend/models/Booking.js

// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   userEmail: { type: String, required: true },
//   userName: { type: String },
//   mobile: { type: String, required: true },
//   address: { type: String, required: true },
//   locationLink: { type: String },
  
//   eventName: { type: String, required: true },
//   fromDate: { type: String, required: true },
//   toDate: { type: String, required: true },
//   totalDays: { type: Number, required: true },
  
//   // Namma anupura products list
//   products: [
//     {
//       id: String,
//       name: String,
//       quantity: Number,
//       price: String
//     }
//   ],
  
//   totalAmount: { type: Number, required: true },
//   status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled
// }, { timestamps: true }); // Automatic-a time create aagum

// module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  tamilName: String,
  price: Number,
  quantity: Number,
  category: String
});

const bookingSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  eventType: String,
  eventName: String,
  eventTamilName: String,
  products: [productSchema],
  fullName: String,
  address: String,
  locationLink: String,
  mobile: String,
  fromDate: String,
  toDate: String,
  totalDays: Number,
  total: Number,
  deliveryCharge: Number,
  finalTotal: Number,
  status: { type: String, default: 'Pending' },
  timestamp: String,
  district: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);