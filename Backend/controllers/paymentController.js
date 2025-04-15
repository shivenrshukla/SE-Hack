const Payment = require('./models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { userId, amount, method, currency } = req.body;

    const newPayment = new Payment({
      userId,
      amount,
      method,
      currency
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating payment' });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('userId');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('userId');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payment' });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });

    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating payment' });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Payment not found' });

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting payment' });
  }
};
