;(function(root) {
  var curry = require('lodash.curry');

  /** Detect free variables */
  var freeGlobal = {}
  if(typeof window == "object") freeGlobal.window = window;
  var freeExports = typeof exports == 'object' && exports;
  var freeModule = typeof module == 'object' && module &&
    module.exports == freeExports && module;
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    root = freeGlobal;
  }

  // All methods from
  //  * Arrays
  //  * Numbers
  //  * Objects
  //  * Regexp
  //  * Strings
  //  * Date (coming soon)


  // RULES:
  // 1. The data comes last. E.g: str.method(arg) -> method(arg, str)
  // 2. Everything is curried
  // 3. Functions with optional arguments are split into two functions. One with _ at the end that takes the options. E.g: indexOf(x,str) & indexOf_(x,y,str)
  // 4. Everything is pure in that it doesn't mutate arguments

  LambdaJS = {};
  Strings = {};
  Arrays = {};
  Objects = {};
  Regexps = {};
  Numbers = {};



  // STRINGS
  // =========================

  //+ charAt :: Int -> String -> String
  Strings.charAt = curry(function charAt( i, s ){
    return s.charAt(i);
  });

  //+ charCodeAt :: Int -> String -> Int
  Strings.charCodeAt = curry(function charCodeAt( i, s ){
    return s.charCodeAt( i );
  });

  //+ concat :: String... -> String
  Strings.concat = curry(function concat(x) {
    return x.concat.apply("", arguments);
  }, 2);

  //+ indexOf :: a -> String -> Int
  Strings.indexOf = curry(function indexOf( value, a ){
    return a.indexOf( value );
  });

  //+ indexOf_ :: a -> Int -> String -> Int
  Strings.indexOf_ = curry(function indexOf_( value, len, a ){
    return a.indexOf( value, len );
  });

  //+ lastIndexOf :: a -> [a] -> Int
  Strings.lastIndexOf = curry(function lastIndexOf( value, a ){
    return a.lastIndexOf( value );
  });

  //+ match :: Regexp|String -> String -> [String]
  Strings.match = curry(function match( regexp, s ){
    return s.match( regexp );
  });

  //+ replace :: Regexp|String -> String -> String -> String
  Strings.replace = curry(function replace( a, b, s ){
    return s.replace( a, b );
  });

  //+ search :: Regexp|String -> String -> Int
  Strings.search = curry(function search( regexp, s ){
    return s.search( regexp );
  });

  //+ split :: String -> String -> [String]
  Strings.split = curry(function split( separator, s ){
    return s.split( separator );
  });

  //+ split_ :: String -> Int -> String -> [String]
  Strings.split_ = curry(function split_( separator, len, s ){
    return s.split( separator, len );
  });

  //+ substring :: Int -> String -> String
  Strings.substring = curry(function substring( start,  s ){
    return s.substring( start );
  });

  //+ substring_ :: Int -> Int -> String -> String
  Strings.substring_ = curry(function substring_( start, end, s ){
    return s.substring( start, end );
  });

  //+ toLocaleLowerCase :: String -> String
  Strings.toLocaleLowerCase = function toLocaleLowerCase( s ){
    return s.toLocaleLowerCase();
  }

  //+ toLocaleUpperCase :: String -> String
  Strings.toLocaleUpperCase = function toLocaleUpperCase( s ){
    return s.toLocaleUpperCase();
  }

  //+ toLocaleString :: String -> String
  Strings.toLocaleString = function toLocaleString( a ){
    return a.toLocaleString();
  }

  //+ toLowerCase :: String -> String
  Strings.toLowerCase = function toLowerCase( s ){
    return s.toLowerCase();
  }

  //+ toUpperCase :: String -> String
  Strings.toUpperCase = function toUpperCase( s ){
    return s.toUpperCase();
  }

  //+ trim :: String -> String
  Strings.trim = function trim( s ){
    return s.trim();
  }


  // Arrays
  // =========================

  //+ concat :: [a]... -> [a]
  Arrays.concat = curry(function concat(a) {
    return a.concat.apply([], arguments);
  }, 2);

  //+ every :: (a -> Boolean) -> [a] -> Boolean
  Arrays.every = curry(function every( fn, xs ) {
    return xs.every(fn);
  });

  //+ filter :: (a -> Boolean) -> [a] -> [a]
  Arrays.filter = curry(function filter(fn, xs) {
    return xs.filter(fn);
  });

  //+ forEach :: (a -> undefined) -> [a] -> [a]
  Arrays.forEach = curry(function forEach( fn, xs ) {
    xs.forEach(fn);
    return xs;
  });

  //+ indexOf :: a -> [a] -> Int
  Arrays.indexOf = curry(function indexOf( value, a ){
    return a.indexOf( value );
  });

  //+ indexOf_ :: a -> Int -> [a] -> Int
  Arrays.indexOf_ = curry(function indexOf_( value, len, a ){
    return a.indexOf( value, len );
  });

  //+ join :: String -> [a] -> String
  Arrays.join = curry(function join( separator, arr ){
    return arr.join( separator );
  });

  //+ lastIndexOf :: a -> [a] -> Int
  Arrays.lastIndexOf = curry(function lastIndexOf( value, a ){
    return a.lastIndexOf( value );
  });

  //+ map :: (a -> b) -> [a] -> [b]
  Arrays.map = curry(function map(fn, xs) {
    return xs.map(fn);
  });

  //+ pop :: [a] -> [a]
  Arrays.pop = function pop( a ){
    return a.slice(0,-1);
  }

  //+ push :: a -> [a] -> [a]
  Arrays.push = curry(function push( value, a ){
    // cloning the array
    var b = a.slice(0);
    b.push( value );
    return b;
  });

  //+ reduce :: (b -> a -> b) -> b -> [a] -> b
  Arrays.reduce = curry(function reduce(fn, acc, xs) {
    return xs.reduce(fn, acc);
  });

  //+ reduceRight :: (b -> a -> b) -> b -> [a] -> b
  Arrays.reduceRight = curry(function reduceRight(fn, acc, xs) {
    return xs.reduceRight(fn, acc);
  });

  //+ reverse :: [a] -> [a]
  Arrays.reverse = function reverse( a ){
    return a.slice(0).reverse();
  }

  //+ shift :: [a] -> [a]
  Arrays.shift = function shift( arr ){
    return arr.slice(1);
  }

  //+ some :: (a -> Boolean) -> [a] -> Boolean
  Arrays.some = curry(function some( fn, xs ) {
    return xs.some(fn);
  });

  //+ sort :: [a] -> [a]
  Arrays.sort = function sort( a ){
    return a.slice(0).sort();
  }

  //+ splice :: Int -> Int -> [a] -> [a]
  Arrays.splice = curry(function splice( index, count, a ){
    var b = a.slice(0);
    b.splice( index, count );
    return b;
  });

  //+ unshift :: a -> [a] -> [a]
  Arrays.unshift = curry(function unshift( value, a ){
    var b = a.slice(0);
    b.unshift( value ); 
    return b;
  });


  // REGEXPS
  // =========================

  //+ exec :: Regexp -> String -> [String]
  Regexps.exec = curry(function exec( r, str ){
    return r.exec( str );
  });

  //+ test :: Regexp -> String -> Boolean
  Regexps.test = curry(function test( r, str ){
    return r.test( str );
  });



  // OBJECTS
  // =========================

  //+ String -> {} -> Boolean
  Objects.hasOwnProperty = curry(function hasOwnProperty( prop, o ){
    return o.hasOwnProperty( prop );
  });

  //+ isPrototypeOf :: {} -> Function -> Boolean
  Objects.isPrototypeOf = curry(function isPrototypeOf( a, b ){
    return b.prototype.isPrototypeOf( a );
  });



  // NUMBERS
  // =========================

  //+ toExponential :: Int -> Number -> String
  Numbers.toExponential = curry(function toExponential( fractionDigits, n ){
    return n.toExponential( fractionDigits );
  });


  //+ toFixed :: Number -> Number -> String
  Numbers.toFixed = curry(function toFixed( digits, n ){
    return n.toFixed( digits );
  })

  //+ toPrecision :: Number -> Number -> String
  Numbers.toPrecision = curry(function toPrecision( precision, n ){
    return n.toPrecision( precision );
  });


  // LAMBDAJS
  // =========================

  //+ concat :: [[a]] -> [a]
  LambdaJS.concat = curry(function concat(x) {
    var kind = (typeof x == "string") ? Strings : Arrays; // better way?
    return kind.concat.apply("", arguments);
  }, 2);

  //+ slice :: Int ->  [a]
  LambdaJS.slice = curry(function slice( begin, a ){
    console.log('lambda a', a, begin)
    return a.slice( begin );
  });

  //+ slice_ :: Int -> Int -> [a]
  LambdaJS.slice_ = curry(function slice_( begin, end, a ){
    return a.slice( begin, end );
  });

  // //+ toString :: a -> String
  // LambdaJS.toString = function toString( s ){
  //   return s.toString();
  // }

  // //+ valueOf :: a -> a
  // LambdaJS.valueOf = function valueOf( a ){
  //   return a.valueOf();
  // }

// EXPORTING
// ========================

  LambdaJS.expose = function(env, mod) {
    var win = getFreeGlobal(root);
    [Strings, Arrays, Regexps, Objects, Numbers, LambdaJS].map(function(mod){
      exposeModuleToGlobal(win, mod);
    });
  }

  function exposeModuleToGlobal(win, mod) {
    var f;
    for (f in mod) {
      if (f !== 'expose' && mod.hasOwnProperty(f)) {
        win[f] = mod[f];
      }
    }
  }

  function getFreeGlobal(_window) {
    return (typeof global == "object") ? global : window;
    var env_global = _window
      , free_global = typeof env_global == 'object' && env_global;
    if (free_global.global === free_global) {
      return free_global;
    }
    return _window;
  }

  // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:
  if (
    typeof define == 'function' &&
    typeof define.amd == 'object' &&
    define.amd
  ) {
    define(function() {
      return LambdaJS;
    });
  } else if (freeExports && !freeExports.nodeType) {
    if (freeModule) { // in Node.js or RingoJS v0.8.0+
      freeModule.exports = LambdaJS;
    } else { // in Narwhal or RingoJS v0.7.0-
      for (key in LambdaJS) {
        LambdaJS.hasOwnProperty(key) && (freeExports[key] = LambdaJS[key]);
      }
    }
  } else { // in Rhino or a web browser
    root.LambdaJS = LambdaJS;
  }
}(this));
