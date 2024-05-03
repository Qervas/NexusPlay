// utils/mongoUtil.js
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let dbInstance = null;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectToServer = async () => {
    if (!dbInstance) {
        try {
            await client.connect();
            dbInstance = client.db('nexusplay'); // your database name
            console.log("Successfully connected to MongoDB.");
        } catch (error) {
            console.error("Failed to connect to MongoDB", error);
            throw error; // rethrow the error for handling it outside
        }
    }
    return dbInstance;
};


const getDb = () => {
    if (!dbInstance) {
        throw new Error("Database not initialized");
    }
    return dbInstance;
};


const loadData = async () => {
    const db = getDb();
    if (!db) {
        console.error("Database not initialized");
        return;
    }

    const gamesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/games.json'), 'utf8'));
    const collection = db.collection('games');

    try {
        for (const game of gamesData) {
            const query = { id: game.id }; // Assuming each game has a unique 'id'
            const update = { $set: game };
            const options = { upsert: true };

            const result = await collection.updateOne(query, update, options);
            if (result.upsertedCount > 0) {
                console.log(`Inserted game with id: ${game.id}`);
            } else if (result.modifiedCount > 0) {
                console.log(`Updated game with id: ${game.id}`);
            }
        }
        console.log("Data loading process completed.");
    } catch (error) {
        console.error("Failed to load games data:", error);
    } finally {
        client.close(); // Ensure to close the MongoDB client after the operation
    }
};

module.exports = { connectToServer, getDb, loadData };