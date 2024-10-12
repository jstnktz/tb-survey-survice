const express = require('express');
const router = express.Router();
const { createSurvey, getSurveys } = require('../controllers/surveyController');

// Create a new survey
router.post('/', createSurvey);

// Get all surveys
router.get('/', getSurveys);

module.exports = router;
