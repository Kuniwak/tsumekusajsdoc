// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var Code = require(basePath + '/dom/Code');

var registry = require(basePath + '/publishing/registry');
var publishers = require(basePath + '/publishing/DefaultPublishers');

registry.registerElementPublishers(publishers);


exports.testPublish = function(test) {
  var CODE = [
    'function example() {',
    '  document.write("Hello, world!");',
    '}'
  ].join('\n');

  var code = new Code(CODE);

  test.equal(code.publish(), CODE);
  test.done();
};
