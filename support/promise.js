var Promise = require('./node-promise/promise').Promise;

var p = new Promise();

p.constructor.prototype.map = function(f) {
  var promise = new Promise();
  this.then(function(response){
    promise.resolve(f(response));
  });
  return promise;
}

p.constructor.prototype.ap = function(p2) {
  var promise = new Promise();
  var p1 = this;

  p1.then(function(f){
    p2.then(function(response){
      promise.resolve(f(response));
    })
  });
  return promise;
}

p.constructor.prototype.chain = function(f) {
  var prom = this;
  return prom.then(function(response){
    return f(response);
  });
};

module.exports = Promise;
