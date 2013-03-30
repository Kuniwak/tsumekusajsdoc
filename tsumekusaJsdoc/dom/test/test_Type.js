// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var registry = require(tsumekusaPath + '/publishing/registry');
var publishers = require(tsumekusaPath + '/publishing/DefaultPublishers');
registry.registerElementPublishers(publishers);

var Link = require(tsumekusaPath + '/dom/Link');

var basePath = '../../../tsumekusaJsdoc';
var Type = require(basePath + '/dom/Type');

exports.testPublishWithTwoTypes = function(test) {
  var dummyTag = {
    type: {
      names: ['string', 'number']
    }
  };

  var type = new Type(dummyTag);

  test.equal(type.publish(), '`string`|`number`');
  test.done();
};


exports.testPublishWithNoType = function(test) {
  var dummyTag = {
    type: {
      names: []
    }
  };

  var type = new Type(dummyTag);

  test.equal(type.publish(), '?');
  test.done();
};
