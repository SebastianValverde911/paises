// routes/food.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { getFoodsByCountry, createFood, getAllFoodsWithSiteName } = require('../controllers/food.controller');

router.get('/country/:countryId', getFoodsByCountry);
router.get('/', getAllFoodsWithSiteName); 
router.post('/', createFood);

module.exports = router;
