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
var TypePublisher = require(basePath + '/publishing/TypePublisher');
Type.publisher = new TypePublisher();

exports.testPublishWithTwoTypes = function(test) {
  var ref1 = 'string';
  var ref2 = 'number';

  var dummyTag = {
    type: {
      names: [ref1, ref2]
    }
  };

  var lnk1 = new Link(ref1);
  var lnk2 = new Link(ref2);

  var type = new Type(dummyTag);

  test.equal(type.publish(), lnk1.publish() + '|' + lnk2.publish());
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
