// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');

var basePath = '../../lib';
var Type = require(basePath + '/dom/Type');

exports.testPublishWithTwoTypes = function(test) {
  var dummyTag = {
    type: {
      names: ['string', 'number'],
      original: 'string|number'
    }
  };

  var type = new Type(dummyTag);

  test.equal(type.publish(), '`string`|`number`');
  test.done();
};


exports.testPublishWithNoType = function(test) {
  var dummyTag = {
    type: {
      names: [],
      original: ''
    }
  };

  var type = new Type(dummyTag);

  test.equal(type.publish(), '`?`');
  test.done();
};
