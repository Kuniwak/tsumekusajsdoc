// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusaJsdoc';
var TypeBuilder = require(basePath + '/TypeBuilder');


var builder;

exports.setUp = function(callback) {
  builder = new TypeBuilder();
  callback();
};

exports.testBuildWithPrimitiveTypeName = function(test) {
  builder.setTypeString('boolean');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'boolean');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'boolean');
  test.done();
};


exports.testBuildWithGlobalTypeName = function(test) {
  builder.setTypeString('Window');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'Window');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'Window');
  test.done();
}


exports.testBuildWithUserTypeName = function(test) {
  builder.setTypeString('goog.ui.Menu');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'goog.ui.Menu');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'goog.ui.Menu');
  test.done();
}


exports.testBuildWithGenericParam = function(test) {
  builder.setTypeString('Array.<string>');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var generic = union.types[0];
  test.equal(generic.genericTypeName, 'Array');
  test.equal(generic.parameterTypeUnions.length, 1);

  var paramUnion = generic.parameterTypeUnions[0];
  test.equal(paramUnion.types.length, 1);
  test.equal(paramUnion.types[0], 'string');
  test.equal(paramUnion.optional, false);
  test.equal(paramUnion.nullable, false);
  test.equal(paramUnion.nonNullable, false);
  test.equal(paramUnion.variable, false);
  test.equal(paramUnion.all, false);
  test.equal(paramUnion.unknown, false);

  test.equal(union.toString(), 'Array.<string>');
  test.done();
};


exports.testBuildWithGenericParams = function(test) {
  builder.setTypeString('Object.<string, number>');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var generic = union.types[0];
  test.equal(generic.genericTypeName, 'Object');
  test.equal(generic.parameterTypeUnions.length, 2);

  var paramUnion1 = generic.parameterTypeUnions[0];
  test.equal(paramUnion1.types.length, 1);
  test.equal(paramUnion1.types[0], 'string');
  test.equal(paramUnion1.optional, false);
  test.equal(paramUnion1.nullable, false);
  test.equal(paramUnion1.nonNullable, false);
  test.equal(paramUnion1.variable, false);
  test.equal(paramUnion1.all, false);
  test.equal(paramUnion1.unknown, false);

  var paramUnion2 = generic.parameterTypeUnions[1];
  test.equal(paramUnion2.types.length, 1);
  test.equal(paramUnion2.types[0], 'number');
  test.equal(paramUnion2.optional, false);
  test.equal(paramUnion2.nullable, false);
  test.equal(paramUnion2.nonNullable, false);
  test.equal(paramUnion2.variable, false);
  test.equal(paramUnion2.all, false);
  test.equal(paramUnion2.unknown, false);

  test.equal(union.toString(), 'Object.<string, number>');
  test.done();
};


exports.testBuildWithJsdocGeneric = function(test) {
  builder.setTypeString('String[]');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var generic = union.types[0];
  test.equal(generic.genericTypeName, 'Array');
  test.equal(generic.parameterTypeUnions.length, 1);

  var paramUnion = generic.parameterTypeUnions[0];
  test.equal(paramUnion.types.length, 1);
  test.equal(paramUnion.types[0], 'String');
  test.equal(paramUnion.optional, false);
  test.equal(paramUnion.nullable, false);
  test.equal(paramUnion.nonNullable, false);
  test.equal(paramUnion.variable, false);
  test.equal(paramUnion.all, false);
  test.equal(paramUnion.unknown, false);

  test.equal(union.toString(), 'Array.<String>');
  test.done();
};


exports.testBuildWithFormalUnion = function(test) {
  builder.setTypeString('(number|boolean)');
  union = builder.build();
  test.equal(union.types.length, 2);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.types[0], 'number');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.types[1], 'boolean');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'number|boolean');
  test.done();
};


exports.testBuildWithInformalUnion = function(test) {
  builder.setTypeString('number|boolean');
  union = builder.build();
  test.equal(union.types.length, 2);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.types[0], 'number');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.types[1], 'boolean');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'number|boolean');
  test.done();
};


exports.testBuildWithRecordWithEntry = function(test) {
  builder.setTypeString('{myNum}');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var record = union.types[0];
  test.equal(record.entries.length, 1);

  var entry = record.entries[0];
  test.equal(entry.name, 'myNum');

  var valUnion = entry.typeUnion;
  test.equal(valUnion.types.length, 0);
  test.equal(valUnion.optional, false);
  test.equal(valUnion.nullable, false);
  test.equal(valUnion.nonNullable, false);
  test.equal(valUnion.variable, false);
  test.equal(valUnion.all, true);
  test.equal(valUnion.unknown, false);

  test.equal(union.toString(), '{ myNum: * }');
  test.done();
};


exports.testBuildWithRecordWithEntries = function(test) {
  builder.setTypeString('{myNum: number, myObject}');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var record = union.types[0];
  test.equal(record.entries.length, 2);

  var entry1 = record.entries[0];
  test.equal(entry1.name, 'myNum');

  var valUnion1 = entry1.typeUnion;
  test.equal(valUnion1.types.length, 1);
  test.equal(valUnion1.types[0], 'number');
  test.equal(valUnion1.optional, false);
  test.equal(valUnion1.nullable, false);
  test.equal(valUnion1.nonNullable, false);
  test.equal(valUnion1.variable, false);
  test.equal(valUnion1.all, false);
  test.equal(valUnion1.unknown, false);

  var entry2 = record.entries[1];
  test.equal(entry2.name, 'myObject');

  var valUnion2 = entry2.typeUnion;
  test.equal(valUnion2.types.length, 0);
  test.equal(valUnion2.optional, false);
  test.equal(valUnion2.nullable, false);
  test.equal(valUnion2.nonNullable, false);
  test.equal(valUnion2.variable, false);
  test.equal(valUnion2.all, true);
  test.equal(valUnion2.unknown, false);

  test.equal(union.toString(), '{ myNum: number, myObject: * }');
  test.done();
};


exports.testBuildWithGenericsRecord = function(test) {
  builder.setTypeString('Array.<{length}>');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var generic = union.types[0];
  test.equal(generic.genericTypeName, 'Array');
  test.equal(generic.parameterTypeUnions.length, 1);

  var valUnion = generic.parameterTypeUnions[0];

  test.equal(valUnion.types.length, 1);
  test.equal(valUnion.optional, false);
  test.equal(valUnion.nullable, false);
  test.equal(valUnion.nonNullable, false);
  test.equal(valUnion.variable, false);
  test.equal(valUnion.all, false);
  test.equal(valUnion.unknown, false);

  var record = valUnion.types[0];
  test.equal(record.entries.length, 1);

  var entry = record.entries[0];
  test.equal(entry.name, 'length');

  var valUnion = entry.typeUnion;
  test.equal(valUnion.types.length, 0);
  test.equal(valUnion.optional, false);
  test.equal(valUnion.nullable, false);
  test.equal(valUnion.nonNullable, false);
  test.equal(valUnion.variable, false);
  test.equal(valUnion.all, true);
  test.equal(valUnion.unknown, false);

  test.equal(union.toString(), 'Array.<{ length: * }>');
  test.done();
};


exports.testBuildWithNullableOnHead = function(test) {
  builder.setTypeString('?number');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'number');
  test.equal(union.optional, false);
  test.equal(union.nullable, true);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'number|null');
  test.done();
};


exports.testBuildWithNullableOnTail = function(test) {
  builder.setTypeString('goog.ui.Component?');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'goog.ui.Component');
  test.equal(union.optional, false);
  test.equal(union.nullable, true);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'goog.ui.Component|null');
  test.done();
};


exports.testBuildWithNonNullableOnHead = function(test) {
  builder.setTypeString('!Object');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'Object');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, true);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), '!Object');
  test.done();
};


exports.testBuildWithNonNullableOnTail = function(test) {
  builder.setTypeString('Object!');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'Object');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, true);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), '!Object');
  test.done();
};


exports.testBuildWithFunctionType = function(test) {
  builder.setTypeString('Function');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'Function');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'Function');
  test.done();
};


exports.testBuildWithFunctionTypeWithNoParam = function(test) {
  builder.setTypeString('function()');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 0);
  test.equal(func.returnTypeUnion, null);
  test.equal(func.contextTypeUnion, null);
  test.equal(func.isConstructor, false);

  test.equal(union.toString(), 'function()');
  test.done();
};


exports.testBuildWithFunctionTypeWithParam = function(test) {
  builder.setTypeString('function(string)');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 1);
  test.equal(func.returnTypeUnion, null);
  test.equal(func.contextTypeUnion, null);
  test.equal(func.isConstructor, false);

  var paramUnion = func.parameterTypeUnions[0];
  test.equal(paramUnion.types.length, 1);
  test.equal(paramUnion.types[0], 'string');
  test.equal(paramUnion.optional, false);
  test.equal(paramUnion.nullable, false);
  test.equal(paramUnion.nonNullable, false);
  test.equal(paramUnion.variable, false);
  test.equal(paramUnion.all, false);
  test.equal(paramUnion.unknown, false);

  test.equal(union.toString(), 'function(string)');
  test.done();
};


exports.testBuildWithFunctionTypeWithParams = function(test) {
  builder.setTypeString('function(string, boolean)');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 2);
  test.equal(func.returnTypeUnion, null);
  test.equal(func.contextTypeUnion, null);
  test.equal(func.isConstructor, false);

  var paramUnion1 = func.parameterTypeUnions[0];
  test.equal(paramUnion1.types.length, 1);
  test.equal(paramUnion1.types[0], 'string');
  test.equal(paramUnion1.optional, false);
  test.equal(paramUnion1.nullable, false);
  test.equal(paramUnion1.nonNullable, false);
  test.equal(paramUnion1.variable, false);
  test.equal(paramUnion1.all, false);
  test.equal(paramUnion1.unknown, false);

  var paramUnion2 = func.parameterTypeUnions[1];
  test.equal(paramUnion2.types.length, 1);
  test.equal(paramUnion2.types[0], 'boolean');
  test.equal(paramUnion2.optional, false);
  test.equal(paramUnion2.nullable, false);
  test.equal(paramUnion2.nonNullable, false);
  test.equal(paramUnion2.variable, false);
  test.equal(paramUnion2.all, false);
  test.equal(paramUnion2.unknown, false);

  test.equal(union.toString(), 'function(string, boolean)');
  test.done();
};


exports.testBuildWithFunctionTypeWithReturn = function(test) {
  builder.setTypeString('function(): number');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 0);
  test.equal(func.contextTypeUnion, null);
  test.equal(func.isConstructor, false);

  var returnUnion = func.returnTypeUnion;
  test.equal(returnUnion.types.length, 1);
  test.equal(returnUnion.types[0], 'number');
  test.equal(returnUnion.optional, false);
  test.equal(returnUnion.nullable, false);
  test.equal(returnUnion.nonNullable, false);
  test.equal(returnUnion.variable, false);
  test.equal(returnUnion.all, false);
  test.equal(returnUnion.unknown, false);

  test.equal(union.toString(), 'function(): number');
  test.done();
};


exports.testBuildWithFunctionTypeWithThis = function(test) {
  builder.setTypeString('function(this:goog.ui.Menu, string)');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 1);
  test.equal(func.returnTypeUnion, null);
  test.equal(func.isConstructor, false);

  var contextUnion = func.contextTypeUnion;
  test.equal(contextUnion.types.length, 1);
  test.equal(contextUnion.types[0], 'goog.ui.Menu');
  test.equal(contextUnion.optional, false);
  test.equal(contextUnion.nullable, false);
  test.equal(contextUnion.nonNullable, false);
  test.equal(contextUnion.variable, false);
  test.equal(contextUnion.all, false);
  test.equal(contextUnion.unknown, false);

  var paramUnion = func.parameterTypeUnions[0];
  test.equal(paramUnion.types.length, 1);
  test.equal(paramUnion.types[0], 'string');
  test.equal(paramUnion.optional, false);
  test.equal(paramUnion.nullable, false);
  test.equal(paramUnion.nonNullable, false);
  test.equal(paramUnion.variable, false);
  test.equal(paramUnion.all, false);
  test.equal(paramUnion.unknown, false);

  test.equal(union.toString(), 'function(this: goog.ui.Menu, string)');
  test.done();
};


exports.testBuildWithFunctionTypeWithNew = function(test) {
  builder.setTypeString('function(new:goog.ui.Menu, string)');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 1);
  test.equal(func.returnTypeUnion, null);
  test.equal(func.isConstructor, true);

  var contextUnion = func.contextTypeUnion;
  test.equal(contextUnion.types.length, 1);
  test.equal(contextUnion.types[0], 'goog.ui.Menu');
  test.equal(contextUnion.optional, false);
  test.equal(contextUnion.nullable, false);
  test.equal(contextUnion.nonNullable, false);
  test.equal(contextUnion.variable, false);
  test.equal(contextUnion.all, false);
  test.equal(contextUnion.unknown, false);

  var paramUnion = func.parameterTypeUnions[0];
  test.equal(paramUnion.types.length, 1);
  test.equal(paramUnion.types[0], 'string');
  test.equal(paramUnion.optional, false);
  test.equal(paramUnion.nullable, false);
  test.equal(paramUnion.nonNullable, false);
  test.equal(paramUnion.variable, false);
  test.equal(paramUnion.all, false);
  test.equal(paramUnion.unknown, false);

  test.equal(union.toString(), 'function(new: goog.ui.Menu, string)');
  test.done();
};


exports.testBuildWithFunctionTypeWithVariableParams = function(test) {
  builder.setTypeString('function(string, ...[number]): number');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 2);
  test.equal(func.contextTypeUnion, null);
  test.equal(func.isConstructor, false);

  var paramUnion1 = func.parameterTypeUnions[0];
  test.equal(paramUnion1.types.length, 1);
  test.equal(paramUnion1.types[0], 'string');
  test.equal(paramUnion1.optional, false);
  test.equal(paramUnion1.nullable, false);
  test.equal(paramUnion1.nonNullable, false);
  test.equal(paramUnion1.variable, false);
  test.equal(paramUnion1.all, false);
  test.equal(paramUnion1.unknown, false);

  var paramUnion2 = func.parameterTypeUnions[1];
  test.equal(paramUnion2.types.length, 1);
  test.equal(paramUnion2.types[0], 'number');
  test.equal(paramUnion2.optional, false);
  test.equal(paramUnion2.nullable, false);
  test.equal(paramUnion2.nonNullable, false);
  test.equal(paramUnion2.variable, true);
  test.equal(paramUnion2.all, false);
  test.equal(paramUnion2.unknown, false);

  var returnUnion = func.returnTypeUnion;
  test.equal(returnUnion.types.length, 1);
  test.equal(returnUnion.types[0], 'number');
  test.equal(returnUnion.optional, false);
  test.equal(returnUnion.nullable, false);
  test.equal(returnUnion.nonNullable, false);
  test.equal(returnUnion.variable, false);
  test.equal(returnUnion.all, false);
  test.equal(returnUnion.unknown, false);

  test.equal(union.toString(), 'function(string, ...number): number');
  test.done();
};


exports.testBuildWithFunctionTypeWithNullableAndOptional = function(test) {
  builder.setTypeString('function(?string=, number=)');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 2);
  test.equal(func.returnTypeUnion, null);
  test.equal(func.contextTypeUnion, null);
  test.equal(func.isConstructor, false);

  var paramUnion1 = func.parameterTypeUnions[0];
  test.equal(paramUnion1.types.length, 1);
  test.equal(paramUnion1.types[0], 'string');
  test.equal(paramUnion1.optional, true);
  test.equal(paramUnion1.nullable, true);
  test.equal(paramUnion1.nonNullable, false);
  test.equal(paramUnion1.variable, false);
  test.equal(paramUnion1.all, false);
  test.equal(paramUnion1.unknown, false);

  var paramUnion2 = func.parameterTypeUnions[1];
  test.equal(paramUnion2.types.length, 1);
  test.equal(paramUnion2.types[0], 'number');
  test.equal(paramUnion2.optional, true);
  test.equal(paramUnion2.nullable, false);
  test.equal(paramUnion2.nonNullable, false);
  test.equal(paramUnion2.variable, false);
  test.equal(paramUnion2.all, false);
  test.equal(paramUnion2.unknown, false);

  test.equal(union.toString(), 'function(string|undefined|null, number|undefined)');
  test.done();
};

exports.testBuildWithFunctionTypeWithGoogUiComponentForEachChild = function(test) {
  builder.setTypeString('function(this:T,?,number):?');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  var func = union.types[0];
  test.equal(func.parameterTypeUnions.length, 2);
  test.equal(func.isConstructor, false);

  var contextUnion = func.contextTypeUnion;
  test.equal(contextUnion.types.length, 1);
  test.equal(contextUnion.types[0], 'T');
  test.equal(contextUnion.optional, false);
  test.equal(contextUnion.nullable, false);
  test.equal(contextUnion.nonNullable, false);
  test.equal(contextUnion.variable, false);
  test.equal(contextUnion.all, false);
  test.equal(contextUnion.unknown, false);

  var paramUnion1 = func.parameterTypeUnions[0];
  test.equal(paramUnion1.types.length, 0);
  test.equal(paramUnion1.optional, false);
  test.equal(paramUnion1.nullable, false);
  test.equal(paramUnion1.nonNullable, false);
  test.equal(paramUnion1.variable, false);
  test.equal(paramUnion1.all, false);
  test.equal(paramUnion1.unknown, true);

  var paramUnion2 = func.parameterTypeUnions[1];
  test.equal(paramUnion2.types.length, 1);
  test.equal(paramUnion2.types[0], 'number');
  test.equal(paramUnion2.optional, false);
  test.equal(paramUnion2.nullable, false);
  test.equal(paramUnion2.nonNullable, false);
  test.equal(paramUnion2.variable, false);
  test.equal(paramUnion2.all, false);
  test.equal(paramUnion2.unknown, false);

  var returnUnion = func.returnTypeUnion;
  test.equal(returnUnion.types.length, 0);
  test.equal(returnUnion.optional, false);
  test.equal(returnUnion.nullable, false);
  test.equal(returnUnion.nonNullable, false);
  test.equal(returnUnion.variable, false);
  test.equal(returnUnion.all, false);
  test.equal(returnUnion.unknown, true);

  test.equal(union.toString(), 'function(this: T, ?, number): ?');
  test.done();
};


exports.testBuildVariable = function(test) {
  builder.setTypeString('...number');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'number');
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, true);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), '...number');
  test.done();
};


exports.testBuildOptional = function(test) {
  builder.setTypeString('number=');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'number');
  test.equal(union.optional, true);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'number|undefined');
  test.done();
};


exports.testBuildAllType = function(test) {
  builder.setTypeString('*');
  union = builder.build();
  test.equal(union.types.length, 0);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, true);
  test.equal(union.unknown, false);

  test.equal(union.toString(), '*');
  test.done();
};


exports.testBuildUnknown = function(test) {
  builder.setTypeString('?');
  union = builder.build();
  test.equal(union.types.length, 0);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, true);

  test.equal(union.toString(), '?');
  test.done();
};


exports.testBuildUnknownByKeyword = function(test) {
  builder.setTypeString('unknown');
  union = builder.build();
  test.equal(union.types.length, 0);
  test.equal(union.optional, false);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, true);

  test.equal(union.toString(), '?');
  test.done();
};


exports.testBuildOptionalByPrimitiveUndefined = function(test) {
  builder.setTypeString('Object|undefined');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'Object');
  test.equal(union.optional, true);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'Object|undefined');
  test.done();
};


exports.testBuildOptionalByVoid = function(test) {
  builder.setTypeString('Object|void');
  union = builder.build();
  test.equal(union.types.length, 1);
  test.equal(union.types[0], 'Object');
  test.equal(union.optional, true);
  test.equal(union.nullable, false);
  test.equal(union.nonNullable, false);
  test.equal(union.variable, false);
  test.equal(union.all, false);
  test.equal(union.unknown, false);

  test.equal(union.toString(), 'Object|undefined');
  test.done();
};
