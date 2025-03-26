const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class MpesaService {
  constructor() {
    this.consumerKey = process.env.CONSUMER_KEY;
    this.consumerSecret = process.env.CONSUMER_SECRET;
    this.businessShortcode = process.env.BUSINESS_SHORTCODE;
    this.passkey = process.env.PASSKEY;
    this.callbackUrl = process.env.CALLBACK_URL;
    this.baseUrl = 'https://sandbox.safaricom.co.ke';
  }

  // Generate access token
  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      const response = await axios.get(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: {
          Authorization: `Basic ${auth}`
        }
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  // Generate timestamp
  getTimestamp() {
    return new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  }

  // Generate password
  generatePassword() {
    const timestamp = this.getTimestamp();
    const str = this.businessShortcode + this.passkey + timestamp;
    return crypto.createHash('base64').update(str).digest('base64');
  }

  // Initiate STK Push
  async initiateSTKPush(phone, amount, orderId) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = this.getTimestamp();
      const password = this.generatePassword();

      console.log('Initiating STK Push with:', {
        phone,
        amount,
        orderId,
        businessShortcode: this.businessShortcode,
        callbackUrl: this.callbackUrl
      });

      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        {
          BusinessShortCode: this.businessShortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phone,
          PartyB: this.businessShortcode,
          PhoneNumber: phone,
          CallBackURL: this.callbackUrl,
          AccountReference: `ELIMU-${orderId}`,
          TransactionDesc: 'Course Enrollment Payment'
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('STK Push response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error initiating STK push:', error.response?.data || error.message);
      throw new Error(error.response?.data?.errorMessage || 'Failed to initiate M-Pesa payment');
    }
  }
}

module.exports = new MpesaService(); 