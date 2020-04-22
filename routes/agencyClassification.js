const express = require('express');
const router = express.Router();

const model_controller = require('../controllers/agencyClassificationController');

router.get('/add', model_controller.addAgencyClass);
router.get('/delete', model_controller.deleteAgencyClass);
router.get('/all', model_controller.findAllAgencyClass);
router.get('/find', model_controller.findBylabelandbelong);

module.exports = router;