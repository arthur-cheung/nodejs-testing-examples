'use strict';

var expect = require('chai').expect
  , proxyquire = require('proxyquire')
  , http = proxyquire('../index.js', { // Path in proxyquire should be the same as whta is in the actual file you're testing. Also be careful, you need .js in this one
    'request': requestStub
  })
  , auth = proxyquire('../auth.js', {
    './index': {
      getUrl: getUrlStub
    }
  })
  , querystring = require('querystring');

function getUrlStub(url, callback){
  var queries = querystring.parse(url.split('?')[1]);
  console.log(queries);
  if(!queries.username || !queries.password){
    callback(new Error('Error: no username / password provided'));
  }
  else if(queries.username == 'arthur' && queries.password == 'password'){
    callback(null, '<html></html>');
  }
  else{
    callback(new Error('Error: authentication refuesed'), null);
  }
}

describe('proxyquire Auth Test Suite', function () {

  describe('#doLogin', function () {
    it('Should login sucecssfully', function (done) {
      auth.doLogin('arthur', 'password', function(err, body){
        expect(err).to.be.null;
        expect(body).to.be.a('string');
        done();
      })
    });
    it('Should not allow login with bad password', function (done) {
      auth.doLogin('arthur', 'badpassword', function(err, body){
        expect(err).to.be.an.instanceOf(Error);
        expect(body).to.be.not.okay;
        done();
      })
    });
    it('Should not allow login if no parameters provided', function (done) {
      auth.doLogin('', '', function(err, body){
        expect(err).to.be.an.instanceOf(Error);
        expect(body).to.be.not.okay;
        done();
      })
    });
  });

});

function requestStub (opts, callback) {
  if (opts.url.indexOf('error') !== -1) {
    callback(
      // Mimic a regular error
      new Error('ECONNREFUSED'),
      null,
      null
    );
  } else if (opts.url.indexOf('404') !== -1) {
    callback(
      null,
      {
        statusCode: 404
      },
      'not found'
    );
  } else {
    callback(
      null,
      {
        statusCode: 200
      },
      JSON.stringify({
        key: 'value'
      })
    );
  }
}

describe('proxyquire HTTP Test Suite', function () {

  describe('#getUrl', function () {
    it('Should return an error', function (done) {
      http.getUrl('http://fake-error.com', function (err) {
        expect(err).to.be.an.instanceof(Error);
        done();
      })
    });

    it('Should return a 404', function (done) {
      http.getUrl('http://fake-404.com', function (err, body) {
        expect(err).to.be.an.instanceof(Error);
        expect(body).to.be.a('string');
        done();
      })
    });

    it('Should return an error', function (done) {
      http.getUrl('http://json-test-url.com', function (err, body) {
        expect(err).to.be.null;
        expect(body).to.be.a('string');
        expect(JSON.parse(body)).to.be.an('object');
        done();
      })
    });
  });

});
