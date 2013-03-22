// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../tsumekusa/';
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');


var LOREM_IPSUM = [[
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  ].join('\n')];


exports.testWrapWithNoIndent = function(test) {
  // General condition
  var CORRECT = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
    'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
    'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in',
    'culpa qui officia deserunt mollit anim id est laborum.'
  ].join('\n');
 
  var wrapper = new WordWrapper(80);
  test.equal(wrapper.wrap(LOREM_IPSUM), CORRECT);
  test.done();
};

exports.testWrapWithHypenation = function(test) {
  // Hard condition
  var CORRECT = [
    'Lorem', 'ipsum', 'dolor', 'sit',
    'amet,', 'cons-', 'ecte-', 'tur',
    'adip-', 'isic-', 'ing', 'elit,',
    'sed', 'do e-', 'iusm-', 'od t-',
    'empor', 'inci-', 'didu-', 'nt ut',
    'labo-', 're et', 'dolo-', 're',
    'magna', 'aliq-', 'ua.', 'Ut',
    'enim', 'ad', 'minim', 'veni-',
    'am,', 'quis', 'nost-', 'rud',
    'exer-', 'cita-', 'tion', 'ulla-',
    'mco', 'labo-', 'ris', 'nisi',
    'ut a-', 'liqu-', 'ip ex', 'ea c-',
    'ommo-', 'do c-', 'onse-', 'quat.',
    'Duis', 'aute', 'irure', 'dolor',
    'in r-', 'epre-', 'hend-', 'erit',
    'in v-', 'olup-', 'tate', 'velit',
    'esse', 'cill-', 'um d-', 'olore',
    'eu f-', 'ugiat', 'nulla', 'pari-',
    'atur.', 'Exce-', 'pteur', 'sint',
    'occa-', 'ecat', 'cupi-', 'datat',
    'non', 'proi-', 'dent,', 'sunt',
    'in', 'culpa', 'qui', 'offi-',
    'cia', 'dese-', 'runt', 'moll-',
    'it', 'anim', 'id', 'est',
    'labo-', 'rum.'
  ].join('\n');

  var wrapper = new WordWrapper(5);
  test.equal(wrapper.wrap(LOREM_IPSUM), CORRECT);
  test.done();
};

exports.testWrapWithIndent = function(test) {
  var indent = new Indent();
  indent.getIndentWidth = function(lineIdx) {
    return lineIdx;
  };

  // Indent test.
  var CORRECT = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
    ' sed do eiusmod tempor incididunt ut labore et dolore magna',
    '  aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    '   ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    '    Duis aute irure dolor in reprehenderit in voluptate',
    '     velit esse cillum dolore eu fugiat nulla pariatur.',
    '      Excepteur sint occaecat cupidatat non proident, sunt',
    '       in culpa qui officia deserunt mollit anim id est',
    '        laborum.'
  ].join('\n');

  var wrapper = new WordWrapper(60, indent);
  test.equal(wrapper.wrap(LOREM_IPSUM), CORRECT);
  test.done();
};

exports.testWrapKeepBreak = function(test) {
  var CORRECT = [
    'Lorem ipsum dolor sit amet, consectetur',
    'adipisicing elit, sed do eiusmod tempor',
    'incididunt ut labore et dolore magna',
    'aliqua.',
    'Ut enim ad minim veniam, quis nostrud',
    'exercitation ullamco laboris nisi ut',
    'aliquip ex ea commodo consequat. Duis',
    'aute irure dolor in reprehenderit in',
    'voluptate velit esse cillum dolore eu',
    'fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non',
    'proident, sunt in culpa qui officia',
    'deserunt mollit anim id est laborum.'
  ].join('\n');

  var wrapper = new WordWrapper(40);
  test.equal(wrapper.wrap(LOREM_IPSUM, true), CORRECT);
  test.done();
};
