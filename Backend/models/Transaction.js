const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  transactionRef: { type: String, unique: true, required: true },
  gateway: { type: String, required: true },
  status: { type: String, enum: ['initiated', 'success', 'failure'], default: 'initiated' },
  response: mongoose.Schema.Types.Mixed, // stores API response or logs
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
