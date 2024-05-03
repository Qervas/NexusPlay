// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const router = require('./routes'); // Import the router
const path = require('path');
const mongoUtil = require('./utils/mongoUtil');


io.on('connection', (socket) => {
	console.log('A user connected');
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
	// Additional real-time event handlers can be added here
});

// Initialize MongoDB connection

async function initializeDatabase() {
    await mongoUtil.connectToServer();
    await mongoUtil.loadData(); // Ensure that loadData is exported and properly asynchronous
}

initializeDatabase().then(() => {
    app.use(router);
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
        res.send('Hello, NexusPlay!');
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error("Failed to initialize database or start server:", error);
});
