// routes/site.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { getSitesByCountry, getSitesByCity, createSite } = require('../controllers/site.controller');

router.get('/country/:countryId', getSitesByCountry);
router.get('/city/:cityId', getSitesByCity);
router.post('/', createSite);

module.exports = router;
