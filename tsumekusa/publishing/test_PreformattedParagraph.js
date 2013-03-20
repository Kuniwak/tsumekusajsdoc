// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var PreformattedParagraph = require(basePath +
    '/dom/PreformattedParagraph');
var PreformattedParagraphPublisher = require(basePath +
    '/publishing/PreformattedParagraphPublisher');


var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


exports.testPublishWithDisplayWidth = function(test) {
  PreformattedParagraph.publisher = new PreformattedParagraphPublisher();
  PreformattedParagraph.publisher.setDisplayWidth(80);

  var p = new PreformattedParagraph(LOREM_IPSUM);

  var CORRECT = [
    '',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
    'incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
    'aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    'fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
    'deserunt mollit anim id est laborum.',
    ''
  ].join('\n');

  test.equal(p.publish(), CORRECT);
  test.done();
};

exports.testPublish = function(test) {
  PreformattedParagraph.publisher = new PreformattedParagraphPublisher();
  var p = new PreformattedParagraph(LOREM_IPSUM);

  var CORRECT = [
    '',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ''
  ].join('\n');

  test.equal(p.publish(), CORRECT);
  test.done();
};
