const express = require('express');
const router = express.Router();

const model_controller = require('../controllers/agencyController');

router.get('/add', model_controller.addAgency);
router.get('/delete', model_controller.changedeleteAgency);
router.get('/update', model_controller.updateAgency);
router.get('/find', model_controller.searchAgency);

module.exports = router;