// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusaJsdoc';
var TypeLexer = require(basePath + '/TypeLexer');


var lexer;

exports.setUp = function(callback) {
  var cbs = {
    handleTypeNameToken: function(arg) {
      console.log('	handleTypeNameToken', arg);
    },
    handleOpenTypeUnionToken: function() {
      console.log('	handleOpenTypeUnionToken');
    },
    handleCloseTypeUnionToken: function() {
      console.log('	handleCloseTypeUnionToken');
    },
    handleOpenFunctionTypeToken: function() {
      console.log('	handleOpenFunctionTypeToken');
    },
    handleCloseFunctionTypeToken: function() {
      console.log('	handleCloseFunctionTypeToken');
    },
    handleOpenFunctionParametersToken: function() {
      console.log('	handleOpenFunctionParametersToken');
    },
    handleCloseFunctionParametersToken: function() {
      console.log('	handleCloseFunctionParametersToken');
    },
    handleFunctionReturnTypeUnionToken: function() {
      console.log('	handleFunctionReturnTypeUnionToken');
    },
    handleFunctionContextTypeUnionToken: function() {
      console.log('	handleFunctionContextTypeUnionToken');
    },
    handleConstructorTypeUnionToken: function() {
      console.log('	handleConstructorTypeUnionToken');
    },
    handleOpenGenericTypeToken: function() {
      console.log('	handleOpenGenericTypeToken');
    },
    handleCloseGenericTypeToken: function() {
      console.log('	handleCloseGenericTypeToken');
    },
    handleGenericTypeNameToken: function(arg) {
      console.log('	handleGenericTypeNameToken', arg);
    },
    handleOpenGenericTypeParametersToken: function() {
      console.log('	handleOpenGenericTypeParametersToken');
    },
    handleCloseGenericTypeParametersToken: function() {
      console.log('	handleCloseGenericTypeParametersToken');
    },
    handleOpenRecordTypeToken: function() {
      console.log('	handleOpenRecordTypeToken');
    },
    handleCloseRecordTypeToken: function() {
      console.log('	handleCloseRecordTypeToken');
    },
    handleRecordKeyNameToken: function(arg) {
      console.log('	handleRecordKeyNameToken', arg);
    },
    handleRecordValueTypeToken: function() {
      console.log('	handleRecordValueTypeToken');
    },
    handleNullableTypeOperatorToken: function() {
      console.log('	handleNullableTypeOperatorToken');
    },
    handleNonNullableTypeOperatorToken: function() {
      console.log('	handleNonNullableTypeOperatorToken');
    },
    handleOptionalTypeOperatorToken: function() {
      console.log('	handleOptionalTypeOperatorToken');
    },
    handleVariableTypeOperatorToken: function() {
      console.log('	handleVariableTypeOperatorToken');
    },
    handleAllTypeOperatorToken: function() {
      console.log('	handleAllTypeOperatorToken');
    },
    handleUnknownTypeOperatorToken: function() {
      console.log('	handleUnknownTypeOperatorToken');
    }
  };

  lexer = new TypeLexer(cbs);
  callback();
};

exports.testAnalizeWithPrimitiveTypeName = function(test) {
  lexer.analize('boolean');
  test.done();
};


exports.testAnalizeWithGlobalTypeName = function(test) {
  lexer.analize('Window');
  test.done();
}


exports.testAnalizeWithUserTypeName = function(test) {
  lexer.analize('goog.ui.Menu');
  test.done();
}


exports.testAnalizeWithGenericParam = function(test) {
  lexer.analize('Array.<string>');
  test.done();
};


exports.testAnalizeWithGenericParams = function(test) {
  lexer.analize('Object.<string, number>');
  test.done();
};


exports.testAnalizeWithJsdocGeneric = function(test) {
  lexer.analize('String[]');
  test.done();
};


exports.testAnalizeWithFormalUnion = function(test) {
  lexer.analize('(number|boolean)');
  test.done();
};


exports.testAnalizeWithInformalUnion = function(test) {
  lexer.analize('number|boolean');
  test.done();
};


exports.testAnalizeWithRecord = function(test) {
  lexer.analize('{myNum: number, myObject}');
  test.done();
};


exports.testAnalizeWithGenericsRecord = function(test) {
  lexer.analize('Array.<{length}>');
  test.done();
};


exports.testAnalizeWithNullableOnHead = function(test) {
  lexer.analize('?number');
  test.done();
};


exports.testAnalizeWithNullableOnTail = function(test) {
  lexer.analize('goog.ui.Component?');
  test.done();
};


exports.testAnalizeWithNonNullableOnHead = function(test) {
  lexer.analize('!Object');
  test.done();
};


exports.testAnalizeWithNonNullableOnTail = function(test) {
  lexer.analize('Object!');
  test.done();
};


exports.testAnalizeWithFunctionType = function(test) {
  lexer.analize('Function');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithNoParam = function(test) {
  lexer.analize('function()');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithParam = function(test) {
  lexer.analize('function(string)');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithParams = function(test) {
  lexer.analize('function(string, boolean)');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithReturn = function(test) {
  lexer.analize('function(): number');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithThis = function(test) {
  lexer.analize('function(this:goog.ui.Menu, string)');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithNew = function(test) {
  lexer.analize('function(new:goog.ui.Menu, string)');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithVariableParams = function(test) {
  lexer.analize('function(string, ...[number]): number');
  test.done();
};


exports.testAnalizeWithFunctionTypeWithNullableAndOptional = function(test) {
  lexer.analize('function(?string=, number=)');
  test.done();
};

exports.testAnalizeWithFunctionTypeWithGoogUiComponentForEachChild = function(test) {
  lexer.analize('function(this:T,?,number):?');
  test.done();
};


exports.testAnalizeVariable = function(test) {
  lexer.analize('...number');
  test.done();
};


exports.testAnalizeOptional = function(test) {
  lexer.analize('number=');
  test.done();
};


exports.testAnalizeAllType = function(test) {
  lexer.analize('*');
  test.done();
};


exports.testAnalizeUnknown = function(test) {
  lexer.analize('?');
  test.done();
};


exports.testAnalizeUnknownByKeyword = function(test) {
  lexer.analize('unknown');
  test.done();
};


exports.testAnalizeOptionalByPrimitiveUndefined = function(test) {
  lexer.analize('Object|undefined');
  test.done();
};


exports.testAnalizeOptionalByVoid = function(test) {
  lexer.analize('Object|void');
  test.done();
};
