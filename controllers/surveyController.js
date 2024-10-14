const Survey = require('../models/surveyModel');

// Update an existing survey
const updateSurvey = async (req, res) => {
    try {
        const { id } = req.params; // Extract survey ID from request parameters
        const updatedData = req.body; // Extract updated survey data from request body

        // Find the survey by ID and update it with the new data
        const updatedSurvey = await Survey.findByIdAndUpdate(id, updatedData, { new: true });

        // If the survey is not found, return a 404 response
        if (!updatedSurvey) {
            return res.status(404).json({ message: 'Survey not found' });
        }

        // Return the updated survey and success message
        res.status(200).json({ message: 'Survey updated successfully', survey: updatedSurvey });
    } catch (err) {
        // Handle server errors and return a 500 response
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Get survey questions by survey name
const getSurveyByName = async (req, res) => {
    try {
        const { name } = req.params; // Extract survey name from request parameters

        // Fetch survey from the database by name
        const survey = await Survey.findOne({ name });

        // If the survey is not found, return a 404 response
        if (!survey) {
            return res.status(404).json({ message: 'Survey not found' });
        }

        // Return the survey questions
        res.status(200).json({ surveyName: survey.name, questions: survey.questions });
    } catch (err) {
        // Handle server errors and return a 500 response
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    // Exporting the functions to be used in other parts of the application, such as route handlers
    getSurveyByName,
    updateSurvey,
};