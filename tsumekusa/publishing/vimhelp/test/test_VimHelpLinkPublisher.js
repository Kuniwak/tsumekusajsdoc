// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../../tsumekusa';
var Link = require(basePath + '/dom/Link');

var registry = require(basePath + '/publishing/registry');
var vimhelpPublishers = require(basePath +
    '/publishing/vimhelp/VimHelpPublishers');

registry.registerElementPublishers(vimhelpPublishers);

exports.testPublish = function(test) {
  var link = new Link('foobar');

  test.equal(link.publish(), '|foobar|');

  test.done();
};
