// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var Code = require(basePath + '/contents/Code');
var VimHelpCodePublisher = require(basePath +
    '/publishing/vimhelp/VimHelpCodePublisher');

Code.publisher = new VimHelpCodePublisher();

exports.testPublish = function(test) {
  var code = new Code([
    '',
    'var foobar = function() {',
    '  alert("Foobar");',
    '};',
    ''
  ].join('\n'));

  var CORRECT = [
    '>',
    '      var foobar = function() {',
    '       alert("Foobar");',
    '      };',
  ].join('\n');

  test.equal(code.publish(), CORRECT);
  test.done();
};
