require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('pointfree-fantasy').expose(global);
require('lenses').expose(global);

var curry = require('lodash.curry');
var Maybe = require('pointfree-fantasy/instances/maybe');
var Promise = require('../support/promise');
var flatMap = curry(function(f, x) { return compose(mjoin, fmap(f))(x); });


var safeGet = curry(function(name, obj) { return compose(Maybe, pluck(name))(obj); });

var Db = {
	getUser: function(id) {
		var p = new Promise();
		setTimeout(function() { p.resolve(Maybe(users[id])); }, 10);
		return p;
	}
};










var users = [ {name: 'Kate', addresses:[{street: {number: 22, name: 'Walnut St.'}}]}
						, {name: "Ajit", addresses:[{street: {number: 52, name: 'Crane Ave.'}}]}
						];


var L = makeLenses(['addresses']);

var dbResp = compose(mapped, mapped);

var usersAddresses = compose(dbResp, L.addresses);

var firstStreetsName = compose(flatMap(safeGet('name')), flatMap(safeGet('street')), safeGet(0));

var upperLog = compose(log, toUpperCase);

var upperCaseTheStreet = compose(fmap(upperLog), firstStreetsName);

var prog = compose( over(usersAddresses, upperCaseTheStreet)
									, Db.getUser
									, pluck('id')
									);

prog({id: 0});








