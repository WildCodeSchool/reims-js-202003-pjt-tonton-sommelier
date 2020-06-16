const request = require('supertest');
const app = require('./server.js');
const connection = require('./db.js');


describe('', () => {
  it('', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'Hello World!'};
        expect(response.body).toEqual(expected);
        done();
      });
  });
});