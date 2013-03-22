// This script licensed under the MIT.
// http://orgachem.mit-license.org

var Benchmark = require('../../node_modules/benchmark');
var basePath = '../../tsumekusa';
var string = require(basePath + '/string');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var WordWrapper2 = require(basePath + '/publishing/WordWrapper2');
var Indent = require(basePath + '/publishing/Indent');

var BASE_LINE_WIDTH = 80;
var HYPHENATION_LINE_WIDTH = 5;

var INDENT_CONST = new Indent(10);
var INDENT_LINEAR = new Indent(0);
INDENT_LINEAR.getIndentWidth = function(lineIdx) {
  return Math.floor(lineIdx / 8);
};

var wrapper = new WordWrapper()
var wrapper2 = new WordWrapper2(BASE_LINE_WIDTH);

var wrapperConst = new WordWrapper()
var wrapper2Const = new WordWrapper2(BASE_LINE_WIDTH, INDENT_CONST);

var wrapperLinear = new WordWrapper()
var wrapper2Linear = new WordWrapper2(BASE_LINE_WIDTH, INDENT_LINEAR);

// Definition of Lorem Ipsum {{{
var LOREM_IPSUM = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit sodales libero nec faucibus. Donec mattis arcu ac orci volutpat sit amet volutpat nunc tristique. Vivamus viverra pulvinar est vestibulum varius. Curabitur et enim eros, a rhoncus nisl. Curabitur cursus posuere lacus, nec tristique massa sagittis nec. Quisque ac ante et ante luctus ultrices. Donec mattis elementum lacus, et adipiscing enim tempus at.',
'Donec convallis dolor ut diam congue in tincidunt nisl sagittis. Aliquam rutrum eleifend aliquet. Sed porta, lacus in congue pretium, mi ligula blandit nunc, et sollicitudin lorem ligula et sapien. Duis erat nisi, hendrerit ut placerat ut, ultricies sed felis. Vestibulum porta est in elit volutpat pulvinar. Nam fermentum nulla at ipsum suscipit ac tincidunt tortor sodales. Nullam in eros elementum odio adipiscing suscipit eu eu nulla. Maecenas pulvinar bibendum arcu at pellentesque. Proin vel purus metus, sit amet faucibus diam. Quisque mattis, arcu a blandit scelerisque, leo magna semper urna, eget sodales turpis nisl in erat. Cras ornare fermentum augue, ut ultricies lacus tincidunt rutrum. Cras eu dolor vitae eros vulputate blandit.', 
'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris elementum, arcu vel vehicula sagittis, nisi erat convallis leo, nec varius tellus enim ac felis. In eget sapien felis, eu interdum leo. Nunc mi dolor, blandit sollicitudin consequat a, ornare a nibh. Nunc luctus tortor tincidunt eros feugiat eu faucibus massa tristique. Proin eu dolor ac quam laoreet ultrices at ac enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer rhoncus, nulla id semper eleifend, orci tortor dapibus nibh, vel faucibus ligula metus sit amet lorem. Curabitur urna mi, dignissim sit amet sollicitudin et, interdum et augue. Sed ut imperdiet nisl. Curabitur semper sem eget turpis tempor tempor. Aliquam aliquam felis sed tortor mollis auctor. Praesent eu nisl iaculis arcu porta consequat non vitae sem. Nullam ultrices est in diam facilisis porta. Cras laoreet, velit nec suscipit sodales, ante ligula molestie felis, id pulvinar lorem purus et enim.',

'Quisque id ante ut ipsum tincidunt pretium et at urna. Aenean commodo porttitor rhoncus. Integer dictum, mauris eget vehicula viverra, eros arcu faucibus lorem, sed hendrerit eros neque a tellus. Pellentesque ut tempus tortor. Maecenas interdum dictum imperdiet. Sed eget volutpat est. Aliquam varius iaculis odio ut placerat. Nunc ut tempus leo. Etiam commodo elementum blandit. Duis consectetur augue leo, a cursus arcu. Proin tempor dapibus enim vel venenatis. Vestibulum felis leo, volutpat ut mollis nec, volutpat ac velit. Mauris nisl velit, bibendum et feugiat luctus, aliquam vel arcu. Pellentesque ullamcorper, urna vel semper porttitor, dui lorem porta nibh, eu commodo arcu dui in lectus. Quisque in lacus ligula, sed viverra ligula. Sed lacinia condimentum dapibus.',

'Donec sollicitudin massa eu ipsum faucibus rutrum. Donec eget metus erat, molestie convallis elit. Sed a molestie nibh. Quisque a enim eros. Phasellus vehicula, tortor ac consectetur rutrum, arcu magna dignissim nisi, at hendrerit neque libero ultricies mi. Maecenas eleifend porttitor tempor. Suspendisse a erat leo. Sed suscipit ullamcorper mauris, id molestie nulla semper quis. Vestibulum porta orci eget purus blandit commodo. Quisque rutrum dui sit amet libero viverra facilisis. Phasellus purus eros, ultricies eget ornare ac, ornare id lacus. Ut aliquam lectus fermentum lacus pretium pulvinar.'];
//}}}

var suite = new Benchmark.Suite();

suite
    .add('WordWrapper#wrap with no indent', function() {
      var wrapper = new WordWrapper()
      wrapper.wrap(LOREM_IPSUM, BASE_LINE_WIDTH);
    })
    .add('WordWrapper2#wrap with no indent', function() {
      var wrapper2 = new WordWrapper2(BASE_LINE_WIDTH);
      wrapper2.wrap(LOREM_IPSUM);
    })
    .add('WordWrapper#wrap with constant width indent', function() {
      var wrapper = new WordWrapper()
      wrapper.wrap(LOREM_IPSUM, BASE_LINE_WIDTH, INDENT_CONST);
    })
    .add('WordWrapper2#wrap with constant width indent', function() {
      var wrapper2 = new WordWrapper2(BASE_LINE_WIDTH, INDENT_CONST);
      wrapper2.wrap(LOREM_IPSUM);
    })
    .add('WordWrapper#wrap with linear width indent', function() {
      var wrapper = new WordWrapper()
      wrapper.wrap(LOREM_IPSUM, BASE_LINE_WIDTH, INDENT_LINEAR);
    })
    .add('WordWrapper2#wrap with linear width indent', function() {
      var wrapper2 = new WordWrapper2(BASE_LINE_WIDTH, INDENT_LINEAR);
      wrapper2.wrap(LOREM_IPSUM);
    })
    .add('WordWrapper#wrap with hyphenation', function() {
      var wrapper = new WordWrapper()
      wrapper.wrap(LOREM_IPSUM, HYPHENATION_LINE_WIDTH);
    })
    .add('WordWrapper2#wrap with hyphenation', function() {
      var wrapper2 = new WordWrapper2(HYPHENATION_LINE_WIDTH);
      wrapper2.wrap(LOREM_IPSUM);
    })
    .on('complete', function() {
      for (var i = 0, l = this.length, benchmark; i < l; ++i) {
          benchmark = this[i];
          var name = benchmark.name;
          var whites = string.repeat(' ', 50 - name.length);

          console.log(name + whites + ': ' + (benchmark.times.period * 1000) + ' msec');
      }
    })
    .run({ 'async': true });
