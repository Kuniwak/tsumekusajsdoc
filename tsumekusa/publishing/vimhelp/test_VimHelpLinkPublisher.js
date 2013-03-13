// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../tsumekusa';
var Link = require(basePath + '/contents/Link');
var VimHelpLinkPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpLinkPublisher');

var publisher = new VimHelpLinkPublisher();

exports.testPublish = function(test) {
  var link = new Link('foobar');

  test.equal(publisher.publish(link), '|foobar|');

  test.done();
};
