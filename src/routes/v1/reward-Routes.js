const express = require('express');

const { distributeRewards, getRewards } = require('../../controller/reward-Controller');
const { authenticateToken } = require('../../middlewares/auth-Middleware');
const router = express.Router();


//   8088/api/v1/reward/distribute-rewards & rewards   POST & GET
router.post('/distribute-rewards', distributeRewards);
router.get('/rewards', authenticateToken, getRewards);

module.exports = router;

