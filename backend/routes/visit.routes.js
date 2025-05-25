// routes/visit.routes.js
const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visit.controller');

//router.get('/', visitController.getAllVisits);
router.get('/:id', visitController.getVisitsByUser);
router.post('/', visitController.createVisit);
//router.put('/:id', visitController.updateVisit);
//router.delete('/:id', visitController.deleteVisit);


module.exports = router;