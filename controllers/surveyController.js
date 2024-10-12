const Survey = require('../models/surveyModel');

const createSurvey = async (req, res) => {
    try {
        // Extract survey details from the request body
        const { title, questions } = req.body;

        // Validate request body
        // Ensure that the title is provided and questions is an array
        if (!title || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid survey data. Ensure "title" and "questions" (array) are provided.' });
        }

        // Create a new survey instance with the provided title and questions
        const newSurvey = new Survey({ title, questions });

        // Save the survey to the database
        // This operation is asynchronous and will save the survey document to MongoDB
        await newSurvey.save();

        // Respond with success message and the newly created survey
        res.status(201).json({ message: 'Survey created successfully', survey: newSurvey });
    } catch (err) {
        // Handle server errors and respond with a 500 status code
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const getSurveys = async (req, res) => {
    try {
        // Fetch all surveys from the database
        // This will return an array of all survey documents in the collection
        const surveys = await Survey.find();
        
        // Respond with the list of surveys
        res.status(200).json({ surveys });
    } catch (err) {
        // Handle server errors and respond with a 500 status code
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    // Exporting the functions to be used in other parts of the application, such as route handlers
    createSurvey,
    getSurveys,
};