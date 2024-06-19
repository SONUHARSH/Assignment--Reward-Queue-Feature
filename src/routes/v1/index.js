const express = require('express');

const { InfoController } = require('../../controller');

const authRoutes = require('./auth-Routes');
const queueRoutes = require('./queue-Routes');
const rewardRoutes = require('./reward-Routes');



const router = express.Router();

router.use('/auth', authRoutes);
router.use('/queue', queueRoutes);
router.use('/reward', rewardRoutes);


router.get('/info', InfoController.info);

module.exports = router;
