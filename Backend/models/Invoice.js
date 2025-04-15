const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      description: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  paid: { type: Boolean, default: false },
  dueDate: Date,
  issuedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
