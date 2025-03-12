const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
