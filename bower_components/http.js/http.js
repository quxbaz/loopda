var validOptions = ['responseType'];

function checkForValidOptions(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key) && validOptions.indexOf(key) == -1)
      throw '"' + key + '" is not a valid option.';
  }
}

module.exports = {
  get: function(url, opts) {
    if (typeof opts == 'undefined')
      var opts = {};
    else if (typeof opts != 'object')
      throw '@opts must be an object.';
    checkForValidOptions(opts);
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    if (opts.hasOwnProperty('responseType'))
      request.responseType = opts.responseType;
    var promise = new Promise(function(resolve, reject) {
      request.onload = function() {
        resolve(request.response);
      };
      request.onerror = function() {
        reject(request.response);
      };
    });
    request.send();
    return promise;
  }
};
