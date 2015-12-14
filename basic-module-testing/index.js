'use strict';
var users = [
  {name: 'Bob', language: 'Java'},
  {name: 'Jill', language: 'Node'}
];


exports.getUsers = function () {
  return users;
};
exports.addUser = function(parameters){
  users.push(new User(parameters));
}

exports.joinStrings = function (strs) {
  return strs.join(' ');
};

function User(parameters){
  !parameters && (parameters = {});
  !parameters.name && (parameters.name = 'Test name');
  !parameters.language && (parameters.language = 'Node');
  this.name = parameters.name;
  this.language = parameters.language;
}
