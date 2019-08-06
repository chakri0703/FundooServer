var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Server testing', function () {
  it('should add Single user /register POST', function (done) {
    chai.request(server)
      .post('/register')
      .send({ 'name': 'chakri', 'email': 'chakri199508@gmail.com', 'password': '12345678' })
      .end(function (err, res) {
        //console.log(res.body);

        res.body.should.be.a('object');
        return done();
      });
  });

  it('testing login /login POST', function (done) {
    chai.request(server)
      .post('/login')
      .send({ 'email': 'chakri@gmail.com', 'password': '12345678' })
      .end(function (err, res) {
        res.body.should.be.a('object');
        res.should.have.status(200);
        res.should.have.property('text')

        return done();


      })
  })
  it('testing reset /reset POST', function (done) {
    chai.request(server)
      .post('/reset')
      .send({ 'email': 'chakri@gmail.com', 'updatePassword': '12345678' })
      .end(function (err, res) {
        if (err) {
          console.log(err);

        }
        else {
          res.body.should.be.a('object');
          res.should.have.status(200);
          res.should.have.property('text')

          return done();
        }
      })
  })
})
