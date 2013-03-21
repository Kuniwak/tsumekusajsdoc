// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../../tsumekusa';
var Link = require(basePath + '/dom/Link');
var VimHelpLinkPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpLinkPublisher');

Link.publisher = new VimHelpLinkPublisher();

exports.testPublish = function(test) {
  var link = new Link('foobar');

  test.equal(link.publish(), '|foobar|');

  test.done();
};
