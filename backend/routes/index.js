const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const cityRoutes = require('./city.routes');
const countryRoutes = require('./country.routes');
const siteRoutes = require('./site.routes');
const famousRoutes = require('./famous.routes');
const foodRoutes = require('./food.routes');
const visitRoutes = require('./visit.routes');
const tagRoutes = require('./tag.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/cities', cityRoutes);
router.use('/countries', countryRoutes);
router.use('/sites', siteRoutes);
router.use('/famous', famousRoutes);
router.use('/foods', foodRoutes);
router.use('/visits', visitRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
