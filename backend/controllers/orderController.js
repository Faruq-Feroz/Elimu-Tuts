const Order = require('../models/Order');
const Course = require('../models/Course');
const mpesaService = require('../services/mpesaService');

// Create order and initiate M-Pesa payment
exports.createOrder = async (req, res) => {
  try {
    console.log('Creating order with data:', req.body);
    const { courseId, phone } = req.body;
    const userId = req.user.uid; // From Firebase auth middleware

    console.log('User ID:', userId);
    console.log('Course ID:', courseId);
    console.log('Phone:', phone);

    // Get course details
    const course = await Course.findById(courseId);
    if (!course) {
      console.log('Course not found:', courseId);
      return res.status(404).json({ error: 'Course not found' });
    }

    console.log('Course found:', course);

    // Create order
    const order = await Order.create({
      user: userId,
      course: courseId,
      phone,
      amount: course.price,
      status: 'pending'
    });

    console.log('Order created:', order);

    // Initiate M-Pesa payment
    try {
      console.log('Initiating M-Pesa payment with:', {
        phone,
        amount: course.price,
        orderId: order._id
      });

      const stkResponse = await mpesaService.initiateSTKPush(
        phone,
        course.price,
        order._id
      );

      console.log('M-Pesa STK response:', stkResponse);

      // Update order with M-Pesa checkout request ID
      order.checkoutRequestId = stkResponse.CheckoutRequestID;
      await order.save();

      res.status(201).json({
        message: 'Order created successfully',
        order,
        stkResponse
      });
    } catch (mpesaError) {
      console.error('M-Pesa error details:', {
        message: mpesaError.message,
        response: mpesaError.response?.data,
        status: mpesaError.response?.status
      });
      
      // Update order status to failed
      order.status = 'failed';
      order.failureReason = mpesaError.message;
      await order.save();
      
      res.status(500).json({ 
        error: 'Failed to initiate M-Pesa payment',
        details: mpesaError.message,
        mpesaError: mpesaError.response?.data
      });
    }
  } catch (error) {
    console.error('Error in createOrder:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message,
      fullError: error.response?.data
    });
  }
};

// Handle M-Pesa callback
exports.handleCallback = async (req, res) => {
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

    // Find order by checkout request ID
    const order = await Order.findOne({ checkoutRequestId: CheckoutRequestID });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (ResultCode === 0) {
      // Payment successful
      order.status = 'completed';
      order.completedAt = new Date();
      order.mpesaCode = stkCallback.CallbackMetadata?.Item?.find(
        item => item.Name === 'MpesaReceiptNumber'
      )?.Value;
      await order.save();

      // TODO: Enroll student in course
      // Add logic to enroll the student in the course here
    } else {
      // Payment failed
      order.status = 'failed';
      order.failureReason = ResultDesc;
      await order.save();
    }

    res.status(200).json({ message: 'Callback processed successfully' });
  } catch (error) {
    console.error('Error processing callback:', error);
    res.status(500).json({ error: 'Failed to process callback' });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.uid;
    const orders = await Order.find({ user: userId })
      .populate('course')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}; 