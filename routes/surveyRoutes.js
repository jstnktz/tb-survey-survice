const express = require('express');
const router = express.Router();
const { createSurvey, getSurveys } = require('../controllers/surveyController');

// Create a new survey
router.post('/', createSurvey);

// Get all surveys
router.get('/', getSurveyByName);

module.exports = router;
