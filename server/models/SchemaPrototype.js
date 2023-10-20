// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please enter your name']
//   },
//   _id: Number
// });

// const courseSchema = new mongoose.Schema({
//   name: {
//     type: String
//   },
//   _id: Number,
//   skiKids_: Number // Anzahl der freien Plätze
// });

// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course'
//   }
// });

// const User = mongoose.model('User', userSchema);
// const Course = mongoose.model('Course', courseSchema);
// const Booking = mongoose.model('Booking', bookingSchema);