const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: String,  // Changed from ObjectId to String for Firebase UID
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
    required: false  // Make optional
  },
  merchantRequestId: { 
    type: String, 
    required: false  // Make optional
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
    default: () => new Map()
  }
});

module.exports = mongoose.model('Order', orderSchema); 