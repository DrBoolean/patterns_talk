require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var Maybe = require('pointfree-fantasy/instances/maybe');
var Promise = require('../support/promise');
var fs = require('../support/node-promise/fs-promise');
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




var showLength = compose(concat('The length is: '), pluck('length'))

var getWords = compose(Maybe, match(/\w+/g));

var showWordLength = compose(fmap(showLength), getWords);

var prog = compose(fmap(showWordLength), mjoin, fmap(readFile), askUser);

var result = prog('what file?');

fmap(log, result);




















