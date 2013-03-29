// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../tsumekusaJsdoc';



/**
 * @constructor
 */
var TypeBuilder = function() {
  this.lexer_ = this.getTypeLexer();
  this.setMode(new TypeBuilder.BaseMode());
};


TypeBuilder.prototype.setTypeString = function(type) {
  this.type_ = type;
};


TypeBuilder.prototype.build = function() {
  this.lexer_.analize(this.type_);
  return this.mode_.getTypeUnionToken();
};


/**
 * @param {Object.<tsumekusaJsdoc.TypeLexer.EventType, Function>} cbs Callback
 *     Objects.
 * @return {tsumekusaJsdoc.TypeLexer} Type lexer.
 * @protected
 */
TypeBuilder.prototype.getTypeLexer = function() {
  var TypeLexer = require(basePath + '/TypeLexer');
  return new TypeLexer();
};


TypeBuilder.prototype.setMode = function(mode) {
  mode.setBuilder(this);
  this.mode_ = mode;
  this.lexer_.setTokenHandlers(mode);
};




/**
 * @constructor
 */
TypeBuilder.Mode = function() {};


TypeBuilder.Mode.prototype.next_ = null;


TypeBuilder.Mode.prototype.builder_ = null;


TypeBuilder.Mode.prototype.setBuilder = function(builder) {
  this.builder_ = builder;
};


TypeBuilder.Mode.prototype.getBuilder = function() {
  return this.builder_;
};


TypeBuilder.Mode.prototype.setNext = function(next) {
  this.next_ = next;
};


TypeBuilder.Mode.prototype.getNext = function() {
  return this.next_;
};


TypeBuilder.Mode.prototype.next = function() {
  this.builder_.setMode(this.next_);
};


TypeBuilder.Mode.prototype.handleOpenTypeUnionToken = function() {
  var newMode = new TypeBuilder.TypeUnionMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


TypeBuilder.Mode.prototype.handleCloseTypeUnionToken = function() {
  this.next();
};


TypeBuilder.Mode.prototype.handleOpenFunctionTypeToken = function() {
  var newMode = new TypeBuilder.FunctionTypeMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


TypeBuilder.Mode.prototype.handleCloseFunctionTypeToken = function() {
  this.next();
};


TypeBuilder.Mode.prototype.handleOpenGenericTypeToken = function() {
  var newMode = new TypeBuilder.GenericTypeMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


TypeBuilder.Mode.prototype.handleCloseGenericTypeToken = function() {
  this.next();
};


TypeBuilder.Mode.prototype.handleOpenRecordTypeToken = function() {
  var newMode = new TypeBuilder.RecordTypeMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


TypeBuilder.Mode.prototype.handleCloseRecordTypeToken = function() {
  this.next();
};



/**
 * @constructor
 * @extends {TypeBuilder.Mode}
 */
TypeBuilder.BaseMode = function() {
  TypeBuilder.Mode.call(this);
  this.modeName = 'Base';
};
tsumekusa.inherits(TypeBuilder.BaseMode, TypeBuilder.Mode);


TypeBuilder.BaseMode.prototype.setTypeUnionToken = function(union) {
  this.baseUnion_ = union;
};


TypeBuilder.BaseMode.prototype.getTypeUnionToken = function() {
  return this.baseUnion_;
};



/**
 * @constructor
 * @extends {TypeBuilder.Mode}
 */
TypeBuilder.TypeUnionMode = function() {
  TypeBuilder.Mode.call(this);
  this.union_ = new TypeBuilder.TypeUnion();
  this.modeName = 'Union';
};
tsumekusa.inherits(TypeBuilder.TypeUnionMode, TypeBuilder.Mode);


TypeBuilder.TypeUnionMode.prototype.next = function() {
  var nextMode = this.getNext();
  if (nextMode) {
    nextMode.setTypeUnionToken(this.union_);
  }
  TypeBuilder.Mode.prototype.next.call(this);
};


TypeBuilder.TypeUnionMode.prototype.handleAllTypeOperatorToken = function() {
  this.union_.setAllType(true);
};


TypeBuilder.TypeUnionMode.prototype.handleUnknownTypeOperatorToken =
    function() {
  this.union_.setUnknownType(true);
};


TypeBuilder.TypeUnionMode.prototype.handleVariableTypeOperatorToken =
    function() {
  this.union_.setVariableType(true);
};


TypeBuilder.TypeUnionMode.prototype.handleOptionalTypeOperatorToken =
    function() {
  this.union_.setOptionalType(true);
};


TypeBuilder.TypeUnionMode.prototype.handleNullableTypeOperatorToken =
    function() {
  this.union_.setNullableType(true);
};


TypeBuilder.TypeUnionMode.prototype.handleNonNullableTypeOperatorToken =
    function() {
  this.union_.setNonNullableType(true);
};


TypeBuilder.TypeUnionMode.prototype.handleTypeNameToken = function(typeName) {
  this.union_.addTypeName(typeName);
};


TypeBuilder.TypeUnionMode.prototype.setGenericTypeToken = function(generic) {
  this.union_.addGenericType(generic);
};


TypeBuilder.TypeUnionMode.prototype.setFunctionTypeToken = function(func) {
  this.union_.addFunctionType(func);
};


TypeBuilder.TypeUnionMode.prototype.setRecordTypeToken = function(record) {
  this.union_.addRecordType(record);
};



/**
 * @constructor
 * @extends {TypeBuilder.Mode}
 */
TypeBuilder.GenericTypeMode = function() {
  TypeBuilder.Mode.call(this);
  this.generic_ = new TypeBuilder.GenericType();
  this.modeName = 'GenericType';
};
tsumekusa.inherits(TypeBuilder.GenericTypeMode, TypeBuilder.Mode);


TypeBuilder.GenericTypeMode.prototype.handleGenericTypeNameToken = function(
    typeName) {
  this.generic_.setGenericTypeName(typeName);
};


TypeBuilder.GenericTypeMode.prototype.setTypeUnionToken = function(union) {
  this.generic_.addParameterTypeUnion(union);
};


/** @override */
TypeBuilder.GenericTypeMode.prototype.next = function() {
  var nextMode = this.getNext();
  if (nextMode) {
    nextMode.setGenericTypeToken(this.generic_);
  }
  TypeBuilder.Mode.prototype.next.call(this);
};



/**
 * @constructor
 * @extends {TypeBuilder.Mode}
 */
TypeBuilder.FunctionTypeMode = function() {
  TypeBuilder.Mode.call(this);
  this.state_ = TypeBuilder.FunctionTypeMode.State.INITIAL;
  this.function_ = new TypeBuilder.FunctionType();
  this.modeName = 'FunctionType';
};
tsumekusa.inherits(TypeBuilder.FunctionTypeMode, TypeBuilder.Mode);


TypeBuilder.FunctionTypeMode.State = {
  INITIAL: 0,
  CONTEXT: 1,
  PARAMETERS: 2,
  RETURN: 3
};


TypeBuilder.FunctionTypeMode.prototype.handleOpenFunctionTypeParametersToken =
    function() {
  this.state_ = TypeBuilder.FunctionTypeMode.State.PARAMETERS;
};


TypeBuilder.FunctionTypeMode.prototype.handleCloseFunctionTypeParametersToken =
    null;


TypeBuilder.FunctionTypeMode.prototype.handleFunctionTypeReturnTypeUnionToken =
    function() {
  this.state_ = TypeBuilder.FunctionTypeMode.State.RETURN;
};


TypeBuilder.FunctionTypeMode.prototype.handleConstructorTypeUnionToken =
    function() {
  this.function_.setConstructor(true);
  this.state_ = TypeBuilder.FunctionTypeMode.State.CONTEXT;
};


TypeBuilder.FunctionTypeMode.prototype.handleFunctionTypeContextTypeUnionToken =
    function() {
  this.function_.setConstructor(false);
  this.state_ = TypeBuilder.FunctionTypeMode.State.CONTEXT;
};


TypeBuilder.FunctionTypeMode.prototype.setTypeUnionToken = function(union) {
  var State = TypeBuilder.FunctionTypeMode.State;
  switch (this.state_) {
    case State.INITIAL:
      throw Error('Cannot set the type union to the mode on an initial state.');
    case State.CONTEXT:
      this.function_.setContextTypeUnion(union);
      this.state_ = TypeBuilder.FunctionTypeMode.State.PARAMETERS;
      break;
    case State.PARAMETERS:
      this.function_.addParameterTypeUnion(union);
      break;
    case State.RETURN:
      this.function_.setReturnTypeUnion(union);
      break;
    default:
      throw Error('Unknown state on function type mode: ' + this.state_);
  }
};


/** @override */
TypeBuilder.FunctionTypeMode.prototype.next = function() {
  var nextMode = this.getNext();
  if (nextMode) {
    nextMode.setFunctionTypeToken(this.function_);
  }
  TypeBuilder.Mode.prototype.next.call(this);
};



/**
 * @constructor
 * @extends {TypeBuilder.Mode}
 */
TypeBuilder.RecordTypeMode = function() {
  TypeBuilder.Mode.call(this);
  this.record_ = new TypeBuilder.RecordType();
  this.entry_ = null;
  this.modeName = 'RecordType';
};
tsumekusa.inherits(TypeBuilder.RecordTypeMode, TypeBuilder.Mode);


TypeBuilder.RecordTypeMode.prototype.handleEntryValueTypeUnionToken = null;


TypeBuilder.RecordTypeMode.prototype.handleEntryKeyNameToken = function(
    keyName) {
  this.entry_ = new TypeBuilder.RecordType.Entry();
  this.entry_.setKeyName(keyName);
};


TypeBuilder.RecordTypeMode.prototype.setTypeUnionToken = function(union) {
  this.entry_.setValueTypeUnion(union);
  this.record_.addEntry(this.entry_);
  this.entry_ = null;
};


/** @override */
TypeBuilder.RecordTypeMode.prototype.next = function() {
  var nextMode = this.getNext();
  if (nextMode) {
    nextMode.setRecordTypeToken(this.record_);
  }
  TypeBuilder.Mode.prototype.next.call(this);
};



/**
 * @constructor
 */
TypeBuilder.TypeUnion = function() {
  this.types = [];
  this.count_ = 0;
};


TypeBuilder.TypeUnion.prototype.types = null;


TypeBuilder.TypeUnion.prototype.count_ = null;


TypeBuilder.TypeUnion.prototype.optional = false;


TypeBuilder.TypeUnion.prototype.variable = false;


TypeBuilder.TypeUnion.prototype.nullable = false;


TypeBuilder.TypeUnion.prototype.nonNullable = false;


TypeBuilder.TypeUnion.prototype.all = false;


TypeBuilder.TypeUnion.prototype.unknown = false;


TypeBuilder.TypeUnion.prototype.addTypeName = function(type) {
  this.types[this.count_++] = type;
};


TypeBuilder.TypeUnion.prototype.addGenericType = function(generic) {
  this.types[this.count_++] = generic;
};


TypeBuilder.TypeUnion.prototype.addRecordType = function(record) {
  this.types[this.count_++] = record;
};


TypeBuilder.TypeUnion.prototype.addFunctionType = function(func) {
  this.types[this.count_++] = func;
};


TypeBuilder.TypeUnion.prototype.setOptionalType = function(enable) {
  this.optional = enable;
};


TypeBuilder.TypeUnion.prototype.setVariableType = function(enable) {
  this.variable = enable;
};


TypeBuilder.TypeUnion.prototype.setNullableType = function(enable) {
  this.nullable = enable;
  if (enable) {
    this.nonNullable = false;
  }
};


TypeBuilder.TypeUnion.prototype.setNonNullableType = function(enable) {
  this.nonNullable = enable;
  if (enable) {
    this.nullable = false;
  }
};


TypeBuilder.TypeUnion.prototype.setAllType = function(enable) {
  this.all = enable;
};


TypeBuilder.TypeUnion.prototype.setUnknownType = function(enable) {
  this.unknown = enable;
};



/**
 * @constructor
 */
TypeBuilder.GenericType = function() {
  this.parameterTypeUnions = [];
  this.paramCount_ = 0;
};


TypeBuilder.GenericType.prototype.genericTypeName = null;


TypeBuilder.GenericType.prototype.parameterTypeUnions = null;


TypeBuilder.GenericType.prototype.paramCount_;


TypeBuilder.GenericType.prototype.setGenericTypeName = function(name) {
  this.genericTypeName = name;
};


TypeBuilder.GenericType.prototype.addParameterTypeUnion = function(type) {
  this.parameterTypeUnions[this.paramCount_++] = type;
};



/**
 * @constructor
 */
TypeBuilder.FunctionType = function() {
  this.parameterTypeUnions = [];
  this.paramCount_ = 0;
};


TypeBuilder.FunctionType.prototype.isConstructor = false;


TypeBuilder.FunctionType.prototype.parameterTypeUnions = null;


TypeBuilder.FunctionType.prototype.returnTypeUnion = null;


TypeBuilder.FunctionType.prototype.contextTypeUnion = null;


TypeBuilder.FunctionType.prototype.setConstructor = function(enable) {
  this.isConstructor = enable;
};


TypeBuilder.FunctionType.prototype.setContextTypeUnion = function(union) {
  this.contextTypeUnion = union;
};


TypeBuilder.FunctionType.prototype.addParameterTypeUnion = function(param) {
  this.parameterTypeUnions[this.paramCount_++] = param;
};


TypeBuilder.FunctionType.prototype.setReturnTypeUnion = function(ret) {
  this.returnTypeUnion = ret;
};



/**
 * @constructor
 */
TypeBuilder.RecordType = function() {
  this.entries = [];
  this.entryCount_ = 0;
};


TypeBuilder.RecordType.prototype.addEntry = function(record) {
  this.entries[this.entryCount_++] = record;
};



/**
 * @constructor
 */
TypeBuilder.RecordType.Entry = function() {};


TypeBuilder.RecordType.Entry.prototype.name = null;


TypeBuilder.RecordType.Entry.prototype.typeUnion = null;


TypeBuilder.RecordType.Entry.prototype.setKeyName = function(keyName) {
  this.name = keyName;
};


TypeBuilder.RecordType.Entry.prototype.setValueTypeUnion = function(type) {
  this.typeUnion = type;
};


// Exports the constructor.
module.exports = TypeBuilder;
