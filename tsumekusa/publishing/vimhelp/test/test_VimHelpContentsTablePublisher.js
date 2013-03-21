// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../../tsumekusa';
var Container = require(basePath + '/dom/Container');
var Tag = require(basePath + '/dom/Tag');
var Link = require(basePath + '/dom/Link');
var VimHelpContentsTablePublisher = require(basePath +
    '/publishing/vimhelp/VimHelpContentsTablePublisher');
var VimHelpTagPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpTagPublisher');
var VimHelpLinkPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpLinkPublisher');
Tag.publisher = new VimHelpTagPublisher();
Link.publisher = new VimHelpLinkPublisher();

exports.testPublish = function(test) {
  var publisher = new VimHelpContentsTablePublisher();

  var container1 = new Container('container1-1', null, true);
  var container2 = new Container('container1-2', 'foo', true);
  var container3 = new Container('container1-3', 'bar', true);
  var container4 = new Container('container1-4', 'foobar', true);
  var container5 = new Container('container1-5', 'foobarfoo', true);
  var container6 = new Container('container1-6', 'foobarbar', true);

  var subContainers1 = container1.getSubContainers();
  var subContainers2 = container2.getSubContainers();
  var subContainers3 = container3.getSubContainers();
  var subContainers4 = container4.getSubContainers();
  var subContainers5 = container5.getSubContainers();
  var subContainers6 = container6.getSubContainers();

  subContainers1.addChild(container2);
  subContainers2.addChild(container3);
  subContainers2.addChild(container4);
  subContainers4.addChild(container5);
  subContainers1.addChild(container6);

  var CORRECT = [
    'CONTENTS                                               *container1-1-contents*',
    '',
    '  1. container1-2 .............................................. |foo|',
    '   1.1 container1-3 ............................................ |bar|',
    '   1.2 container1-4 ............................................ |foobar|',
    '    1.2.1 container1-5 ......................................... |foobarfoo|',
    '  2. container1-6 .............................................. |foobarbar|',
  ].join('\n');

  test.equal(publisher.publish(container1), CORRECT);
  test.done();
};


exports.testPublishWithLongLink = function(test) {
  var publisher = new VimHelpContentsTablePublisher();

  var container1 = new Container('container2-1', null, true);
  var container2 = new Container('container2-2', 'foo', true);
  var container3 = new Container('container2-3', 'bar', true);
  var container4 = new Container('container2-4', 'foobarfoobarfoobarfoobarfoobar', true);
  var container5 = new Container('container2-5', 'foobarfoo', true);
  var container6 = new Container('container2-6', 'foobarbar', true);

  var subContainers1 = container1.getSubContainers();
  var subContainers2 = container2.getSubContainers();
  var subContainers3 = container3.getSubContainers();
  var subContainers4 = container4.getSubContainers();
  var subContainers5 = container5.getSubContainers();
  var subContainers6 = container6.getSubContainers();

  subContainers1.addChild(container2);
  subContainers2.addChild(container3);
  subContainers2.addChild(container4);
  subContainers4.addChild(container5);
  subContainers1.addChild(container6);

  var CORRECT = [
    'CONTENTS                                               *container2-1-contents*',
    '',
    '  1. container2-2 ..........................................',
    '                                                                       |foo|',
    '   1.1 container2-3 ........................................',
    '                                                                       |bar|',
    '   1.2 container2-4 ........................................',
    '                                            |foobarfoobarfoobarfoobarfoobar|',
    '    1.2.1 container2-5 .....................................',
    '                                                                 |foobarfoo|',
    '  2. container2-6 ..........................................',
    '                                                                 |foobarbar|',
  ].join('\n');

  test.equal(publisher.publish(container1), CORRECT);
  test.done();
};
