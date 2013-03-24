// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusaJsdoc';
var TypeParser = require(basePath + '/TypeParser');


var allEvents = [];
for (eventType in TypeParser.EventType) {
  allEvents.push(TypeParser.EventType[eventType]);
}

var parser;

exports.setUp = function(callback) {
  parser = new TypeParser();

  allEvents.forEach(function(e) {
    parser.addEventListener(e, function(eventType, str) {
      console.log(eventType, str);
    });
  });

  callback();
};

exports.testParseWithPrimitiveTypeName = function(test) {
  parser.parse('boolean');
  test.done();
};


exports.testParseWithGlobalTypeName = function(test) {
  parser.parse('Window');
  test.done();
}


exports.testParseWithUserTypeName = function(test) {
  parser.parse('goog.ui.Menu');
  test.done();
}


exports.testParseWithGenericParam = function(test) {
  parser.parse('Array.<string>');
  test.done();
};


exports.testParseWithGenericParams = function(test) {
  parser.parse('Object.<string, number>');
  test.done();
};


exports.testParseWithJsdocGeneric = function(test) {
  parser.parse('String[]');
  test.done();
};


exports.testParseWithFormalUnion = function(test) {
  parser.parse('(number|boolean)');
  test.done();
};


exports.testParseWithInformalUnion = function(test) {
  parser.parse('number|boolean');
  test.done();
};


exports.testParseWithRecord = function(test) {
  parser.parse('{myNum: number, myObject}');
  test.done();
};


exports.testParseWithGenericsRecord = function(test) {
  parser.parse('Array.<{length}>');
  test.done();
};


exports.testParseWithNullableOnHead = function(test) {
  parser.parse('?number');
  test.done();
};


exports.testParseWithNullableOnTail = function(test) {
  parser.parse('goog.ui.Component?');
  test.done();
};


exports.testParseWithNonNullableOnHead = function(test) {
  parser.parse('!Object');
  test.done();
};


exports.testParseWithNonNullableOnTail = function(test) {
  parser.parse('Object!');
  test.done();
};


exports.testParseWithFunctionType = function(test) {
  parser.parse('Function');
  test.done();
};


exports.testParseWithFunctionTypeWithNoParam = function(test) {
  parser.parse('function()');
  test.done();
};


exports.testParseWithFunctionTypeWithParam = function(test) {
  parser.parse('function(string)');
  test.done();
};


exports.testParseWithFunctionTypeWithParams = function(test) {
  parser.parse('function(string, boolean)');
  test.done();
};


exports.testParseWithFunctionTypeWithReturn = function(test) {
  parser.parse('function(): number');
  test.done();
};


exports.testParseWithFunctionTypeWithThis = function(test) {
  parser.parse('function(this:goog.ui.Menu, string)');
  test.done();
};


exports.testParseWithFunctionTypeWithNew = function(test) {
  parser.parse('function(new:goog.ui.Menu, string)');
  test.done();
};


exports.testParseWithFunctionTypeWithVariableParams = function(test) {
  parser.parse('function(string, ...[number]): number');
  test.done();
};


exports.testParseWithFunctionTypeWithNullableAndOptional = function(test) {
  parser.parse('function(?string=, number=)');
  test.done();
};

exports.testParseWithFunctionTypeWithGoogUiComponentForEachChild = function(test) {
  parser.parse('function(this:T,?,number):?');
  test.done();
};


exports.testParseVariable = function(test) {
  parser.parse('...number');
  test.done();
};


exports.testParseOptional = function(test) {
  parser.parse('number=');
  test.done();
};


exports.testParseAllType = function(test) {
  parser.parse('*');
  test.done();
};


exports.testParseUnknown = function(test) {
  parser.parse('?');
  test.done();
};


exports.testParseUnknownByKeyword = function(test) {
  parser.parse('unknown');
  test.done();
};


exports.testParseOptionalByPrimitiveUndefined = function(test) {
  parser.parse('Object|undefined');
  test.done();
};


exports.testParseOptionalByVoid = function(test) {
  parser.parse('Object|void');
  test.done();
};
