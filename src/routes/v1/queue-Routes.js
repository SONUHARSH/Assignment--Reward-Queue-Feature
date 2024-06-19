const express = require('express');
const { completeTask, referFriend, joinQueue, getQueue } = require('../../controller/queue-Controller');
const { authenticateToken } = require('../../middlewares/auth-Middleware');
const router = express.Router();




//   8088/api/v1/queue/complete-task & ... queue   POST & GET
router.post('/complete-task', authenticateToken, completeTask);
router.post('/refer-friend', authenticateToken, referFriend);
router.post('/join-queue', authenticateToken, joinQueue);
router.get('/queue', authenticateToken, getQueue);

// 8088/api/v1/queue/queue

module.exports = router;



