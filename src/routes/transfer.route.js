const express = require('express');
const router = express.Router();

const userTransfer = require('../controllers/transfers.controller');

router.post('/', userTransfer.transferAmount);

module.exports = router;
