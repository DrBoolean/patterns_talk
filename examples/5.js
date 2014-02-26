require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var Promise = require('../support/promise');
var Sum = require('pointfree-fantasy/instances/sum').Sum;
var _ = require('lodash')
var fs = require('../support/node-promise/fs-promise');
var asterisk = require('../support/arrow').asterisk;
var readFile = function(path) { return fs.readFile(path, 'utf-8') };




var p1 = readFile('gadsby.txt')
var p2 = readFile('blah.txt')

var result = ?



























