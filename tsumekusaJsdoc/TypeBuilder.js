// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../tsumekusaJsdoc';
var TypeLexer = require(basePath + '/TypeLexer');



/**
 * A class for type object builders.
 * @constructor
 */
var TypeBuilder = function() {
  this.lexer_ = this.getTypeLexer();
  this.base_ = new TypeBuilder.BaseMode();
  this.setMode(this.base_);
};


/**
 * Sets a type string to parse.
 * @param {string} type Type string.
 */
TypeBuilder.prototype.setTypeString = function(type) {
  this.type_ = type;
};


/**
 * Builds a type objects.
 * @return {tsumekusaJsdoc.TypeBuilder.TypeUnion} Builded objects.
 */
TypeBuilder.prototype.build = function() {
  try {
    this.lexer_.analize(this.type_);
  }
  catch (e) {
    if (e instanceof TypeLexer.SyntaxError) {
      // Should return an unknown type if a syntax error was found.
      var unknown = new TypeBuilder.TypeUnion();
      unknown.setUnknownType(true);
      return unknown;
    }
    else {
      throw e;
    }
  }
  return this.base_.getTypeUnionToken();
};


/**
 * Returns a type lexer.
 * @return {tsumekusaJsdoc.TypeLexer} Type lexer.
 * @protected
 */
TypeBuilder.prototype.getTypeLexer = function() {
  return new TypeLexer();
};


/**
 * Sets a mode.
 * @param {TypeBuilder.Mode} mode Mode of the type builder.
 */
TypeBuilder.prototype.setMode = function(mode) {
  mode.setBuilder(this);
  this.mode_ = mode;
  this.lexer_.setTokenHandlers(mode);
};



// Mode definitions {{{
/**
 * A base class for modes of type builder.
 * @constructor
 */
TypeBuilder.Mode = function() {};


/**
 * Next mode.
 * @type {?tsumekusaJsdoc.TypeBuilder.Mode}
 * @private
 */
TypeBuilder.Mode.prototype.next_ = null;


/**
 * Builder has the mode.
 * @type {?tsumekusaJsdoc.TypeBuilder}
 * @private
 */
TypeBuilder.Mode.prototype.builder_ = null;


/**
 * Sets a builder has the mode.
 * @param {tsumekusaJsdoc.TypeBuilder} builder Builder has the mode.
 */
TypeBuilder.Mode.prototype.setBuilder = function(builder) {
  this.builder_ = builder;
};


/**
 * Returns a builder has the mode.
 * @return {tsumekusaJsdoc.TypeBuilder} Builder has the mode.
 */
TypeBuilder.Mode.prototype.getBuilder = function() {
  return this.builder_;
};


/**
 * Sets a mode next to the mode.
 * @param {tsumekusaJsdoc.TypeBuilder.Mode} next Next mode.
 */
TypeBuilder.Mode.prototype.setNext = function(next) {
  this.next_ = next;
};


/**
 * Returns a mode next to the mode.
 * @return {tsumekusaJsdoc.TypeBuilder.Mode} Next mode.
 */
TypeBuilder.Mode.prototype.getNext = function() {
  return this.next_;
};


/**
 * Change a mode to the next mode.
 */
TypeBuilder.Mode.prototype.next = function() {
  this.builder_.setMode(this.next_);
};


/**
 * Handles an opening type union token.
 */
TypeBuilder.Mode.prototype.handleOpenTypeUnionToken = function() {
  var newMode = new TypeBuilder.TypeUnionMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


/**
 * Handles a closing type union token.
 */
TypeBuilder.Mode.prototype.handleCloseTypeUnionToken = function() {
  this.next();
};


/**
 * Handles an opening function type token.
 */
TypeBuilder.Mode.prototype.handleOpenFunctionTypeToken = function() {
  var newMode = new TypeBuilder.FunctionTypeMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


/**
 * Handles a closing function type token.
 */
TypeBuilder.Mode.prototype.handleCloseFunctionTypeToken = function() {
  this.next();
};


/**
 * Handles an opening generic type token.
 */
TypeBuilder.Mode.prototype.handleOpenGenericTypeToken = function() {
  var newMode = new TypeBuilder.GenericTypeMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


/**
 * Handles a closing generic type token.
 */
TypeBuilder.Mode.prototype.handleCloseGenericTypeToken = function() {
  this.next();
};


/**
 * Handles an opening record type token.
 */
TypeBuilder.Mode.prototype.handleOpenRecordTypeToken = function() {
  var newMode = new TypeBuilder.RecordTypeMode();
  newMode.setNext(this);
  this.builder_.setMode(newMode);
};


/**
 * Handles a closing record type token.
 */
TypeBuilder.Mode.prototype.handleCloseRecordTypeToken = function() {
  this.next();
};


/**
 * Handles a lexical analizing failure.
 * @param {string} msg Error message.
 */
TypeBuilder.Mode.prototype.handleFailure = function(msg) {
  this.builder_.fail_(msg);
};



/**
 * A class for base modes.  The base mode is set when start to build type
 * objects, and the base mode have a root type union.
 * @constructor
 * @extends {tsumekusaJsdoc.TypeBuilder.Mode}
 */
TypeBuilder.BaseMode = function() {
  TypeBuilder.Mode.call(this);
};
tsumekusa.inherits(TypeBuilder.BaseMode, TypeBuilder.Mode);


/**
 * Base type union.
 * @type {?tsumekusaJsdoc.TypeBuilder.TypeUnion}
 * @private
 */
TypeBuilder.BaseMode.prototype.baseUnion_ = null;


/**
 * Sets a type union at the root.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} union Type union to set.
 */
TypeBuilder.BaseMode.prototype.setTypeUnionToken = function(union) {
  this.baseUnion_ = union;
};


/**
 * Returns a type union at the root.
 * @return {tsumekusaJsdoc.TypeBuilder.TypeUnion} Type union to set.
 */
TypeBuilder.BaseMode.prototype.getTypeUnionToken = function() {
  return this.baseUnion_;
};



/**
 * A class for type union modes of a type builder.
 * @constructor
 * @extends {tsumekusaJsdoc.TypeBuilder.Mode}
 */
TypeBuilder.TypeUnionMode = function() {
  TypeBuilder.Mode.call(this);
  this.union_ = new TypeBuilder.TypeUnion();
};
tsumekusa.inherits(TypeBuilder.TypeUnionMode, TypeBuilder.Mode);


/**
 * Target type union.
 * @type {tsumekusaJsdoc.TypeBuilder.TypeUnion}
 * @private
 */
TypeBuilder.TypeUnionMode.prototype.union_ = null;


/** @override */
TypeBuilder.TypeUnionMode.prototype.next = function() {
  var nextMode = this.getNext();
  if (nextMode) {
    nextMode.setTypeUnionToken(this.union_);
  }
  TypeBuilder.Mode.prototype.next.call(this);
};


/**
 * Handles an all type operator token.
 */
TypeBuilder.TypeUnionMode.prototype.handleAllTypeOperatorToken = function() {
  this.union_.setAllType(true);
};


/**
 * Handles an unknown type operator token.
 */
TypeBuilder.TypeUnionMode.prototype.handleUnknownTypeOperatorToken =
    function() {
  this.union_.setUnknownType(true);
};


/**
 * Handles a variable type operator token.
 */
TypeBuilder.TypeUnionMode.prototype.handleVariableTypeOperatorToken =
    function() {
  this.union_.setVariableType(true);
};


/**
 * Handles an optional type operator token.
 */
TypeBuilder.TypeUnionMode.prototype.handleOptionalTypeOperatorToken =
    function() {
  this.union_.setOptionalType(true);
};


/**
 * Handles a nullable type operator token.
 */
TypeBuilder.TypeUnionMode.prototype.handleNullableTypeOperatorToken =
    function() {
  this.union_.setNullableType(true);
};


/**
 * Handles a non-nullable type operator token.
 */
TypeBuilder.TypeUnionMode.prototype.handleNonNullableTypeOperatorToken =
    function() {
  this.union_.setNonNullableType(true);
};


/**
 * Handles a type name token.
 * @param {string} typeName Type name.
 */
TypeBuilder.TypeUnionMode.prototype.handleTypeNameToken = function(typeName) {
  var obj = new TypeBuilder.TypeName();
  obj.setTypeName(typeName);
  this.union_.addTypeName(obj);
};


/**
 * Sets a generic type token.
 * @param {tsumekusaJsdoc.TypeBuilder.GenericType} generic Generic type token to
 *     set.
 */
TypeBuilder.TypeUnionMode.prototype.setGenericTypeToken = function(generic) {
  this.union_.addGenericType(generic);
};


/**
 * Handles a function type token.
 * @param {tsumekusaJsdoc.TypeBuilder.FunctionType} func Function type token to
 *     set.
 */
TypeBuilder.TypeUnionMode.prototype.setFunctionTypeToken = function(func) {
  this.union_.addFunctionType(func);
};


/**
 * Handles a record type token.
 * @param {tsumekusaJsdoc.TypeBuilder.RecordType} record Record type token to
 *     set.
 */
TypeBuilder.TypeUnionMode.prototype.setRecordTypeToken = function(record) {
  this.union_.addRecordType(record);
};



/**
 * A class for generic type mode of a type builder.
 * @constructor
 * @extends {tsumekusaJsdoc.TypeBuilder.Mode}
 */
TypeBuilder.GenericTypeMode = function() {
  TypeBuilder.Mode.call(this);
  this.generic_ = new TypeBuilder.GenericType();
};
tsumekusa.inherits(TypeBuilder.GenericTypeMode, TypeBuilder.Mode);


/**
 * Target generic type.
 * @type {tsumekusaJsdoc.TypeBuilder.GenericType}
 * @private
 */
TypeBuilder.GenericTypeMode.prototype.generic_ = null;


/**
 * Handles a generic type name token.
 * @param {string} typeName Generic type name.
 */
TypeBuilder.GenericTypeMode.prototype.handleGenericTypeNameToken = function(
    typeName) {
  var obj = new TypeBuilder.TypeName();
  obj.setTypeName(typeName);
  this.generic_.setGenericTypeName(obj);
};


/**
 * Sets a type union at the root.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} union Type union to set.
 */
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
 * A class for function type modes of a type builder.
 * @constructor
 * @extends {tsumekusaJsdoc.TypeBuilder.Mode}
 */
TypeBuilder.FunctionTypeMode = function() {
  TypeBuilder.Mode.call(this);
  this.state_ = TypeBuilder.FunctionTypeMode.State.INITIAL;
  this.function_ = new TypeBuilder.FunctionType();
};
tsumekusa.inherits(TypeBuilder.FunctionTypeMode, TypeBuilder.Mode);


/**
 * States for a function tyoe mode.
 * @enum {number}
 */
TypeBuilder.FunctionTypeMode.State = {
  /** Initial state.  This state should not allow to set any type. */
  INITIAL: 0,
  /**
   * Context state.  This state should allow to set a type union as a function
   * context type union.
   */
  CONTEXT: 1,
  /**
   * Parameters state.  This state should allow to set a type union as a
   * function parameter type union.
   */
  PARAMETERS: 2,
  /**
   * Return state.  This state should allow to set a type union as a function
   * return type union.
   */
  RETURN: 3
};


/**
 * State of the function type mode.
 * @type {tsumekusaJsdoc.TypeBuilder.FunctionTypeMode.State}
 * @private:
 */
TypeBuilder.FunctionTypeMode.prototype.state_ = null;


/**
 * Handles an opening function type parameters token.
 */
TypeBuilder.FunctionTypeMode.prototype.handleOpenFunctionTypeParametersToken =
    function() {
  this.state_ = TypeBuilder.FunctionTypeMode.State.PARAMETERS;
};


/**
 * Handles a closing function type parameters token.
 * @type {?Function}
 */
TypeBuilder.FunctionTypeMode.prototype.handleCloseFunctionTypeParametersToken =
    null;


/**
 * Handles a function return type union token.
 */
TypeBuilder.FunctionTypeMode.prototype.handleFunctionTypeReturnTypeUnionToken =
    function() {
  this.state_ = TypeBuilder.FunctionTypeMode.State.RETURN;
};


/**
 * Handles a constructor type union token.
 */
TypeBuilder.FunctionTypeMode.prototype.handleConstructorTypeUnionToken =
    function() {
  this.function_.setConstructor(true);
  this.state_ = TypeBuilder.FunctionTypeMode.State.CONTEXT;
};


/**
 * Handles a function type context type union token.
 */
TypeBuilder.FunctionTypeMode.prototype.handleFunctionTypeContextTypeUnionToken =
    function() {
  this.function_.setConstructor(false);
  this.state_ = TypeBuilder.FunctionTypeMode.State.CONTEXT;
};


/**
 * Sets a type union at the root.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} union Type union to set.
 */
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
 * A class for record type modes of a type builder.
 * @constructor
 * @extends {tsumekusaJsdoc.TypeBuilder.Mode}
 */
TypeBuilder.RecordTypeMode = function() {
  TypeBuilder.Mode.call(this);
  this.record_ = new TypeBuilder.RecordType();
};
tsumekusa.inherits(TypeBuilder.RecordTypeMode, TypeBuilder.Mode);


/**
 * Target record type.
 * @type {tsumekusaJsdoc.TypeBuilder.RecordType}
 * @private
 */
TypeBuilder.RecordTypeMode.prototype.record_ = null;


/**
 * Target entry.
 * @type {?tsumekusaJsdoc.TypeBuilder.RecordType.Entry}
 * @private
 */
TypeBuilder.RecordTypeMode.prototype.entry_ = null;


/**
 * Handles an entry value type union token.  In default, do nothing.
 * @type {?Function}
 */
TypeBuilder.RecordTypeMode.prototype.handleEntryValueTypeUnionToken = null;


/**
 * Handles an entry key name token.
 * @param {string} keyName Entry key name.
 */
TypeBuilder.RecordTypeMode.prototype.handleEntryKeyNameToken = function(
    keyName) {
  this.entry_ = new TypeBuilder.RecordType.Entry();
  this.entry_.setKeyName(keyName);
};


/**
 * Sets a type union at the root.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} union Type union to set.
 */
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
//}}}



/**
 * A class for type names.
 * @constructor
 */
TypeBuilder.TypeName = function() {};


/**
 * Type name publisher.  Set a publisher object if you want to get a link from
 * a type name when {@code #toString} is called.
 * @type {?{publish: function(tsumekusaJsdoc.TypeBuilder.TypeName): string}}
 */
TypeBuilder.TypeName.publisher = null;


/**
 * Type name string.
 * @type {?string}
 */
TypeBuilder.TypeName.prototype.name = null;


/**
 * Sets a type name string.
 * @param {string} name Type name string.
 */
TypeBuilder.TypeName.prototype.setTypeName = function(name) {
  this.name = name;
};


/**
 * Returns a type name string.  Set {@code tsumekusaJsdoc.TypeBuilder.TypeName.
 * publisher} if you want to convert to a link from the type name.  In default,
 * returns a raw type name.
 * @override
 * @see tsumekusaJsdoc.TypeBuilder.TypeName.publisher
 */
TypeBuilder.TypeName.prototype.toString = function() {
  if (TypeBuilder.TypeName.publisher) {
    return TypeBuilder.TypeName.publisher.publish(this);
  }
  else {
    return this.name;
  }
};



/**
 * A class for type union objects.
 * @constructor
 */
TypeBuilder.TypeUnion = function() {
  this.types = [];
  this.count_ = 0;
};


/**
 * Type objects.
 * @type {Array.<tsumekusaJsdoc.TypeBuilder.TypeName|tsumekusaJsdoc.TypeBuilder.
 *      GenericType|tsumekusaJsdoc.TypeBuilder.RecordType|tsumekusaJsdoc.
 *      TypeBuilder.FunctionType>}
 */
TypeBuilder.TypeUnion.prototype.types = null;


/**
 * Count of the types.
 * @type {number}
 * @private
 */
TypeBuilder.TypeUnion.prototype.count_ = null;


/**
 * Optional type flag.
 * @type {boolean}
 */
TypeBuilder.TypeUnion.prototype.optional = false;


/**
 * Variable type flag.
 * @type {boolean}
 */
TypeBuilder.TypeUnion.prototype.variable = false;


/**
 * Nullable type flag.
 * @type {boolean}
 */
TypeBuilder.TypeUnion.prototype.nullable = false;


/**
 * Non nullable type flag.
 * @type {boolean}
 */
TypeBuilder.TypeUnion.prototype.nonNullable = false;


/**
 * All type flag.
 * @type {boolean}
 */
TypeBuilder.TypeUnion.prototype.all = false;


/**
 * Unknown type flag.
 * @type {boolean}
 */
TypeBuilder.TypeUnion.prototype.unknown = false;


/**
 * Adds a type name string to the union.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeName} type Type name to add.
 */
TypeBuilder.TypeUnion.prototype.addTypeName = function(type) {
  this.types[this.count_++] = type;
};


/**
 * Adds a generic type to the union.
 * @param {tsumekusaJsdoc.TypeBuilder.GenericType} generic Generic type to add.
 */
TypeBuilder.TypeUnion.prototype.addGenericType = function(generic) {
  this.types[this.count_++] = generic;
};


/**
 * Adds a record type to the union.
 * @param {tsumekusaJsdoc.TypeBuilder.RecordType} record Record type to add.
 */
TypeBuilder.TypeUnion.prototype.addRecordType = function(record) {
  this.types[this.count_++] = record;
};


/**
 * Adds a function type to the union.
 * @param {tsumekusaJsdoc.TypeBuilder.FunctionType} func Function type to add.
 */
TypeBuilder.TypeUnion.prototype.addFunctionType = function(func) {
  this.types[this.count_++] = func;
};


/**
 * Sets an optional type flag.
 * @param {boolean} enable Whether the type can be undefined.
 */
TypeBuilder.TypeUnion.prototype.setOptionalType = function(enable) {
  this.optional = enable;
};


/**
 * Sets a variable type flag.
 * @param {boolean} enable Whether the type can be variable.
 */
TypeBuilder.TypeUnion.prototype.setVariableType = function(enable) {
  this.variable = enable;
};


/**
 * Sets a nullable type flag.
 * @param {boolean} enable Whether the type can be null.
 */
TypeBuilder.TypeUnion.prototype.setNullableType = function(enable) {
  this.nullable = enable;
  if (enable) {
    this.nonNullable = false;
  }
};


/**
 * Sets a non-nullable type flag.
 * @param {boolean} enable Whether the type can be not null.
 */
TypeBuilder.TypeUnion.prototype.setNonNullableType = function(enable) {
  this.nonNullable = enable;
  if (enable) {
    this.nullable = false;
  }
};


/**
 * Sets an all type flag.
 * @param {boolean} enable Whether the type can be any type.
 */
TypeBuilder.TypeUnion.prototype.setAllType = function(enable) {
  this.all = enable;
};


/**
 * Sets an unknown type flag.
 * @param {boolean} enable Whether the type is unknown.
 */
TypeBuilder.TypeUnion.prototype.setUnknownType = function(enable) {
  this.unknown = enable;
};


/** @override */
TypeBuilder.TypeUnion.prototype.toString = function() {
  if (this.all) {
    return '*';
  }
  else if (this.unknown) {
    return '?';
  }
  else {
    var str;
    var types = [].concat(this.types);

    if (this.variable) {
      str = '...';
    }
    else {
      str = '';
    }

    var typeName;
    if (this.optional) {
      typeName = new TypeBuilder.TypeName();
      typeName.setTypeName('undefined');
      types.push(typeName);
    }

    if (this.nullable) {
      typeName = new TypeBuilder.TypeName();
      typeName.setTypeName('null');
      types.push(typeName);
    }

    if (this.nonNullable) {
      str += '!';
    }

    return str + types.join('|');
  }
};



/**
 * A class for generic types.
 * @constructor
 */
TypeBuilder.GenericType = function() {
  this.parameterTypeUnions = [];
  this.paramCount_ = 0;
};


/**
 * Generic type name.
 * @type {?string}
 */
TypeBuilder.GenericType.prototype.genericTypeName = null;


/**
 * Generic parameter type unions.
 * @type {Array.<tsumekusaJsdoc.TypeBuilder.TypeUnion>}
 */
TypeBuilder.GenericType.prototype.parameterTypeUnions = null;


/**
 * Count of type unions.
 * @type {number}
 * @private
 */
TypeBuilder.GenericType.prototype.paramCount_;


/**
 * Sets a generic type name.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeName} name Generic type name.
 */
TypeBuilder.GenericType.prototype.setGenericTypeName = function(name) {
  this.genericTypeName = name;
};


/**
 * Adds a generic parameter type union.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} type Parameter type union to
 *     add.
 */
TypeBuilder.GenericType.prototype.addParameterTypeUnion = function(type) {
  this.parameterTypeUnions[this.paramCount_++] = type;
};


/** @override */
TypeBuilder.GenericType.prototype.toString = function() {
  return this.genericTypeName + '.<' + this.parameterTypeUnions.join(', ') +
      '>';
};



/**
 * A class for function types.
 * @constructor
 */
TypeBuilder.FunctionType = function() {
  this.parameterTypeUnions = [];
  this.paramCount_ = 0;
};


/**
 * Constructor function flag.  The function has to be a constructor if this flag
 * is true.
 * @type {boolean}
 */
TypeBuilder.FunctionType.prototype.isConstructor = false;


/**
 * Function parameter type unions.
 * @type {Array.<tsumekusaJsdoc.TypeBuilder.TypeUnion>}
 */
TypeBuilder.FunctionType.prototype.parameterTypeUnions = null;


/**
 * Fuction return type union.  Null if a function has nothing to return.
 * @type {?tsumekusaJsdoc.TypeBuilder.TypeUnion}
 */
TypeBuilder.FunctionType.prototype.returnTypeUnion = null;


/**
 * Fuction context type union.  Null if a context where a function run on is
 * not specified.
 * @type {?tsumekusaJsdoc.TypeBuilder.TypeUnion}
 */
TypeBuilder.FunctionType.prototype.contextTypeUnion = null;


/**
 * Sets a constructor flag.
 * @param {boolean} enable Whether a function is a constructor.
 */
TypeBuilder.FunctionType.prototype.setConstructor = function(enable) {
  this.isConstructor = enable;
};


/**
 * Sets a context type union.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} union Context type union.
 */
TypeBuilder.FunctionType.prototype.setContextTypeUnion = function(union) {
  this.contextTypeUnion = union;
};


/**
 * Adds a parameter type union.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} param Parameter type union to
 *     add.
 */
TypeBuilder.FunctionType.prototype.addParameterTypeUnion = function(param) {
  this.parameterTypeUnions[this.paramCount_++] = param;
};


/**
 * Sets a return type union.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} ret Return type union.
 */
TypeBuilder.FunctionType.prototype.setReturnTypeUnion = function(ret) {
  this.returnTypeUnion = ret;
};


/** @override */
TypeBuilder.FunctionType.prototype.toString = function() {
  var str = 'function(';
  var arr = [].concat(this.parameterTypeUnions);

  if (this.contextTypeUnion) {
    if (this.isConstructor) {
      arr.unshift('new: ' + this.contextTypeUnion);
    }
    else {
      arr.unshift('this: ' + this.contextTypeUnion);
    }
  }

  str += arr.join(', ') + ')';

  if (this.returnTypeUnion) {
    str += ': ' + this.returnTypeUnion;
  }

  return str;
};



/**
 * A class for record types.
 * @constructor
 */
TypeBuilder.RecordType = function() {
  this.entries = [];
  this.entryCount_ = 0;
};


/**
 * An array of entries.
 * @type {Array.<tsumekusaJsdoc.TypeBuilder.RecordType.Entry>}
 */
TypeBuilder.RecordType.prototype.entries = null;


/**
 * Count of entries.
 * @type {number}
 * @private
 */
TypeBuilder.RecordType.prototype.entryCount_ = null;


/**
 * Adds an entry to the target record.
 * @param {tsumekusaJsdoc.TypeBuilder.RecordType.Entry} entry Entry to add.
 */
TypeBuilder.RecordType.prototype.addEntry = function(entry) {
  this.entries[this.entryCount_++] = entry;
};


/** @override */
TypeBuilder.RecordType.prototype.toString = function() {
  return '{ ' + this.entries.join(', ') + ' }';
};



/**
 * A class for entries.
 * @constructor
 */
TypeBuilder.RecordType.Entry = function() {};


/**
 * Entry key name.
 * @type {string}
 */
TypeBuilder.RecordType.Entry.prototype.name = null;


/**
 * Entry value type union.
 * @type {?tsumekusaJsdoc.TypeBuilder.TypeUnion}
 */
TypeBuilder.RecordType.Entry.prototype.typeUnion = null;


/**
 * Sets an entry key name.
 * @param {string} keyName Entry key name to set.
 */
TypeBuilder.RecordType.Entry.prototype.setKeyName = function(keyName) {
  this.name = keyName;
};


/**
 * Sets a value type union.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeUnion} type Value type union to set.
 */
TypeBuilder.RecordType.Entry.prototype.setValueTypeUnion = function(type) {
  this.typeUnion = type;
};


/** @override */
TypeBuilder.RecordType.Entry.prototype.toString = function() {
  return this.name + ': ' + this.typeUnion;
};


// Exports the constructor.
module.exports = TypeBuilder;
