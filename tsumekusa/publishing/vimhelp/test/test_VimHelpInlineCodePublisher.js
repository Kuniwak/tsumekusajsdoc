// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../../tsumekusa';
var InlineCode = require(basePath + '/dom/InlineCode');

var registry = require(basePath + '/publishing/registry');
var vimhelpPublishers = require(basePath +
    '/publishing/vimhelp/VimHelpPublishers');

registry.registerElementPublishers(vimhelpPublishers);

exports.testPublish = function(test) {
  var code = new InlineCode('foo.bar()');

  test.equal(code.publish(), '{foo.bar()}');
  test.done();
};
