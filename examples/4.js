require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var markdown = require('markdown').parse;
var _ = require('lodash');
var Maybe = require('pointfree-fantasy/instances/maybe');
var Either = require('pointfree-fantasy/instances/either');
var Promise = require('../support/promise');
var fs = require('../support/node-promise/fs-promise');
var ampersand = require('../support/arrow').ampersand;
var readFile = function(path) { return fs.readFile(path, 'utf-8') };






var makeUser = function(first, last) { return first +" "+last + ' created!' };

var result = makeUser('Sal', 'Woodsman');
log(result);



























