// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../tsumekusa';
var TagFactory = require(basePath + '/contents/TagFactory');
var VimHelpTagPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpTagPublisher');

var publisher = new VimHelpTagPublisher();

exports.testPublish = function(test) {
  var tag = TagFactory.createTag('foobar');

  test.equal(publisher.publish(tag), '*foobar*');
  test.done();
};
