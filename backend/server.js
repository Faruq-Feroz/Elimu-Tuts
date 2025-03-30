const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const noteRoutes = require('./routes/notes');
const orderRoutes = require('./routes/orders');
const tutorRoutes = require('./routes/tutor');

// Initialize Express
const app = express();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',  // Local Vite dev server
  'http://localhost:3000',  // Local React dev server
  process.env.FRONTEND_URL, // Production frontend (Vercel)
  'https://elimu-tuts.vercel.app', // Vercel deployment
  'https://elimu-tuts-git-main-hassan-faruqs-projects.vercel.app' // Vercel preview deployments
];

// First CORS middleware - try to keep this for backward compatibility
app.use(cors({
  origin: 'https://elimu-tuts.vercel.app', // Specific origin for credentials
  credentials: true  // Allow credentials
}));

// Second CORS middleware to ensure headers are correctly set
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Use specific origin instead of wildcard when credentials are involved
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', 'https://elimu-tuts.vercel.app');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = new Server(server, {
  cors: {
    origin: 'https://elimu-tuts.vercel.app', // Specific origin for credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }
});

// DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elimu-tuts')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tutor', tutorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Server error', 
    details: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Home route
app.get('/', (req, res) => {
  res.send('Elimu Tuts API is running');
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle room joining
  socket.on('join-room', ({ roomId, username }) => {
    socket.join(roomId);
    
    // Add username to socket data
    socket.data.username = username;
    socket.data.roomId = roomId;
    
    // Notify others that user joined
    socket.to(roomId).emit('user-joined', username);
    
    // Send updated user list to all clients in the room
    const roomUsers = getRoomUsers(roomId);
    io.to(roomId).emit('room-users', roomUsers);
    
    console.log(`${username} joined room: ${roomId}`);
  });

  // Handle room leaving
  socket.on('leave-room', ({ roomId }) => {
    const username = socket.data.username;
    socket.leave(roomId);
    
    // Notify others that user left
    socket.to(roomId).emit('user-left', username);
    
    // Send updated user list to all clients in the room
    const roomUsers = getRoomUsers(roomId);
    io.to(roomId).emit('room-users', roomUsers);
    
    console.log(`${username} left room: ${roomId}`);
  });

  // Handle note updates
  socket.on('update-note', ({ roomId, content }) => {
    // Broadcast to others in the room
    socket.to(roomId).emit('note-updated', content);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    const username = socket.data.username;
    
    if (roomId && username) {
      // Notify room members that user has left
      socket.to(roomId).emit('user-left', username);
      
      // Send updated user list
      const roomUsers = getRoomUsers(roomId);
      io.to(roomId).emit('room-users', roomUsers);
      
      console.log(`${username} disconnected from room: ${roomId}`);
    }
    
    console.log('User disconnected:', socket.id);
  });
});

// Helper function to get users in a room
function getRoomUsers(roomId) {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room) return [];
  
  const users = [];
  for (const socketId of room) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket && socket.data.username) {
      users.push(socket.data.username);
    }
  }
  
  return users;
}

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
