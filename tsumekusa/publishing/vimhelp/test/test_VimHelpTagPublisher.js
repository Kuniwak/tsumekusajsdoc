// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../../tsumekusa';
var Tag = require(basePath + '/dom/Tag');
var TagFactory = require(basePath + '/dom/TagFactory');

var registry = require(basePath + '/publishing/registry');
var vimhelpPublishers = require(basePath +
    '/publishing/vimhelp/VimHelpPublishers');

registry.registerElementPublishers(vimhelpPublishers);

exports.testPublish = function(test) {
  var tag = TagFactory.createTag('foobar');

  test.equal(tag.publish(), '*foobar*');
  test.done();
};
