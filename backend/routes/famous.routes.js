// routes/famous.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { getFamousByCountry, createFamous } = require('../controllers/famous.controller');

router.get('/country/:countryId', getFamousByCountry);
router.post('/', createFamous);

module.exports = router;
