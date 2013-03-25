// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var string = require(tsumekusaPath + '/string');



/**
 * A class for jsdoc type parser.
 * @constructor
 */
var TypeParser = function() {
  this.listenerMap_ = {};
};


/**
 * Listner map.
 * @type {Object}
 * @private
 */
TypeParser.prototype.listenerMap_ = null;


/**
 * Event types for a jsdoc type parser.
 * @enum {number}
 */
TypeParser.EventType = {
  /** Dispatch when an opening type union was found. */
  OPEN_UNION: 'open-union',
  /** Dispatch when a closing type union was found. */
  CLOSE_UNION: 'close-union',

  /** Dispatch when an opening bracket as a generics parameters was found. */
  OPEN_GENERIC_PARAMS: 'open-generic-params',
  /** Dispatch when a closing bracket as a generics parameters was found. */
  CLOSE_GENERIC_PARAMS: 'close-generic-params',

  /** Dispatch when an opening parenthesis was found. */
  OPEN_PARENS: 'open-parens',
  /** Dispatch when a closing parenthesis was found. */
  CLOSE_PARENS: 'close-parens',

  /** Dispatch when an opening curly brace as a record was found. */
  OPEN_RECORD: 'open-record',
  /** Dispatch when a closing curly brace as a record was found. */
  CLOSE_RECORD: 'close-record',

  /** Dispatch when a record key was found. */
  RECORD_KEY: 'record-key',
  /** Dispatch when a record type was found. */
  RECORD_TYPE: 'record-type',

  /** Dispatch when a type name was found. */
  TYPE_NAME: 'type-name',
  /** Dispatch when an all-type operator was found. */
  ALL_TYPE: 'all-type',
  /** Dispatch when an unknown-type operator was found. */
  UNKNOWN_TYPE: 'unknown-type',
  /** Dispatch when a variable-type operator was found. */
  VARIABLE_TYPE: 'variable-type',
  /** Dispatch when an optional-type operator was found. */
  OPTIONAL_TYPE: 'optional-type',
  /** Dispatch when a nullable-type operator was found. */
  NULLABLE_TYPE: 'nullable-type',
  /** Dispatch when a non nullable-type operator was found. */
  NON_NULLABLE_TYPE: 'non-nullable-type',

  /** Dispatch when an opening function type was found. */
  OPEN_FUNCTION: 'open-function',
  /** Dispatch when a closing function type was found. */
  CLOSE_FUNCTION: 'close-function',

  /** Dispatch when an opening parenthesis as function params was found. */
  OPEN_FUNCTION_PARAMS: 'open-function-params',
  /** Dispatch when a closing parenthesis as function params was found. */
  CLOSE_FUNCTION_PARAMS: 'close-function-params',

  /** Dispatch when a 'this' operator in a function was found. */
  FUNCTION_THIS: 'function-this',
  /** Dispatch when a 'new' operator in a function was found. */
  FUNCTION_NEW: 'function-new',
  /** Dispatch when a return type was found. */
  FUNCTION_RETURN: 'function-return'
};


/**
 * Dispatches the specified event.
 * @param {tsumekusaJsdoc.TypeParser.EventType} type Event type to dispatch.
 * @param {?string=} opt_str Optional string that is given to listeners.
 */
TypeParser.prototype.dispatchEvent = function(type, opt_str) {
  var listeners;

  if (listeners = this.listenerMap_[type]) {
    listeners.forEach(function(listener) {
      var func = listener[0];
      var opt_this = listener[1];
      func.call(opt_this, type, opt_str);
    });
  }
};


/**
 * Adds an event listener of the specified event type.
 * @param {tsumekusaJsdoc.TypeParser.EventType} type Event type to dispatch.
 * @param {function(this:*, tsumekusaJsdoc.TypeParser.EventType, ?string=)}
 *     func Listner function.
 * @param {*=} opt_this Optional function scope for the listener.
 */
TypeParser.prototype.addEventListener = function(type, func, opt_this) {
  var listener = [func, opt_this];
  var listeners;
  if (listeners = this.listenerMap_[type]) {
    listeners.push(listener);
  }
  else {
    this.listenerMap_[type] = [listener];
  }
};


/**
 * Parses a type string.
 * @param {string} arg Type string.
 */
TypeParser.prototype.parse = function(arg) {
  var str = this.parseTypeUnion(arg);
  if (str) {
    throw Error('Type union string was remained: ' + str);
  }
};


/**
 * Parses a type union expression.
 * @param {string} arg Type string.
 * @return {string} Remained string.
 * @protected
 */
TypeParser.prototype.parseTypeUnion = function(arg) {
  var EventType = TypeParser.EventType;
  var str = string.trimLeft(arg);
  var hasQuestionMark = false;
  var hasType = false;
  var wasOpenParens = false;

  this.dispatchEvent(EventType.OPEN_UNION, null);

  // Check type operators on a head of the type union.
  var tmp, matched;
  if (tmp = str.match(/^(\.{3}|[=!?\s])+/)) {
    matched = tmp[0];
    str = str.slice(matched.length);

    if (matched.indexOf('=') >= 0) {
      this.dispatchEvent(EventType.OPTIONAL_TYPE, '=');
    }
    if (matched.indexOf('...') >= 0) {
      this.dispatchEvent(EventType.VARIABLE_TYPE, '...');
    }
    if (matched.indexOf('!') >= 0) {
      this.dispatchEvent(EventType.NON_NULLABLE_TYPE, '!');
    }
    if (matched.indexOf('?') >= 0) {
      // Cannot determine the question mark means 'the all type' or 'nullable'
      // without type count.
      hasQuestionMark = true;
    }
  }


  if (str[0] === '(' || str[0] === '[') {
    // Identify a square bracket with a parenthesis.1
    str = str.replace(/^[\(\[]\s*/, '');
    this.dispatchEvent(EventType.OPEN_PARENS, null);
    wasOpenParens = true;
  }

  while (str[0]) {
    if (str.match(/^[\)\]\}>,]/)) {
      // This is an end of union.  The close parens used as function params
      if (wasOpenParens && (str[0] === ')' || str[0] === ']')) {
        // Identify a square bracket with a parenthesis.1
        str = str.replace(/^[\)\]]\s*/, '');
        this.dispatchEvent(EventType.CLOSE_PARENS, null);
      }
      break;
    }
    else {
      // Check type operators on a tail of the type union.
      if (tmp = str.match(/^[=!?\s]+/)) {
        matched = tmp[0];
        str = str.slice(matched.length);

        if (matched.indexOf('=') >= 0) {
          this.dispatchEvent(EventType.OPTIONAL_TYPE, '=');
        }
        if (matched.indexOf('!') >= 0) {
          this.dispatchEvent(EventType.NON_NULLABLE_TYPE, '!');
        }
        if (matched.indexOf('?') >= 0) {
          hasQuestionMark = true;
        }
      }
      else {
        str = this.parseType(str).replace(/^\|\s*/, '');
        hasType = true;
      }
    }
  }

  // Check a type count.  If the count is less than 1, the question mark means
  // the all type.  Otherwise, nullable.
  if (hasQuestionMark) {
    if (hasType) {
      this.dispatchEvent(EventType.NULLABLE_TYPE, '?');
    }
    else {
      this.dispatchEvent(EventType.UNKNOWN_TYPE, '?');
    }
  }


  this.dispatchEvent(EventType.CLOSE_UNION, null);
  return str;
};


/**
 * Parses a single type expression such as: type name, generics, function.
 * @param {string} arg Type string.
 * @return {string} Remained string.
 * @protected
 */
TypeParser.prototype.parseType = function(arg) {
  var str = arg;
  var EventType = TypeParser.EventType;

  var str, tmp, matched;
  if (!str) {
    throw Error('Empty type as a null string was found: ' + str);
  }
  else if (str.match(/^\*/)) {
    this.dispatchEvent(EventType.ALL_TYPE, '*');
    str = str.replace(/^\*\s*/, '');
  }
  else if (tmp = str.match(/^(void|undefined)\b/i)) {
    this.dispatchEvent(EventType.OPTIONAL_TYPE, tmp[1]);
    str = str.replace(/^(void|undefined)\s*/i, '');
  }
  else if (str.match(/^null\b/i)) {
    this.dispatchEvent(EventType.NULLABLE_TYPE, 'null');
    str = str.replace(/^null\s*/i, '');
  }
  else if (str.match(/^unknown\b/i)) {
    this.dispatchEvent(EventType.UNKNOWN_TYPE, 'unknown');
    str = str.replace(/^unknown\s*/i, '');
  }
  else if (str.match(/^function\b/i)) {
    str = this.parseFunctionType(str);
  }
  else if (str.match(/^\{/)) {
    str = this.parseRecordType(str);
  }
  else {
    tmp = str.match(/^[\w\s\.#\/$]+/);

    if (!tmp) {
      // This is an empty type such as ',foobar' or '|foobar'.
      throw Error('Empty type was found before a type operator: ' + str);
    }

    matched = tmp[0];
    str = str.slice(matched.length);

    // Remove a last period, because matched may have a period on the end of the
    // type string.
    matched = matched.replace(/\s+/g, '').replace(/\.$/, '');

    if (str.match(/^\[\s*\]/)) {
      // Support a array generic type as jsdoc official such as String[].
      // String[] => Array.<String>
      this.dispatchEvent(EventType.TYPE_NAME, 'Array');
      this.parseGenericParams('<' + matched + '>');
      str = str.replace(/^\[\s*\]\s*/, '');
    }
    else if (matched) {
      this.dispatchEvent(EventType.TYPE_NAME, matched);
    }
    else {
      // This is an empty type that has only white spaces.
      throw Error('Empty type was found.');
    }

    if (str.match(/^</)) {
      str = this.parseGenericParams(str);
    }
  }

  return str;
};


/**
 * Parsing a function type expression.
 * @param {string} arg Function type string.
 * @return {string} Remained string.
 * @protected
 */
TypeParser.prototype.parseFunctionType = function(arg) {
  var str = arg.replace(/^function\s*/i, '');
  var EventType = TypeParser.EventType;

  this.dispatchEvent(EventType.OPEN_FUNCTION, null);

  if (str[0] === '(') {
    this.dispatchEvent(EventType.OPEN_FUNCTION_PARAMS, null);
    str = str.replace(/\(\s*/, '');

    if (str.match(/^new\s*:/)) {
      this.dispatchEvent(EventType.FUNCTION_NEW, null);
      str = this.parseTypeUnion(str.replace(/^new\s*:\s*/, ''))
          .replace(/^,?\s*/, '');
    }
    else if (str.match(/^this\s*:/)) {
      this.dispatchEvent(EventType.FUNCTION_THIS, null);
      str = this.parseTypeUnion(str.replace(/^this\s*:\s*/, ''))
          .replace(/^,?\s*/, '');
    }

    var char;
    while ((char = str[0]) !== ')') {
      if (char) {
        str = this.parseTypeUnion(str).replace(/^,?\s*/, '');
      }
      else {
        throw Error('Parameter parenthesis was not closed: ' + str);
      }
    }

    str = str.replace(/^\)\s*/, '');

    this.dispatchEvent(EventType.CLOSE_FUNCTION_PARAMS, null);
  }
  else {
    this.dispatchEvent(EventType.TYPE_NAME, arg.match(/^function/i)[0]);
  }

  if (str.match(/^:/)) {
    this.dispatchEvent(EventType.FUNCTION_RETURN, null);
    str = this.parseTypeUnion(str.replace(/^:\s*/, ''));
  }

  this.dispatchEvent(EventType.CLOSE_FUNCTION, null);
  return str;
};


/**
 * Parses a generic type expression.
 * @param {string} arg Type string.
 * @return {string} Remained string.
 * @protected
 */
TypeParser.prototype.parseGenericParams = function(arg) {
  var str = arg.replace(/^<\s*/, '');
  var EventType = TypeParser.EventType;

  this.dispatchEvent(EventType.OPEN_GENERIC_PARAMS, null);

  var char;
  while ((char = str[0]) !== '>') {
    if (char) {
      str = this.parseTypeUnion(str).replace(/^,?\s*/, '');
    }
    else {
      throw Error('Square bracket as generic params was not closed: ' + str);
    }
  }

  this.dispatchEvent(EventType.CLOSE_GENERIC_PARAMS, null);
  return str.replace(/^>\s*/, '');
};


/**
 * Parses a record type expression.
 * @param {string} arg Type string.
 * @return {string} Remained string.
 * @protected
 */
TypeParser.prototype.parseRecordType = function(arg) {
  var str = arg.replace(/^\{\s*/, '');
  var EventType = TypeParser.EventType;

  this.dispatchEvent(EventType.OPEN_RECORD, null);

  var tmp, matched;
  while (str[0] !== '}') {
    if (tmp = str.match(/^[^:\}]+/)) {
      matched = tmp[0];
      str = str.slice(matched.length);
      this.dispatchEvent(EventType.RECORD_KEY, matched.replace(/\s+/g, ''));
    }

    if (str[0] === ':') {
      str = this.parseTypeUnion(str.replace(/^:\s*/, '')).replace(/^,?\s*/, '');
    }
    else {
      // Consider a record value type as the all type if a colon was not found.
      this.parseTypeUnion('*');
      str = str.replace(/^,?\s*/, '');
    }
  }

  this.dispatchEvent(EventType.CLOSE_RECORD, null);
  return str.replace(/^\}\s*/, '');
};


// Exports the constructor.
module.exports = TypeParser;
