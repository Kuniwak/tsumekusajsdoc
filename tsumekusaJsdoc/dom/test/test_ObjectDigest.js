// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/dom/Link');
var LinkPublisher = require(tsumekusaPath + '/publishing/LinkPublisher');
Link.publisher = new LinkPublisher();

var basePath = '../../../tsumekusaJsdoc';
var ObjectDigest = require(basePath + '/dom/ObjectDigest');
var Type = require(basePath + '/dom/Type');
var TypePublisher = require(basePath + '/publishing/TypePublisher');
Type.publisher = new TypePublisher();


exports.testPublish = function(test) {
  var ref = 'boolean';
  var dummyDoclet = {
    longname: 'foo.bar',
    type: {
      names: [ref]
    }
  };

  var lnk = new Link(ref);

  var digest = new ObjectDigest(dummyDoclet);
  test.equal(digest.publish(), 'foo.bar: ' + lnk.publish());
  test.done();
};
