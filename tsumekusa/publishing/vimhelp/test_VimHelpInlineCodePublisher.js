// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var InlineCode = require(basePath + '/contents/InlineCode');
var VimHelpInlineCodePublisher = require(basePath +
    '/publishing/vimhelp/VimHelpInlineCodePublisher');

var publisher = VimHelpInlineCodePublisher.getInstance();

exports.testPublish = function(test) {
  var code = new InlineCode('foo.bar()');

  test.equal(publisher.publish(code), '{foo.bar()}');
  test.done();
};
