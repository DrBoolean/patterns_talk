var curry = require('lodash.curry');
var _FPUtils = {};

var _compose = curry(function(f,g,x) { return f(g(x)) });

// f . g . h == compose(f, g, h)
var toAssociativeCommaInfix = function(fn) {
  return function() {
    var fns = [].slice.call(arguments)
    return function() {
      return _FPUtils.groupsOf(2, fns).reverse().map(function(g) {      
        return (g.length > 1) ? fn.apply(this,g) : g[0];
      }).reduce(function(x, f) {
        return [f.apply(f,x)];
      }, arguments)[0];
    };    
  };
};

_FPUtils.compose = toAssociativeCommaInfix(_compose);

_FPUtils.groupsOf = curry(function(n, xs) {
  if(!xs.length) return [];
  return [xs.slice(0, n)].concat(_FPUtils.groupsOf(n, xs.slice(n, xs.length)));
})

_FPUtils.pluck = curry(function( param, obj ){
  return obj[param];
})

_FPUtils.first = _FPUtils.pluck(0)

_FPUtils.last = function(xs) {
  return xs[xs.length -1];
}

_FPUtils.invoke = function(methodName/*, arguments*/) {
  var args = Array.slice(arguments, 1);
  return function(object) {
    return object[methodName].apply(object, Array.slice(arguments, 1).concat(args));
  }
}

_FPUtils.flip = function( fn ){
  return curry(function(){
    var args = Array.slice(arguments, 0).reverse();
    return fn.apply( null, args );
  }, fn.arity || fn.length);
}

_FPUtils.multiply = curry(function( x, y ) {
  return x * y;
})

_FPUtils.div = curry(function( x, y ) {
  return x / y;
})

_FPUtils.add = curry(function( x, y ) {
  return x + y;
})

_FPUtils.subtract = curry(function( x, y ) {
  return x - y;
})

_FPUtils.mod = curry(function(x,y) {
  return x % y;
})

_FPUtils.gt = curry(function( x, y ) {
  return x > y;
})

_FPUtils.gte = curry(function( x, y ) {
  return x >= y;
})

_FPUtils.lt = curry(function( x, y ) {
  return x < y;
})

_FPUtils.lte = curry(function( x, y ) {
  return x <= y;
})

_FPUtils.equal = curry(function( x, y ) {
  return x === y;
})

_FPUtils.eq = curry(function( x, y ) {
  return x == y;
})

_FPUtils.sequence = function() {
  var fns = [].slice.call(arguments);
  return function(x) {
    return fns.map(function(f) { return f(x); });
  };
};

_FPUtils.S = curry(function(f, g) {
  return function() {
    return f.apply(this, [g.apply(this, arguments)].concat(Array.slice(arguments, 0)));
  }
})

_FPUtils.K = function(x){ return function(){ return x; }; }

_FPUtils.I = function(x){ return x; }

_FPUtils.log = function(x){ console.log(x); return x; }

_FPUtils.expose = function(env) {
  var f;
  for (f in _FPUtils) {
    if (f !== 'expose' && _FPUtils.hasOwnProperty(f)) {
      env[f] = _FPUtils[f];
    }
  }
  return _FPUtils;
}

module.exports = _FPUtils;

if(typeof window == "object") {
  FPUtils = _FPUtils;
}
