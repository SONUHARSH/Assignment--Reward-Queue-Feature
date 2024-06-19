const cron = require('node-cron');
const { distributeRewards } = require('../controller/reward-Controller');

// Schedule task to run at 12 AM daily
cron.schedule('0 0 * * *', () => {
    console.log('Running reward distribution task...');
    distributeRewards();
});
