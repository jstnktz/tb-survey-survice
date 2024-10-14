const mongoose = require('mongoose');

// Define the schema for survey questions
const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['rating', 'text'], // Specifies the allowed types of questions
        required: true
    }
});

// Define the schema for surveys
const SurveySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensures each survey has a unique name
    },
    questions: {
        type: [QuestionSchema], // Array of questions, each defined by the QuestionSchema
        required: true
    }
});

// Create the Survey model
module.exports = mongoose.model('Survey', SurveySchema);
