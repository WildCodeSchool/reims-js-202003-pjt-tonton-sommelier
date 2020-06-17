const request = require('supertest');
const app = require('./server.js');
const connection = require('./db.js');

/*---- test hello tonton sommelier -------*/

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

/*----------------test description---------------------- */

describe('route test', () => {
  it('Show description succed', (done) => {
    request(app)
      .get('/descriptions')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = expect.any(Array)
        /* question pour romain : const expected = response.map(rep => expect.any({rep.id : expect.any(Number), rep.content : expect.any(String), rep.type : expect.any(String)}))*/
        expect(response.body).toEqual(expected);
        done();
      });
  });
});