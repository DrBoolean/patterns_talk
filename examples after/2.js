require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var Maybe = require('pointfree-fantasy/instances/maybe');
var Either = require('pointfree-fantasy/instances/either');
var Promise = require('../support/promise');
var fs = require('../support/node-promise/fs-promise');
var readFile = function(path) { return fs.readFile(path, 'utf-8') };



var showLength = compose(concat('The length is: '), pluck('length'));

var getWords = compose(Maybe, match(/\w+/g));

var prog = compose(fmap(showLength), getWords);

var result = prog('i got some words');

log(result);


























