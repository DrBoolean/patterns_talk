define(['types'], function() {
  Functor = function(type, defs) {
    type.prototype.fmap = defs.fmap;
  }

  fmap = function(f, obj) {
    return obj.fmap(f);
  }.autoCurry();

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
      if(!this.val) return this;
      return Maybe(f(this.val));
    }
  });

  Functor(_Either, {
    fmap: function(f) {
      if(!this.right) return _Either(f(this.left), this.right);
      return _Either(this.left, f(this.right));
    }
  });
});
