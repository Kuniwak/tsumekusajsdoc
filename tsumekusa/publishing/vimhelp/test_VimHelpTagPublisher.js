// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../tsumekusa';
var Tag = require(basePath + '/contents/Tag');
var TagFactory = require(basePath + '/contents/TagFactory');
var VimHelpTagPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpTagPublisher');

Tag.publisher = new VimHelpTagPublisher();

exports.testPublish = function(test) {
  var tag = TagFactory.createTag('foobar');

  test.equal(tag.publish(), '*foobar*');
  test.done();
};
