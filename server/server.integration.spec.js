const request = require('supertest');
const app = require('./server.js');
const connection = require('./db.js');

/*---- test hello tonton sommelier -------*/

describe('route test', () => {
  it('accès à hello tonton_sommelier', (done) => {
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

/*----------------test boxes---------------------- */

describe('route test boxes', () => {
  it('accès à la liste des coffrets réussi', (done) => {
    request(app)
      .get('/boxes')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = expect.any(Array);
        expect(response.body).toEqual(expected);
        done();
      });
  });
});

describe('route test boxes', () => {
  it('accès à la liste des coffrets par ID réussi', (done) => {
    request(app)
      .get('/boxes/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id : expect.any(Number), name: expect.any(String), category_id: expect.any(Number)};
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('accès à la liste des coffrets par ID échoué', (done) => {
    request(app)
      .get('/boxes/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id : expect.any(Number), name: expect.any(String), category_id: expect.any(Number)};
        expect(response.body).toEqual(expected);
        done();
      });
  });
});
/*----------------test description---------------------- */

describe('route test description', () => {
  it('accès aux description réussi', (done) => {
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

describe('route test description', () => {
  it("modification d'une description réussie", (done) => {
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
  it("modification d'une description échouée", (done) => {
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
