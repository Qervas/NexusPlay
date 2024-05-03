// scripts/loadGamesToMongo.js
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();
const uri = process.env.MONGODB_URI;  // Ensure your MongoDB URI is in the environment variables
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function loadData() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        const database = client.db('nexusplay');
        const collection = database.collection('games');

        const games = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/games.json'), 'utf8'));

        const result = await collection.insertMany(games);
        console.log(`${result.insertedCount} games inserted`);
    } catch (err) {
        console.error('Failed to load games data:', err);
    } finally {
        await client.close();
    }
}

loadData();
