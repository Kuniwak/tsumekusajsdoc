// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var InlineCode = require(basePath + '/dom/InlineCode');

var registry = require(basePath + '/publishing/registry');
var publishers = require(basePath + '/publishing/DefaultPublishers');

registry.registerElementPublishers(publishers);

exports.testPublish = function(test) {
  var code = new InlineCode('foo.bar()');

  test.equal(code.publish(), '`foo.bar()`');
  test.done();
};
