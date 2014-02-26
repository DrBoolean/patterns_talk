define([], function() {
  Constructor = function(f) {
    var x = function(){
      if(!(this instanceof x)){
        var inst = new x();
        f.apply(inst, arguments);
        return inst;
      }
      f.apply(this, arguments);
    };

    return x;
  }

  makeType = function(f) {
    f = f || function(v){ this.val = v; }
    return Constructor(f);
  }

  // Some default types
  UI = makeType();
  PromiseWrapper = makeType();

  Identity = makeType();

  Maybe = makeType();

  // _Either is a temporary hack until we can keep a consistent prototype during autoCurry
  _Either = Constructor(function(left, right){
    this.left = left;
    this.right = right;                    
  });

  Either = function(left, right){
    return _Either(left, right);
  }.autoCurry();

  return makeType;
})
