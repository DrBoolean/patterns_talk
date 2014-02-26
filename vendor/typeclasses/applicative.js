define(['functor'], function() {
  Applicative = function(type, defs) {
    type.prototype.pure = defs.pure;
    type.prototype.ap = defs.ap.autoCurry();
  }

  ap = function(a1, a2) {
    return a1.ap(a2);
  }.autoCurry();

  pure = function(f) {
    f.ap = fmap(f);
    return f;
  }

  liftA2 = function(f, a1, a2) {
    return pure(f).ap(a1).ap(a2);
  }.autoCurry();

  liftA3 = function(f, a1, a2, a3) {
    return pure(f).ap(a1).ap(a2).ap(a3);
  }.autoCurry();

  Applicative(Function, {
      pure: K,
      ap: function(g) {
          var f = this;
          return function(x) {
              return f(x, g(x));
          };
      }
  });

  // Applicative(Array, {
  //   pure: Array, // needs to be infinite to be correct ziplist
  //   ap: function(a2) {
  //     // ziplist implementation
  //     return map(function(f,i){ return f(a2[i]); }, this);
  //   }
  // });
});
