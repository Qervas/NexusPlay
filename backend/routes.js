// routes.js
const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();
// MongoDB setup
const uri = process.env.MONGODB_URI;
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getGamesRouteHandler = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('nexusplay');
        const collection = db.collection('games');

        const games = await collection.find({}).toArray();
        console.log('Games data retrieved successfully:', games);
        res.json(games);
    } catch (error) {
        console.error("Failed to retrieve games data from MongoDB:", error);
        res.status(500).json({ error: 'Games data could not be loaded from the database' });
    } finally {
        await client.close();
    }
};

router.get('/api/games', getGamesRouteHandler);

module.exports = router;
