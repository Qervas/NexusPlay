// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const router = require('./routes');
const path = require('path');
const dotenv = require('dotenv');
const mongoUtil = require('./utils/mongoUtil');

dotenv.config();

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

mongoUtil.connectToServer((err) => {
    if (err) throw err;

    app.use(router);
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
        res.send('Hello, NexusPlay!');
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});