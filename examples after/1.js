require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var markdown = require('markdown').parse;

var L = makeLenses(['body', 'viewed']);

var comment = {id: 2, body: "this is a *great* post!", viewed: false};

var showOnScreen = log;

var prog = compose(showOnScreen, set(L.viewed, true), over(L.body, markdown));

prog(comment);
























