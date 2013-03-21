// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../../tsumekusa';
var Tag = require(basePath + '/dom/Tag');
var TagFactory = require(basePath + '/dom/TagFactory');
var VimHelpTagPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpTagPublisher');

Tag.publisher = new VimHelpTagPublisher();

exports.testPublish = function(test) {
  var tag = TagFactory.createTag('foobar');

  test.equal(tag.publish(), '*foobar*');
  test.done();
};
