const mongoose = require('mongoose');
const Survey = require('../models/surveyModel'); // Adjust the path as needed

require('dotenv').config(); // Load environment variables (e.g., MONGO_URI)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected...');
    populateSurveys();
}).catch(err => {
    console.error('Connection error', err);
    process.exit(1);
});

// Function to populate surveys with initial data
const populateSurveys = async () => {
    try {
        // Define the surveys to be inserted
        const surveys = [
            {
                name: 'tech_benchmark',
                questions: [
                    { text: 'We deploy to production frequently.', type: 'rating' },
                    { text: 'We can restore service quickly after an incident.', type: 'rating' },
                    { text: 'We rarely experience deployment failures.', type: 'rating' },
                    { text: 'We can fix deployment failures quickly.', type: 'rating' },
                    { text: 'We have high confidence in our monitoring and alerting systems.', type: 'rating' }
                ],
            },
            {
                name: 'tech_team_leadership',
                questions: [
                    { text: 'We mentor junior developers effectively.', type: 'rating' },
                    { text: 'We collaborate well as a team.', type: 'rating' },
                    { text: 'We align our work with business goals effectively.', type: 'rating' },
                    { text: 'We provide constructive feedback to team members regularly.', type: 'rating' },
                    { text: 'We handle conflicts within the team effectively.', type: 'rating' }
                ],
            },
        ];

        // Insert the surveys into the database
        await Survey.insertMany(surveys);
        console.log('Surveys have been populated successfully.');
    } catch (err) {
        console.error('Error inserting surveys', err);
    } finally {
        // Close the database connection after populating surveys
        mongoose.connection.close();
    }
};
