// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var Strong = require(basePath + '/dom/Strong');

var registry = require(basePath + '/publishing/registry');
var publishers = require(basePath + '/publishing/DefaultPublishers');

registry.registerElementPublishers(publishers);


exports.testPublish = function(test) {
  var link = new Strong('foo.bar');

  test.equal(link.publish(), '#foo.bar#');
  test.done();
};
