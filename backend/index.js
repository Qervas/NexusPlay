// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');
const router = require('./routes'); // Import the router
const path = require('path');
const mongoUtil = require('./utils/mongoUtil');

// Configure CORS
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`  // This should match the URL of your frontend
}));

io.on('connection', (socket) => {
	console.log('A user connected');
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
	// Additional real-time event handlers can be added here
});

async function initializeDatabase() {
    try {
        await mongoUtil.connectToServer();
        console.log("Database connection successfully established.");
        await mongoUtil.loadData();
        console.log("Initial data loaded successfully.");
    } catch (error) {
        console.error("Failed to initialize the database:", error);
        throw new Error("Database initialization failed, server cannot start.");
    }
}

initializeDatabase().then(() => {
	app.use(express.json());
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
