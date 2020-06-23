const request = require('supertest');
const app = require('./server.js');
const connection = require('./db.js');

/*---- test hello tonton sommelier -------*/

describe('route test', () => {
  it('get / cas de succès', (done) => {
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
  it('get /boxes cas de succès', (done) => {
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
  it('get /boxes/:id cas de succès', (done) => {
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
  it('get /boxes/:id cas de cas d\'erreur', (done) => {
    request(app)
      .get('/boxes/4')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ('Coffret non trouvé');
        expect(response.body).toEqual(expected);
        done();
      });
  });
});



/*----------------test content---------------------- */

describe('route test content', () => {
  it('get /contents cas de succès', (done) => {
    request(app)
      .get('/contents')
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


describe('route test content', () => {
  it('POST /contents cas d\'erreur', (done) => {
    request(app)
      .post('/contents')
      .send({ content: null})
      .expect(422)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ('La content est mal renseignée');
        expect(response.body).toEqual(expected);
        done();
      });
    });
    it('POST /content cas de succès', (done) => {
      request(app)
        .post('/contents')
        .send({ content: 'lorem ipsum', type: 'image'})
        .expect(201)
        .expect('Content-Type', /json/)
        .then(response => {
          const expected = { id: expect.any(Number), content: expect.any(String), type: expect.any(String) };
          expect(response.body).toEqual(expected);
          done();
        });
    });
    afterEach(done => connection.query("DELETE FROM content WHERE content ='lorem ipsum'", done)); // à améliorer ?
});


describe('route test content', () => {
  it("PUT /contents cas de succès", (done) => {
    const id = 2
    request(app)
      .put(`/contents/${id}`)
      .send({content: 'fughriughrdiugudfhgufdhg' , type: 'text' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ({ content: expect.any(String) , type: expect.any(String)})
        expect(response.body).toEqual(expected);
        done();
      })
  });
  it("PUT /contents cas d\'erreur", (done) => {
    const id = 2
    request(app)
      .put(`/contents/${id}`)
      .send({content: '' })
      .expect(422)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = ("La content est mal renseignée")
        expect(response.body).toEqual(expected);
        done();
      })
  });
});

  


