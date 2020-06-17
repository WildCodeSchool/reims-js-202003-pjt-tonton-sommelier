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

describe('get / descriptions', () => {
  it('get / descriptions cas de succès', (done) => {
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
 
              
describe('post / descriptions', () => {
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

describe('put / descriptions', () => {
  it('POST /description cas de succès', (done) => {
    const id = 2
    request(app)
      .put(`/descriptions/${id}`)
      .send({content: 'fughriughrdiugudfhgufdhg' , type: 'text' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ({ content: expect.any(String) , type: expect.any(String)})
        expect(response.body).toEqual(expected);
        done();
      })
  });
  it('POST /descriptions cas d\'erreur', (done) => {
    const id = 2
    request(app)
      .put(`/descriptions/${id}`)
      .send({content: '' })
      .expect(422)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ("La description est mal renseignée")
        expect(response.body).toEqual(expected);
        done();
      })
  });
});

