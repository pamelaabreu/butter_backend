const request = require('supertest');
jest.mock('../../utils/comments');
const {createCommentAndNotify,} = require('../../utils/comments');
const { app } = require('../../app');

test("When creating a new comment, expect 200 response", done => {
    createCommentAndNotify.mockImplementation(() => Promise.resolve());

    request(app)
        .post('/comment/')
        .then(response => {
            expect(response.status).toBe(200)
            done()
        })
});

test("When creating a new comment incorrectly, expect 400 response", done => {
    createCommentAndNotify.mockImplementation(() => Promise.reject());
    
    request(app)
        .post('/comment/')
        .then(response => {
            expect(response.status).toBe(400)
            done()
        })
});