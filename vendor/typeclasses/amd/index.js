define(
  'util',["exports"],
  function(__exports__) {
    

    var Constructor = function(f) {
      var x = function(){
        if(!(this instanceof x)){
          var inst = new x();
          f.apply(inst, arguments);
          return inst;
        }
        f.apply(this, arguments);
      };

      return x;
    };
    __exports__.Constructor = Constructor;
    var makeType = function(f) {
      f = f || function(v){ this.val = v; }
      return Constructor(f);
    };
    __exports__.makeType = makeType;
    var toArray = function(x) {
      return Array.prototype.slice.call(x);
    }

    var curry = function (fn /* variadic number of args */) {
      var args = Array.prototype.slice.call(arguments, 1);
      var f = function () {
        return fn.apply(this, args.concat(toArray(arguments)));
      };
      return f;
    };

    var autoCurry = function (fn, numArgs) {
      numArgs = numArgs || fn.length;
      var f = function () {
        if (arguments.length < numArgs) {
          return numArgs - arguments.length > 0 ?
            autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
                numArgs - arguments.length) :
            curry.apply(this, [fn].concat(toArray(arguments)));
        }
        else {
          return fn.apply(this, arguments);
        }
      };
      f.toString = function(){ return fn.toString(); };
      f.curried = true;
      f.fn = fn;
      f.arity = fn.length;
      return f;
    };
    __exports__.autoCurry = autoCurry;
    Function.prototype.autoCurry = function(n) {
      return autoCurry(this, n);
    }


    var K = function(x){return function(){return x;};};
    __exports__.K = K;var I = function(x){return x;};
    __exports__.I = I;
  });
define(
  'types',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    var makeType = __dependency1__.makeType;
    var autoCurry = __dependency1__.autoCurry;var Identity = makeType();
    __exports__.Identity = Identity;var Maybe = makeType();
    __exports__.Maybe = Maybe;
  });
define(
  'functor',["./util","./types","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    var autoCurry = __dependency1__.autoCurry;var Identity = __dependency2__.Identity;
    var Maybe = __dependency2__.Maybe;var Functor = function(type, defs) {
      type.prototype.fmap = defs.fmap;
    };
    __exports__.Functor = Functor;
    var fmap = function(f, obj) {
      return obj.fmap(f);
    }.autoCurry();
    __exports__.fmap = fmap;
    // Some default instances:

    // Functor(Array, {
    //   fmap: function(f){
    //     return this.map(function(x){
    //       return f(x);
    //     });
    //   } // expand map function with lambda since map passes index in which messes with curried functions on applicatives
    // });  

    Functor(Function, {
      fmap: function(f){ return compose(f, this); }
    });

    Functor(Identity, {
      fmap: function(f){ return Identity(f(this.val)); }
    });

    Functor(Maybe, {
      fmap: function(f) {
        if(this.val == null) return this;
        return Maybe(f(this.val));
      }
    });
  });
define(
  'applicative',["./util","./functor","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    var K = __dependency1__.K;var fmap = __dependency2__.fmap;

    var Applicative = function(type, defs) {
      type.prototype.pure = defs.pure;
      type.prototype.ap = defs.ap.autoCurry();
    };
    __exports__.Applicative = Applicative;
    var ap = function(a1, a2) {
      return a1.ap(a2);
    }.autoCurry();
    __exports__.ap = ap;
    var pure = function(f) {
      f.ap = fmap(f);
      return f;
    };
    __exports__.pure = pure;
    var liftA2 = function(f, a1, a2) {
      return pure(f).ap(a1).ap(a2);
    }.autoCurry();
    __exports__.liftA2 = liftA2;
    var liftA3 = function(f, a1, a2, a3) {
      return pure(f).ap(a1).ap(a2).ap(a3);
    }.autoCurry();
    __exports__.liftA3 = liftA3;
    Applicative(Function, {
        pure: K,
        ap: function(g) {
            var f = this;
            return function(x) {
                return f(x, g(x));
            };
        }
    });

    Applicative(Array, {
      pure: Array, // needs to be infinite to be correct ziplist
      ap: function(a2) {
        // ziplist implementation
        return map(function(f,i){ return f(a2[i]); }, this);
      }
    });
  });
define(
  'monoid',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    var K = __dependency1__.K;

    var mappend = function(x, y) {
      return x.mappend(x, y);
    };
    __exports__.mappend = mappend;
    var mconcat = function() {
      var xs = Array.prototype.slice.call(arguments);
      if(xs.length == 1) xs = xs[0]; //skip having to call apply
      var f = xs[0].mappend;
      var e = xs[0].mempty();
      return xs.reduce(f, e);
    };
    __exports__.mconcat = mconcat;
    var Monoid = function(type, defs) {
      type.prototype.mempty = defs.mempty;
      type.prototype.mappend = defs.mappend.autoCurry();
    };
    __exports__.Monoid = Monoid;
    // Monoid(Object, {
    //   mempty: function(){ return Object({}) },
    //   mappend: function(x,y){
    //     return Object(unionWith(mappend, x, y));
    //   }
    // });

    Monoid(Number, {
      mempty: K(0),
      mappend: function(x,y) { return x + y; }
    });

    // Monoid(Array, {
    //   mempty: K([]),
    //   mappend: function(x, y) { return x.concat(y); }
    // });

    Monoid(String, {
      mempty: K(""),
      mappend: function(x,y) { return x + y; }
    });

    Monoid(Boolean, {
      mempty: K(false),
      mappend: function(x,y){ return (x || y); }
    });

    Monoid(Function, {
      mempty: K(K({mappend: function(f, g) { return mappend(g.mempty(), g);} })),
      mappend: function(f,g){
        return function() {
          return mappend(f.apply(this, arguments),
            g.apply(this, arguments));
        }
      }
    });
  });
define(
  'monad',["./util","./types","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    var Constructor = __dependency1__.Constructor;
    var Identity = __dependency2__.Identity;
    var Maybe = __dependency2__.Maybe;

    var Monad = function(type, defs) {
      var mbindViaJoin = function(f, mv) {
        return mjoin(mv.fmap(f));
      }.autoCurry();

      var joinViaMbind = function(mmv) { return mmv.mbind(id); }

      type.prototype.mresult = defs.mresult;
      type.prototype.mbind = (defs.mbind && defs.mbind.autoCurry()) || mbindViaJoin;
      type.prototype.mjoin = defs.mjoin || joinViaMbind;
    };
    __exports__.Monad = Monad;
    var mjoin = function(mmv) {
      return mmv.mjoin();
    };
    __exports__.mjoin = mjoin;
    var mbind = function(mv, f) {
      f.mresult = mv.mresult;
      return mv.mbind(f, mv);
    }.autoCurry();
    __exports__.mbind = mbind;
    var ap = function(mf, m) {
      return mbind(mf, function(f){
        return mbind(m, function(x) {
          return m.mresult.call(this, f(x));
        })
      })
    }.autoCurry();
    __exports__.ap = ap;
    // takes variable args like compose does though.
    //+ _mcompose :: (b -> m c) -> (a -> m b) -> (a -> m c)
    //
    //BROKEN: compiled to ES5 strict mode, where assignment
    //to arguments is not allowed
    //export var mcompose = function(){
      //var fns= map(Function.toFunction,arguments),
          //arglen=fns.length;
      //return function() {
        //var restlen = arglen-1;
        //arguments = [fns[arglen-1].apply(this, arguments)];
        //for(var i=restlen;--i>=0;) {
          //console.log(arguments[0]);
          //arguments = [arguments[0].mbind(fns[i], arguments[0])];
        //}
        //return arguments[0];
      //}
    //};


    // liftM2 and on, but needs to work with ap.
    var _liftApplicative = function(f) {
      return function() {
        var args = Array.prototype.slice.apply(arguments)
          , arg_length = args.length
          , result = args[0].mresult.call(this, f)
          , current_arg_idx = 0;

        while(current_arg_idx < arg_length) {
          result = ap(result, args[current_arg_idx]);
          current_arg_idx++;
        }

        return result;
      }
    };

    var _liftFunctor = function(f) {
      return function(m) {
        return mbind(m, function(x){
          return m.mresult.call(this, f(x));
        });
      }
    };

    var liftM = function(f) {
      f = f.toFunction();
      return f.curried ? _liftApplicative(f) : _liftFunctor(f);
    };
    __exports__.liftM = liftM;

    // Built ins

    Monad(Identity, {
      mjoin: function() {
        return this.val;
      },
      mresult: function(x){ return Identity(x); }
    });

    // Monad(Array, {
    //   mresult: Array,
    //   mbind: function(f) {
    //     return flatten(this.map(f));
    //   }
    // });

    Monad(Maybe, {
      mjoin: function() {
        return this.val ? this.val : Maybe(undefined);
      },
      mresult: function(x){ return Maybe(x); }
    });

    //Monad(_Either, {
      //mjoin: function() {
        //return this.right ? this.right : this.left;
      //},
      //mresult: function(x){ return Either(this.left, x); }
    //});

    var State = Constructor(function(runState){
      this.runState = runState;
    });
    __exports__.State = State;
    Monad(State, {
      mresult: function(x){
        return State(function(s){ return [x, s]});
      },
      mbind: function(f) {
        var that = this;
        return State(function(s){
          var result = that.runState(s)
          , g = f(result[0]);
        return g.runState(result[1]);
        });
      }
    });
  });
define(
  'typeclasses',["./util","./functor","./applicative","./monoid","./monad","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    
    var autoCurry = __dependency1__.autoCurry;

    var hasAC = Boolean(Function.prototype.autoCurry);

    if(!hasAC) {
      //the rest of the lib wants autoCurry on Function's prototype
      //this sucks, but I'll clean it up later
      Function.prototype.autoCurry = function(n) {
        return autoCurry(this, n);
      }
    };

    var Functor = __dependency2__.Functor;
    var fmap = __dependency2__.fmap;
    var Applicative = __dependency3__.Applicative;
    var ap = __dependency3__.ap;
    var pure = __dependency3__.pure;
    var liftA2 = __dependency3__.liftA2;
    var liftA3 = __dependency3__.liftA3;
    var Monoid = __dependency4__.Monoid;
    var mappend = __dependency4__.mappend;
    var mconcat = __dependency4__.mconcat;
    var Monad = __dependency5__.Monad;
    var mjoin = __dependency5__.mjoin;
    var mbind = __dependency5__.mbind;
    var mcompose = __dependency5__.mcompose;
    var liftM = __dependency5__.liftM;
    var State = __dependency5__.State;

    if(!hasAC) {
      //remove autoCurry from function's prototype so that it
      //doesn't affect users
      //delete Function.prototype.autoCurry;
    };

    __exports__.Functor = Functor;
    __exports__.fmap = fmap;
    __exports__.Applicative = Applicative;
    __exports__.ap = ap;
    __exports__.pure = pure;
    __exports__.liftA2 = liftA2;
    __exports__.liftA3 = liftA3;
    __exports__.Monoid = Monoid;
    __exports__.mappend = mappend;
    __exports__.mconcat = mconcat;
    __exports__.Monad = Monad;
    __exports__.mjoin = mjoin;
    __exports__.mbind = mbind;
    __exports__.mcompose = mcompose;
    __exports__.liftM = liftM;
    __exports__.State = State;
  });
