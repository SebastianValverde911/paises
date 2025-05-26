// routes/city.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { getCitiesByCountry, createCity } = require('../controllers/city.controller');

router.get('/country/:countryId', getCitiesByCountry);
router.post('/', createCity);

module.exports = router;
