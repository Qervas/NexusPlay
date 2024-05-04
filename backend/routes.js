// routes.js
const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const mongoUtil = require('./utils/mongoUtil');

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

const insertUpdateUsersRouteHandler = async (req, res) => {
	try {
		await client.connect();
		const db = client.db('nexusplay');
		const collection = db.collection('users');

		const { email, name, image } = req.body;
	    // Validate that email is not null and is a string
		if (!email || typeof email !== 'string') {
			return res.status(400).json({ error: 'Email is required and must be a valid string.' });
		}
		const result = await collection.updateOne(
            { email },
            { $set: { name, image } },
            { upsert: true }
        );
		if (result.upsertedCount > 0) {
            console.log(`Inserted new user with email: ${email}`);
        } else if (result.modifiedCount > 0) {
            console.log(`Updated user with email: ${email}`);
        } else {
            console.log(`No changes made to user with email: ${email}`);
        }
		console.log('User data inserted/updated successfully:', result);
		res.json({ message: 'User data inserted/updated successfully' });
	} catch (error) {
		console.error("Failed to insert/update user data in MongoDB:", error);
		res.status(500).json({ error: 'User data could not be inserted/updated in the database' });
	} finally {
		await client.close();
	}
};

router.get('/api/games', getGamesRouteHandler);
router.post('/api/users', insertUpdateUsersRouteHandler);



module.exports = router;
