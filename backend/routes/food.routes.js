// routes/food.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { getFoodsByCountry, createFood } = require('../controllers/food.controller');

router.get('/country/:countryId', getFoodsByCountry);
router.post('/', verifyToken, isAdmin, createFood);

module.exports = router;
