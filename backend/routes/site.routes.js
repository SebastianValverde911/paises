// routes/site.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { getSitesByCountry, createSite } = require('../controllers/site.controller');

router.get('/country/:countryId', getSitesByCountry);
router.post('/', createSite);

module.exports = router;
