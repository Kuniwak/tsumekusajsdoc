// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/contents/Link');
var LinkPublisher = require(tsumekusaPath + '/publishing/LinkPublisher');
Link.publisher = new LinkPublisher();

var basePath = '../../tsumekusaJsdoc';
var ObjectDigest = require(basePath + '/documents/ObjectDigest');


exports.testPublish = function(test) {
  var dummyDoclet = {
    longname: 'foo.bar',
    type: {
      names: ['boolean']
    }
  };

  var digest = new ObjectDigest(dummyDoclet);
  test.equal(digest.publish(), 'foo.bar: boolean');
  test.done();
};
