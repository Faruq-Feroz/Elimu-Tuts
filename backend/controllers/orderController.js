const Order = require('../models/Order');
const Course = require('../models/Course');
const User = require('../models/User');
const mpesaService = require('../services/mpesaService');

// Create order and initiate M-Pesa payment
exports.createOrder = async (req, res) => {
  try {
    console.log('Creating order with data:', req.body);
    const { courseId, phone } = req.body;
    const userId = req.user.uid; // From Firebase auth middleware

    // Input validation
    if (!courseId || !phone) {
      return res.status(400).json({ error: 'Course ID and phone number are required' });
    }

    // Phone number validation - ensure format starts with 254
    if (!phone.match(/^254[0-9]{9}$/)) {
      return res.status(400).json({ error: 'Invalid phone number format. Must start with 254 followed by 9 digits' });
    }

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

    // Create new Order instance
    const order = new Order({
      user: userId, // Store Firebase UID as string
      course: courseId,
      phone,
      amount: course.price,
      status: 'pending'
    });

    // Save the order to get an _id
    await order.save();
    console.log('Order created with ID:', order._id);

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
      order.merchantRequestId = stkResponse.MerchantRequestID;
      await order.save();

      res.status(201).json({
        message: 'Payment initiated successfully. Please check your phone to complete the transaction.',
        order: {
          id: order._id,
          status: order.status,
          course: {
            id: course._id,
            title: course.title,
            price: course.price
          }
        },
        checkoutRequestId: stkResponse.CheckoutRequestID
      });
    } catch (mpesaError) {
      console.error('M-Pesa error details:', {
        message: mpesaError.message,
        response: mpesaError.response?.data,
        status: mpesaError.response?.status
      });
      
      // Still save the order but with failed status
      order.status = 'failed';
      order.failureReason = mpesaError.response?.data?.errorMessage || mpesaError.message;
      await order.save();
      
      res.status(500).json({ 
        error: 'Failed to initiate M-Pesa payment',
        details: mpesaError.response?.data?.errorMessage || mpesaError.message
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
      details: error.message
    });
  }
};

// Handle M-Pesa callback
exports.handleCallback = async (req, res) => {
  try {
    console.log('Received M-Pesa callback:', JSON.stringify(req.body));
    
    // Ensure we have valid callback data
    const { Body } = req.body;
    if (!Body) {
      console.error('Invalid callback data received: Missing Body');
      return res.status(200).json({ 
        ResultCode: 0,
        ResultDesc: "Callback received but data format invalid"
      });
    }
    
    // Handle different callback formats (STK callback vs C2B callback)
    let checkoutRequestId, resultCode, resultDesc, transactionId;
    
    if (Body.stkCallback) {
      // STK Push callback
      const { stkCallback } = Body;
      checkoutRequestId = stkCallback.CheckoutRequestID;
      resultCode = stkCallback.ResultCode;
      resultDesc = stkCallback.ResultDesc;
      
      // Find order by checkout request ID
      const order = await Order.findOne({ checkoutRequestId });
      if (!order) {
        console.error(`Order not found for CheckoutRequestID: ${checkoutRequestId}`);
        return res.status(200).json({ 
          ResultCode: 0,
          ResultDesc: "Order not found but acknowledged" 
        });
      }

      // Update the order based on the callback result
      order.updatedAt = new Date();
      
      if (resultCode === 0) {
        // Payment successful
        console.log('Payment successful for order:', order._id);
        
        // Extract M-Pesa receipt number and other metadata from callback
        let mpesaCode = '';
        try {
          const callbackMetadata = stkCallback.CallbackMetadata;
          if (callbackMetadata && callbackMetadata.Item) {
            // Process each metadata item
            callbackMetadata.Item.forEach(item => {
              if (item.Name === 'MpesaReceiptNumber' && item.Value) {
                mpesaCode = item.Value;
              }
              
              // Save all metadata items
              if (item.Name && item.Value !== undefined) {
                order.metadata.set(item.Name, item.Value.toString());
              }
            });
          }
        } catch (metadataError) {
          console.error('Error extracting M-Pesa metadata:', metadataError);
        }
        
        // Update order with success data
        order.status = 'completed';
        order.mpesaCode = mpesaCode;
        order.completedAt = new Date();
        await order.save();

        // Enroll student in course - this would be implemented based on your business logic
        try {
          // Add logic here to enroll the student in the course
          console.log(`User ${order.user} enrolled in course ${order.course}`);
        } catch (enrollError) {
          console.error('Error enrolling student:', enrollError);
        }
      } else {
        // Payment failed
        console.log(`Payment failed for order ${order._id}. Reason: ${resultDesc}`);
        order.status = 'failed';
        order.failureReason = resultDesc;
        await order.save();
      }
    } else if (Body.ResultCode !== undefined) {
      // Direct C2B callback
      resultCode = Body.ResultCode;
      resultDesc = Body.ResultDesc;
      transactionId = Body.TransID;
      
      // For C2B callbacks, we might need to match using a different field
      // This depends on your implementation - you might use account reference or transaction ID
      console.log('Received C2B callback - implementation needed');
    } else {
      console.error('Unrecognized callback format');
      return res.status(200).json({ 
        ResultCode: 0,
        ResultDesc: "Unrecognized callback format but acknowledged" 
      });
    }

    // Always return success to M-Pesa to acknowledge receipt
    res.status(200).json({ 
      ResultCode: 0,
      ResultDesc: "Callback processed successfully" 
    });
  } catch (error) {
    console.error('Error processing callback:', error);
    // Still return success to M-Pesa to prevent retries
    res.status(200).json({ 
      ResultCode: 0,
      ResultDesc: "Error occurred but callback acknowledged" 
    });
  }
};

// Check payment status
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { checkoutRequestId } = req.params;
    
    if (!checkoutRequestId) {
      return res.status(400).json({ error: 'Checkout request ID is required' });
    }
    
    // Find order by checkout request ID
    const order = await Order.findOne({ checkoutRequestId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // If order is already completed or failed, return its status
    if (order.status === 'completed') {
      return res.status(200).json({
        status: 'completed',
        mpesaCode: order.mpesaCode || null,
        message: 'Payment completed successfully'
      });
    }
    
    if (order.status === 'failed' && order.failureReason) {
      return res.status(200).json({
        status: 'failed',
        message: `Payment failed: ${order.failureReason}`
      });
    }
    
    // If order is still pending, query M-Pesa for status
    try {
      const statusResponse = await mpesaService.queryTransactionStatus(checkoutRequestId);
      console.log('Status query response:', statusResponse);
      
      // If we get a success response or a specific error that indicates a transaction was found
      if (statusResponse.ResultCode === 0 || 
          (statusResponse.errorCode === '500.001.1001' && 
           statusResponse.errorMessage.includes('Transaction completed'))) {
        
        // Update order to completed status
        order.status = 'completed';
        order.completedAt = new Date();
        await order.save();
        
        return res.status(200).json({
          status: 'completed',
          message: 'Payment completed successfully'
        });
      } 
      // If transaction is explicitly marked as failed
      else if (statusResponse.ResultCode === 1) {
        order.status = 'failed';
        order.failureReason = statusResponse.ResultDesc || 'Transaction failed';
        await order.save();
        
        return res.status(200).json({
          status: 'failed',
          message: statusResponse.ResultDesc || 'Payment failed'
        });
      }
      // For all other cases, keep as pending
      else {
        return res.status(200).json({
          status: 'pending',
          message: 'Payment is still being processed'
        });
      }
    } catch (queryError) {
      console.error('Error querying payment status:', queryError);
      
      // Check if error response indicates success
      if (queryError.response?.data?.errorCode === '500.001.1001' && 
          queryError.response?.data?.errorMessage?.includes('Transaction completed')) {
        
        // If the error actually indicates a successful transaction
        order.status = 'completed';
        order.completedAt = new Date();
        await order.save();
        
        return res.status(200).json({
          status: 'completed',
          message: 'Payment completed successfully'
        });
      }
      
      // Otherwise, keep status as pending
      return res.status(200).json({
        status: 'pending',
        message: 'Unable to determine payment status, please check again later'
      });
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
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