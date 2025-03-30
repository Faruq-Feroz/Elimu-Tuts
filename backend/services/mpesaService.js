const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class MpesaService {
  constructor() {
    this.consumerKey = 'm5FGFAtnJQd39WX1nzV5KeitPzGQuTUak0kQFxCGF8IW5BO0';
    this.consumerSecret = 'lK82z8gEPxKegFHVA83j13zVvU1sCGw5CQTYrGAQ039OGwxjneXPSMtXeeF5TlY9';
    this.businessShortcode = '174379';
    this.passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    this.callbackUrl = 'https://3176-102-135-172-247.ngrok-free.app/api/orders/callback';
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
      console.error('Error getting access token:', error.response?.data || error.message);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  // Generate timestamp
  getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}${second}`;
  }

  // Generate password
  generatePassword() {
    const timestamp = this.getTimestamp();
    const str = this.businessShortcode + this.passkey + timestamp;
    return Buffer.from(str).toString('base64');
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
          Amount: parseInt(amount),
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
      throw error;
    }
  }
  
  // Query STK Push transaction status
  async queryTransactionStatus(checkoutRequestId) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = this.getTimestamp();
      const password = this.generatePassword();
      
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        {
          BusinessShortCode: this.businessShortcode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Query transaction status response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error querying transaction status:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new MpesaService(); 