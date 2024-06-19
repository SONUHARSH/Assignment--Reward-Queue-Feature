const pool = require('../config/db-config');
require('dotenv').config();

async function distributeRewards(req, res){
    const today = new Date().toISOString().slice(0, 10);
    try {
        const [queueRows] = await pool.query('SELECT * FROM queue ORDER BY joined_at ASC LIMIT 100');
        const rewards = [
            { position: 1, reward: '₹100 Gift card' },
            { position: 2, reward: '₹50 Gift card' },
            { position: 3, reward: '₹25 Gift card' },
        ];
        for (let i = 4; i <= 100; i++) {
            rewards.push({ position: i, reward: '1000 Coins' });
        }

        await Promise.all(queueRows.map((user, index) => {
            const reward = rewards[index];
            return pool.query('INSERT INTO rewards (user_id, reward, reward_date) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reward_date=?',
                 [user.user_id, reward.reward, today, today]);
        }));

        await pool.query('DELETE FROM queue WHERE id IN (?)', [queueRows.map(user => user.id)]);

        res.status(200).json({ message: 'Rewards distributed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function getRewards(req, res){
    const userId = req.user.id;
    try {
        const [rows] = await pool.query('SELECT * FROM rewards WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    distributeRewards,
    getRewards
};



