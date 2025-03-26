const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createOrder,
  handleCallback,
  getUserOrders
} = require('../controllers/orderController');

// Create order and initiate M-Pesa payment
router.post('/', auth, createOrder);

// Handle M-Pesa callback (no auth required as it's called by M-Pesa)
router.post('/callback', handleCallback);

// Get user's orders
router.get('/my-orders', auth, getUserOrders);

module.exports = router; 