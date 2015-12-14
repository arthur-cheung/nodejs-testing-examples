'use strict';

var assert = require('assert')
  , example = require('../basic-module-testing/index.js');

describe('Example Module', function () {

  describe('#testGetUsers', function () {
    it('Should return an Array of two users', function () {
      var users = example.getUsers();

      assert.equal(Array.isArray(users), true, 'Users should be an array');
      assert.equal(users.length, 2);
    });
  });
  describe('#testAddUser', function () {
    it('Should return an Array of three users', function () {
      example.addUser({name: 'Arthur', language: 'Node'});
      var users = example.getUsers();

      assert.equal(Array.isArray(users), true, 'Users should be an array');
      assert.equal(users.length, 3);
    });
  });

  describe('#testJoinStrings', function () {
    it('Should return an Array of two users', function () {
      var testStrings = ['hello', 'world', 'it\'s', 'me, Node.js!']
      , expected = 'hello world it\'s me, Node.js!';

      assert.equal(example.joinStrings(testStrings), expected);
    });


    // We've deliberately set this up to fail!
    it('Should fail', function () {
      var testStrings = ['hello', 'world', 'it\'s', 'me, Node.js!'];

      assert.equal(example.joinStrings(testStrings), 'not the expected result');
    });
  });

});
