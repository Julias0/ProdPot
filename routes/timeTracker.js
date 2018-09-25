var express = require('express');
var router = express.Router();
var guardMiddleware = require('../middleware/authMiddleware').guardMiddleware;
var timeTrackerController = require('../controllers/timeTrackerController');

router.get('/', guardMiddleware, timeTrackerController.getDashboard);

router.post('/newEntry', guardMiddleware, timeTrackerController.addNewTimeEntry);

module.exports = router;


