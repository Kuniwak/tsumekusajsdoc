// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../../tsumekusa';
var Code = require(basePath + '/dom/Code');

var registry = require(basePath + '/publishing/registry');
var vimhelpPublishers = require(basePath +
    '/publishing/vimhelp/VimHelpPublishers');

registry.registerElementPublishers(vimhelpPublishers);

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
