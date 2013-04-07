// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var registry = require(tsumekusaPath + '/publishing/registry');
var publishers = require(tsumekusaPath + '/publishing/DefaultPublishers');
registry.registerElementPublishers(publishers);

var InlineCode = require(tsumekusaPath + '/dom/InlineCode');

var basePath = '../../../tsumekusaJsdoc';
var ObjectDigest = require(basePath + '/dom/ObjectDigest');
var Type = require(basePath + '/dom/Type');


exports.testPublish = function(test) {
  var typeName = 'boolean';
  var symbolName = 'foo.bar';

  var dummyDoclet = {
    longname: symbolName,
    type: {
      names: [typeName]
    }
  };

  var code1 = new InlineCode(symbolName);
  var code2 = new InlineCode(typeName);

  var digest = new ObjectDigest(dummyDoclet);
  test.equal(digest.publish(), '`foo.bar`: `boolean`');
  test.done();
};
