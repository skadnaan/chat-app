import 'dotenv/config';
import cloudinary from './lib/cloudinary.js';
console.log('Cloudinary config:', cloudinary.config());

import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// Express App + HTTP Server
const app = express();
const server = http.createServer(app);

// ✅ Socket.IO Server
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// ✅ Online Users Map
const onlineUsers = new Map();

// ✅ Socket Connection Handler
io.on('connection', (socket) => {
  const userId = socket.handshake.auth?.userId;

  if (!userId) {
    console.log('⚠️ User connected without userId → disconnecting');
    socket.disconnect();
    return;
  }

  console.log(`✅ User Connected: ${userId}`);

  onlineUsers.set(String(userId), socket.id);

  // Send updated online users to all clients
  io.emit('getOnlineUsers', [...onlineUsers.keys()]);

  socket.on('disconnect', () => {
    console.log(`❌ User Disconnected: ${userId}`);
    onlineUsers.delete(String(userId));
    io.emit('getOnlineUsers', [...onlineUsers.keys()]);
  });
});

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// ✅ Test Route
app.get('/api/status', (req, res) => res.send('✅ Server Running'));

// ✅ API Routes
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

// ✅ Connect DB & Start Server
await connectDB();
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`🚀 Server running at port ${PORT}`));
