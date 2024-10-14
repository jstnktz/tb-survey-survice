const { updateSurvey, getSurveyByName } = require('../controllers/surveyController');
const Survey = require('../models/surveyModel');
const httpMocks = require('node-mocks-http');

// Mock the Survey model to prevent actual database interaction
jest.mock('../models/surveyModel');

describe('Survey Controller - updateSurvey', () => {
    it('should return 404 if survey is not found', async () => {
        // Arrange: Create a mock request with an invalid survey ID
        const req = httpMocks.createRequest({
            params: { id: 'invalidId' },
            body: { title: 'Updated Survey Title' }
        });
        const res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnThis(); // Mock the status method to be chainable
        res.json = jest.fn(); // Mock the json method to capture the response

        // Mock Survey's findByIdAndUpdate method to return null (survey not found)
        Survey.findByIdAndUpdate.mockResolvedValue(null);

        // Act: Call the updateSurvey function with the mocked request and response
        await updateSurvey(req, res);

        // Assert: Verify that the response status is 404 and the correct error message is returned
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Survey not found' })
        );
    });

    it('should return 200 if survey is updated successfully', async () => {
        // Arrange: Create a mock request with a valid survey ID and updated data
        const req = httpMocks.createRequest({
            params: { id: 'validId' },
            body: { title: 'Updated Survey Title', questions: ['Updated question?'] }
        });
        const res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnThis(); // Mock the status method to be chainable
        res.json = jest.fn(); // Mock the json method to capture the response

        // Mock Survey's findByIdAndUpdate method to return the updated survey
        Survey.findByIdAndUpdate.mockResolvedValue({
            title: 'Updated Survey Title',
            questions: ['Updated question?']
        });

        // Act: Call the updateSurvey function with the mocked request and response
        await updateSurvey(req, res);

        // Assert: Verify that the response status is 200 and the updated survey is returned
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Survey updated successfully',
                survey: expect.any(Object),
            })
        );
    });
});

describe('Survey Controller - getSurveyByName', () => {
    it('should return 404 if survey is not found', async () => {
        // Arrange: Create a mock request with a survey name that doesn't exist
        const req = httpMocks.createRequest({
            params: { name: 'nonexistentSurvey' }
        });
        const res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnThis(); // Mock the status method to be chainable
        res.json = jest.fn(); // Mock the json method to capture the response

        // Mock Survey's findOne method to return null (survey not found)
        Survey.findOne.mockResolvedValue(null);

        // Act: Call the getSurveyByName function with the mocked request and response
        await getSurveyByName(req, res);

        // Assert: Verify that the response status is 404 and the correct error message is returned
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Survey not found' })
        );
    });

    it('should return 200 and the survey if found', async () => {
        // Arrange: Create a mock request with a valid survey name
        const req = httpMocks.createRequest({
            params: { name: 'tech_benchmark' }
        });
        const res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnThis(); // Mock the status method to be chainable
        res.json = jest.fn(); // Mock the json method to capture the response

        // Mock Survey's findOne method to return the survey
        Survey.findOne.mockResolvedValue({
            name: 'tech_benchmark',
            questions: ['Question 1', 'Question 2']
        });

        // Act: Call the getSurveyByName function with the mocked request and response
        await getSurveyByName(req, res);

        // Assert: Verify that the response status is 200 and the survey is returned
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                surveyName: 'tech_benchmark',
                questions: expect.any(Array),
            })
        );
    });
});