// routes/country.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry
} = require('../controllers/country.controller');

router.get('/', getAllCountries);
router.get('/:id', getCountryById);
router.post('/', verifyToken, isAdmin, createCountry);
router.put('/:id', verifyToken, isAdmin, updateCountry);
router.delete('/:id', verifyToken, isAdmin, deleteCountry);

module.exports = router;
