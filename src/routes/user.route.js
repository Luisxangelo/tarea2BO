const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router
  .post('/signup', userController.signUp)
  .post('/login', userController.signIn)
  .get('/:id/history', userController.getHistory);

module.exports = router;
