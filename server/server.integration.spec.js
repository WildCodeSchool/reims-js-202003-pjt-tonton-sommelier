const request = require('supertest');
const app = require('./server.js');
const connection = require('./db.js');


describe('route test', () => {
  it('acces to hello tonton_sommelier', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ('hello tonton sommelier');
        expect(response.body).toEqual(expected);
        done();
      });
  });
});

