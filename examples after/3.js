require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);
var _ = require('lodash');

var Maybe = require('pointfree-fantasy/instances/maybe');
var flatMap = _.curry(function(f, x) { return compose(mjoin, fmap(f))(x); });























var showLength = compose(concat('The length is: '), pluck('length'));

var getWords = compose(Maybe, match(/\w+/g));

var getText = compose(Maybe, pluck('text'));

var prog = compose(fmap(showLength), flatMap(getWords), flatMap(getText), Maybe);

var result = prog({text: 'blah blah'});

log(result);






















