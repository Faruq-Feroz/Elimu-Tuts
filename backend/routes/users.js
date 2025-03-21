// routes/users.js

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/firebaseAuth');
const { createOrUpdateUser, getCurrentUser } = require('../controllers/userController');

// Protected routes (require authentication)
router.post('/create-or-update', verifyToken, createOrUpdateUser);
router.get('/current-user', verifyToken, getCurrentUser);

module.exports = router;