define(['types'], function() {
  mappend = function(x, y) {
    return x.mappend(x, y);
  }

  mconcat = function() {
    var xs = Array.prototype.slice.call(arguments);
    if(xs.length == 1) xs = xs[0]; //skip having to call apply
    var f = xs[0].mappend;
    var e = xs[0].mempty();
    return xs.reduce(f, e);
  }

  Monoid = function(type, defs) {
    type.prototype.mempty = defs.mempty;
    type.prototype.mappend = defs.mappend.autoCurry();
  }

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
  //   mappend: concat
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