var expect = require('chai').expect;
var request = require('supertest');
var server = require('../src/app');

describe('User API Tests', () => {
    it('POST /users/ create new user', async () => {
        const response = await request(server).post('/users').send({
            name: 'Ahmad rosid',
            email: 'ahmadrosid@gmail.com',
            password: '123456'
        });
        expect(200).to.equal(200)
        expect(response.body).to.be.an.instanceof(Object);
        expect(response.body).to.include.keys(['token', 'user']);
    })
})


//run once after all tests
after(function (done) {
    var mongoose = require('mongoose');
    console.log('Deleting test database');
    mongoose.connection.db.dropDatabase(done);
});