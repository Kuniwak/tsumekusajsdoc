// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var PreformattedParagraph = require(basePath +
    '/contents/PreformattedParagraph');
var VimHelpPreformattedParagraphPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpPreformattedParagraphPublisher');

var publisher = new VimHelpPreformattedParagraphPublisher();

var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

exports.testPublish = function(test) {
  var p = new PreformattedParagraph(LOREM_IPSUM);

  var CORRECT = [
    '',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    'tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
    'aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
    'eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
    'deserunt mollit anim id est laborum.',
    ''
  ].join('\n');

  test.equal(publisher.publish(p), CORRECT);
  test.done();
};
