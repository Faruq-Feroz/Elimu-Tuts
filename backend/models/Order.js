const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  phone: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  mpesaCode: { 
    type: String, 
    default: '' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending' 
  },
  checkoutRequestId: { 
    type: String, 
    required: true 
  },
  merchantRequestId: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  completedAt: { 
    type: Date 
  },
  updatedAt: { 
    type: Date 
  },
  failureReason: { 
    type: String 
  },
  metadata: {
    type: Map,
    of: String,
    default: {}
  }
});

module.exports = mongoose.model('Order', orderSchema); 