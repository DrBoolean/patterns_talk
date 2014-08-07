require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var markdown = require('markdown').parse;
var _ = require('lodash')
var Maybe = require('pointfree-fantasy/instances/maybe');
var Either = require('pointfree-fantasy/instances/either');
var Promise = require('../support/promise');
var fs = require('../support/node-promise/fs-promise');
var ampersand = require('../support/arrow').ampersand;
var readFile = function(path) { return fs.readFile(path, 'utf-8') };

function askUser(prompt) {
    var promise = new Promise();
    process.stdin.resume();
    process.stdout.write(prompt+'\n');
    process.stdin.once("data", function (data) {
        promise.resolve(data.toString().trim());
    });
    return promise;
}






var getResults = _.curry(function(text, input) {
	var result = Math.abs(Number(input) - text.length);
	return 'You were '+result+' off';
});

var guessLength = function() {
	return liftA2(getResults, readFile('gadsby.txt'), askUser("What's the length?"))
};

fmap(log, guessLength());























