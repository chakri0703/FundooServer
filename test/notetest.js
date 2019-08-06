var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGhlbnUiLCJlbWFpbCI6ImRoZW51cml0aHUuOTdAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNnFHTG9hRUl1a3VuV2o2azY5aUNDTzd2ekVFRTUwc0ZzQjBKWWlJbGRKdTNpcE9yS2NHcFciLCJpYXQiOjE1NjEzODA5MTF9.Qt-nTnTgm34a6FgYxVq9WZwlJybNnB2qtacKhh-lM7Q"
describe('Note', function () {

  it('should add single note /addNote POST', function (done) {
    chai.request(server)
      .post('/addNote')
      .set('token', token)
      .send({ 'title': 'testing', 'description': 'sample testing of add note' })
      .end(function (err, res) {
        res.should.have.status(200);

        return done();
      });
  });


  it('testing archive /archive POST', function (done) {
    chai.request(server)
      .post('/archive')
      .set('token', token)
      .send({ 'title': 'testing1' })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.have.property('text')

        return done();


      })
  })

  it('testing delete /delete POST', function (done) {
    chai.request(server)
      .post('/reset')
      .set('token', token)
      .send({ 'title': 'testing1' })
      .end(function (err, res) {
        if (err) {
          console.log(err);

        }
        else {
          res.should.have.status(200);
          res.should.have.property('text')

          return done();
        }
      })
  })




  it('testing getNote /getNote GET', function (done) {
    chai.request(server)
      .get('/getNote')
      .set('token', token)
      .send({ 'title': 'testing1' })
      .end(function (err, res) {
        if (err) {
          console.log(err);

        }
        else {
          res.should.have.status(200);
          res.should.have.property('text')

          return done();
        }
      })
  })

  it('testing  restore / restore POST', function (done) {
    chai.request(server)
      .post('/restore')
      .set('token', token)
      .send({ 'title': 'testing1' })
      .end(function (err, res) {
        if (err) {
          console.log(err);

        }
        else {
          res.should.have.status(200);
          res.should.have.property('text')

          return done();
        }
      })
  })

  //this test case used for add the reminder to note
  it('testing  reminder / reminder POST', function (done) {
    chai.request(server)
      .post('/reminder')
      .set('token', token)
      .send({ 'title': 'testing1' })
      .end(function (err, res) {
        if (err) {
          console.log(err);

        }
        else {
          res.should.have.status(200);
          res.should.have.property('text')

          return done();
        }
      })
  })

  it('testing  searchByTitle / searchByTitle POST', function (done) {
    chai.request(server)
      .post('/searchByTitle')
      .set('token', token)
      .send({ 'title': 'testing1' })
      .end(function (err, res) {
        if (err) {
          console.log(err);

        }
        else {
          res.should.have.status(200);
          res.should.have.property('text')

          return done();
        }
      })
  })

  it('testing  searchByDescription / searchByDescription POST', function (done) {
    chai.request(server)
      .post('/searchByDescription')
      .set('token', token)
      .send({ 'description': 'testin' })
      .end(function (err, res) {
        if (err) {
          console.log(err);

        }
        else {
          res.should.have.status(200);
          res.should.have.property('text')

          return done();
        }
      })
  })

})
