// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var InlineCode = require(basePath + '/dom/InlineCode');
var VimHelpInlineCodePublisher = require(basePath +
    '/publishing/vimhelp/VimHelpInlineCodePublisher');

InlineCode.publisher = new VimHelpInlineCodePublisher();

exports.testPublish = function(test) {
  var code = new InlineCode('foo.bar()');

  test.equal(code.publish(), '{foo.bar()}');
  test.done();
};
