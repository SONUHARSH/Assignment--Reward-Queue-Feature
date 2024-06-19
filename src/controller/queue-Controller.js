const pool = require('../config/db-config');

async function completeTask(req, res){
    const userId = req.user.id;
    try {
        await pool.query('INSERT INTO tasks (user_id, completed) VALUES (?, true) ON DUPLICATE KEY UPDATE completed=true', [userId]);
        res.status(200).json({ message: 'Task completed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function referFriend(req, res){
    const userId = req.user.id;
    const { referredUserId } = req.body;
    try {
        await pool.query('INSERT INTO referrals (user_id, referred_user_id, completed) VALUES (?, ?, true) ON DUPLICATE KEY UPDATE completed=true', [userId, referredUserId]);
        res.status(200).json({ message: 'Referral completed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function joinQueue(req, res){
    const userId = req.user.id;
    const today = new Date().toISOString().slice(0, 10);
    try {
        const [taskRows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? AND completed = true', [userId]);
        const [referralRows] = await pool.query('SELECT * FROM referrals WHERE user_id = ? AND completed = true', [userId]);

        if (taskRows.length > 0 && referralRows.length > 0) {
            const [existingEntry] = await pool.query('SELECT * FROM queue WHERE user_id = ? AND DATE(joined_at) = ?', [userId, today]);
            if (existingEntry.length > 0) {
                return res.status(400).json({ error: 'User can join the queue only once per day' });
            }

            await pool.query('INSERT INTO queue (user_id) VALUES (?)', [userId]);
            res.status(200).json({ message: 'User added to the queue' });
        } else {
            res.status(400).json({ error: 'Task and referral must be completed to join the queue' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function getQueue(req, res){
    try {
        const [rows] = await pool.query('SELECT * FROM queue ORDER BY joined_at ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    completeTask,
    referFriend,
    joinQueue,
    getQueue
};
