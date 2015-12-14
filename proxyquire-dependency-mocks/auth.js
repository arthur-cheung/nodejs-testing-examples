// If there is an error - needs to return to callback. Second paramater is a boolean
var http = require('./index');

exports.doLogin = function(username, password, callback){
  http.getUrl('http://blah.com?username=' + username + '&password=' + password, function(err, response){
    if(err){
      return callback(err);
    }
    callback(null, response);
  });
};
