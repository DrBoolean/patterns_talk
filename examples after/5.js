require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var Promise = require('../support/promise');
var Sum = require('pointfree-fantasy/instances/sum').Sum;
var _ = require('lodash');
var fs = require('../support/node-promise/fs-promise');
var asterisk = require('../support/arrow').asterisk;
var readFile = function(path) { return fs.readFile(path, 'utf-8') };

var totalLength = compose(Sum, pluck('length'));

var tally = _.curry(function(f1, f2) {
	compose(log, mconcat, asterisk(totalLength, totalLength))([f1, f2])
});

liftA2(tally, readFile('gadsby.txt'), readFile('blah.txt'));



























