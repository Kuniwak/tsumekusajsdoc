// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/dom/Link');
var LinkPublisher = require(tsumekusaPath + '/publishing/LinkPublisher');
Link.publisher = new LinkPublisher();

var basePath = '../../../tsumekusaJsdoc';
var Type = require(basePath + '/dom/Type');
var TypePublisher = require(basePath + '/publishing/TypePublisher');
Type.publisher = new TypePublisher();

exports.testPublishWithTwoTypes = function(test) {
  var dummyTag = {
    type: {
      names: ['string', 'number']
    }
  };

  var type = new Type(dummyTag);

  test.equal(type.publish(), 'string|number');
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
