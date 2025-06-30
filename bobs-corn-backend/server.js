require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');


const app = express();
app.use(cors()); 
app.use(express.json()); 


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


app.post('/buy-corn', async (req, res) => {
    const { clientId } = req.body;

    if (!clientId) {
        return res.status(400).json({ message: 'Client ID is required.' });
    }

    const now = new Date();
    const client = await pool.connect();

    try {

        await client.query('BEGIN');


        const lastPurchaseResult = await client.query(
            'SELECT last_purchase_at FROM purchase_logs WHERE client_id = $1',
            [clientId]
        );

        const lastPurchase = lastPurchaseResult.rows[0];

        if (lastPurchase) {

            const lastPurchaseTime = new Date(lastPurchase.last_purchase_at);
            const diffInSeconds = (now.getTime() - lastPurchaseTime.getTime()) / 1000;

            if (diffInSeconds < 60) {

                await client.query('ROLLBACK'); 
                const secondsLeft = Math.ceil(60 - diffInSeconds);
                return res.status(429).json({
                    message: `Too Many Requests. Please wait ${secondsLeft} more seconds.`,
                });
            } else {
   
                await client.query(
                    'UPDATE purchase_logs SET last_purchase_at = NOW() WHERE client_id = $1',
                    [clientId]
                );
            }
        } else {

            await client.query(
                'INSERT INTO purchase_logs (client_id, last_purchase_at) VALUES ($1, NOW())',
                [clientId]
            );
        }


        await client.query('COMMIT');


        res.status(200).send('🌽');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release(); 
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Bob's Corn Backend is running`);
});