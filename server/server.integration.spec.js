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

describe('Test cas d\'erreur', () => {
  it('POST /descriptions cas d\'erreur', (done) => {
    request(app)
      .post('/descriptions')
      .send({ content: null})
      .expect(422)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ('La description est mal renseignée');
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('POST /description cas de succès', (done) => {
    request(app)
      .post('/descriptions')
      .send({ content: 'lorem ipsum', type: 'image'})
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), content: expect.any(String), type: expect.any(String) };
        expect(response.body).toEqual(expected);
        done();
      });
  });
  afterEach(done => connection.query("DELETE FROM description WHERE content ='lorem ipsum'", done)); // à améliorer ?
});




/* ----- Boxes ----- */

describe('POST /boxes', () => {
  it('POST /boxes cas d\'erreur', (done) => {
    request(app)
      .post('/boxes')
      .send({ name: null, category_id: null })
      .expect(422)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ('Le nom du coffret est mal renseigné');
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('POST /boxes cas de succès', (done) => {
    request(app)
      .post('/boxes')
      .send({ name: 'Curieux', category_id: 1})
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), name: expect.any(String), category_id: expect.any(Number) };
        expect(response.body).toEqual(expected);
        done();
      });
  });
  afterEach(done => connection.query("DELETE FROM box WHERE name ='Curieux'", done)); // à améliorer ?
});