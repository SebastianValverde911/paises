// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//router.get('/', userController.getAllUsers);
router.get('/:id', userController.getProfile);
//router.put('/:id', userController.updateUser);
//router.delete('/:id', userController.deleteUser);

module.exports = router;