const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById); // Nova rota

module.exports = router;
