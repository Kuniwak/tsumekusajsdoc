// This script licensed under the MIT.
// http://orgachem.mit-license.org


var Benchmark = require('../../node_modules/benchmark');
var basePath = '../../tsumekusaJsdoc';
var TypeLexer = require(basePath + '/TypeLexer');


var suite = new Benchmark.Suite();
var parser = new TypeLexer();


suite
    .add('Primitive type', function() {
      parser.parse('boolean');
    })
    .add('Global Object', function() {
      parser.parse('Window');
    })
    .add('User Object', function() {
      parser.parse('goog.ui.Menu');
    })
    .add('Generics with a parameter', function() {
      parser.parse('Array.<string>');
    })
    .add('Generics with two parameters', function() {
      parser.parse('Object.<string, number>');
    })
    .add('Generics in Jsdoc style', function() {
      parser.parse('String[]');
    })
    .add('Formal type union', function() {
      parser.parse('(number|boolean)');
    })
    .add('Informal type union', function() {
      parser.parse('number|boolean');
    })
    .add('Record type', function() {
      parser.parse('{myNum: number, myObject}');
    })
    .add('Record type in generics', function() {
      parser.parse('Array.<{length}>');
    })
    .add('NUllable type', function() {
      parser.parse('?number');
    })
    .add('Nullable on a tail', function() {
      parser.parse('goog.ui.Component?');
    })
    .add('Non nullable type', function() {
      parser.parse('!Object');
    })
    .add('Non nullable type on a tail', function() {
      parser.parse('Object!');
    })
    .add('Function type', function() {
      parser.parse('Function');
    })
    .add('Function type with no parameter', function() {
      parser.parse('function()');
    })
    .add('Function type with a parameter', function() {
      parser.parse('function(string)');
    })
    .add('Function type with two parameters', function() {
      parser.parse('function(string, boolean)');
    })
    .add('Function type with a return', function() {
      parser.parse('function(): number');
    })
    .add('Function type with a context type', function() {
      parser.parse('function(this:goog.ui.Menu, string)');
    })
    .add('Function type as a constructor', function() {
      parser.parse('function(new:goog.ui.Menu, string)');
    })
    .add('Function type with variable parameters', function() {
      parser.parse('function(string, ...[number]): number');
    })
    .add('Function type with nullable or optional parameters', function() {
      parser.parse('function(?string=, number=)');
    })
    .add('Function type as goog.ui.Component#forEachChild', function() {
      parser.parse('function(this:T,?,number):?');
    })
    .add('Variable type', function() {
      parser.parse('...number');
    })
    .add('Optional type', function() {
      parser.parse('number=');
    })
    .add('All type', function() {
      parser.parse('*');
    })
    .add('Unknown type', function() {
      parser.parse('?');
    })
    .add('Unknown type with a keyword', function() {
      parser.parse('unknown');
    })
    .add('Optional type with a "undefined" keyword', function() {
      parser.parse('Object|undefined');
    })
    .add('Optional type with a "void" keyword', function() {
      parser.parse('Object|void');
    })
    .on('complete', function() {
      var elapsed = 0;
      for (var i = 0, l = this.length, benchmark; i < l; ++i) {
          benchmark = this[i];
          var name = benchmark.name;
          var whites = string.repeat(' ', 55 - name.length);

          console.log(name + whites + ': ' + (benchmark.times.period * 1000) + ' msec');
          elapsed += benchmark.times.elapsed;
      }
      console.log('Complete (' + benchmark.times.elapsed + ' sec)');
    })
    .run({ 'async': true });
