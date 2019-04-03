const request = require('supertest');
jest.mock('../../services/users');
const UserService = require('../../services/users');
const { app } = require('../../app');

test("When making a get request to /user/all, if DB is successfull, expect 200", done => {
    UserService.readAllUsers.mockImplementation(() => {
        return Promise.resolve();
    });
    
    request(app)
        .get('/user/all')
        .then(response => {
            expect(response.status).toBe(200)
            done()
        })
});