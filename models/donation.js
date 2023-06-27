const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  donorName: String,
  amount: {
    type: Number,
    integer: true
  },
  message: String,
  fundraiserId: {
    type: mongoose.Schema.Types.Number,
    ref: 'Fundraiser'
  }
})
const Donation = mongoose.model('donations', donationSchema);
module.exports = Donation;