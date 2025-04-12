require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
//const analysisRoutes = require('./routes/analysisRoutes');
//const paymentRoutes = require('./routes/paymentRoutes');
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Routes
app.use('/api/users', userRoutes);
//app.use('/api/analysis', analysisRoutes);
//app.use('/api/payment',paymentRoutes);
// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
