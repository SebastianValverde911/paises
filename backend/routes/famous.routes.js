// routes/famous.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { getFamousByCity, createFamous } = require('../controllers/famous.controller');

router.get('/city/:cityId', getFamousByCity);
router.post('/', createFamous);

module.exports = router;
