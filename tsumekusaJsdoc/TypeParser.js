// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var string = require(tsumekusaPath + '/string');

var TypeParser = function() {
  this.listenerMap_ = {};
};


/**
 * @enum {number}
 */
TypeParser.EventType = {
  OPEN_UNION: 'open-union',
  CLOSE_UNION: 'close-union',

  OPEN_GENERIC_PARAMS: 'open-generic-params',
  CLOSE_GENERIC_PARAMS: 'close-generic-params',

  OPEN_PARENS: 'open-parens',
  CLOSE_PARENS: 'close-parens',

  OPEN_RECORD: 'open-record',
  CLOSE_RECORD: 'close-record',

  RECORD_KEY: 'record-key',
  RECORD_TYPE: 'record-type',

  TYPE_NAME: 'type-name',
  ALL_TYPE: 'all-type',
  UNKNOWN_TYPE: 'unknown-type',
  VARIABLE_TYPE: 'variable-type',
  OPTIONAL_TYPE: 'optional-type',
  NULLABLE_TYPE: 'nullable-type',
  NON_NULLABLE_TYPE: 'non-nullable-type',

  OPEN_FUNCTION: 'open-function',
  CLOSE_FUNCTION: 'close-function',

  OPEN_FUNCTION_PARAMS: 'open-function-params',
  CLOSE_FUNCTION_PARAMS: 'close-function-params',

  FUNCTION_THIS: 'function-this',
  FUNCTION_NEW: 'function-new',
  FUNCTION_RETURN: 'function-return'
};


TypeParser.prototype.dispatchEvent = function(type, str) {
  var listeners;
  
  if (listeners = this.listenerMap_[type]) {
    listeners.forEach(function(listener) {
      var func = listener[0];
      var opt_this = listener[1];
      func.call(opt_this, type, str);
    });
  }
};


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


TypeParser.prototype.parse = function(arg) {
  var str = this.parseTypeUnion(arg);
  if (str) {
    throw Error('Type union string was remained: ' + str);
  }
};


/**
 * @param {string} arg Type string.
 * @return {string} Remained string.
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
    if (wasOpenParens && (str[0] === ')' || str[0] === ']')) {
      // Identify a square bracket with a parenthesis.1
      str = str.replace(/^[\)\]]\s*/, '');
      this.dispatchEvent(EventType.CLOSE_PARENS, null);
      break;
    }
    else if (str[0].match(/^[\)\}>,]/)) {
      // This is an end of union.  The close parens used as function params
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
 * @param {string} arg Type string.
 * @return {string} Remained string.
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
    str = str.replace(/^null\s*/i, '')
  }
  else if (str.match(/^unknown\b/i)) {
    this.dispatchEvent(EventType.UNKNOWN_TYPE, 'unknown');
    str = str.replace(/^unknown\s*/i, '')
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
 * @param {string} arg Function type string.
 * @return {string} Remained string.
 */
TypeParser.prototype.parseFunctionType = function(arg, types) {
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
 * @param {string} arg Type string.
 * @return {string} Remained string.
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
 * @param {string} arg Type string.
 * @return {string} Remained string.
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
