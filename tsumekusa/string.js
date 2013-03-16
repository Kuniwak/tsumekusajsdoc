// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for string utilities.
 * @namespace
 */
string = exports;


/**
 * Fills with characters between a head and a tail.  Word wrraps if header and
 * tail width is too longer.
 * @param {string} head Head string.
 * @param {string} tail Tail string.
 * @param {number} tw Text width.
 * @param {?string=} opt_char Optional character to insert.  Default is a white
 *     space.
 * @return {string} Builded string.
 */
string.fillMiddle = function(head, tail, tw, opt_char) {
  var headerWidth = head.length;
  var tailWidth = tail.length;
  var charWidth = tw - headerWidth - tailWidth;
  var char = opt_char || ' ';

  if (charWidth <= 0) {
    charWidth = tw - tailWidth;
    return [head, '\n', string.repeat(char, charWidth), tail].join('');
  }
  else {
    return [head, string.repeat(char, charWidth), tail].join('');
  }
};


/**
 * Pull right the given string.
 * @param {string} str String to pull right.
 * @param {number} tw Text width.
 * @return {string} Builded string.
 */
string.pullRight = function(str, tw, opt_char) {
  var whiteWidth = tw - str.length;
  if (whiteWidth < 0) {
    throw Error('Given string is too long: "' + str + '"');
  }

  return string.repeat(' ', whiteWidth) + str;
};


/**
 * Converts multiple whitespace chars (spaces, non-breaking-spaces, new lines
 * and tabs) to a single space, and strips leading and trailing whitespace.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} str Input string.
 * @return {string} A copy of {@code str} with collapsed whitespace.
 */
string.collapseWhitespace = function(str) {
  // Since IE doesn't include non-breaking-space (0xa0) in their \s character
  // class (as required by section 7.2 of the ECMAScript spec), we explicitly
  // include it in the regexp to enforce consistent cross-browser behavior.
  return str.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
};


/**
 * Removes the breaking spaces from the left and right of the string and
 * collapses the sequences of breaking spaces in the middle into single spaces.
 * The original and the result strings render the same way in HTML.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} str A string in which to collapse spaces.
 * @return {string} Copy of the string with normalized breaking spaces.
 */
string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, ' ').replace(
      /^[\t\r\n ]+|[\t\r\n ]+$/g, '');
};


/**
 * Trims white spaces to the left and right of a string.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} str The string to trim.
 * @return {string} A trimmed copy of {@code str}.
 */
string.trim = function(str) {
  // Since IE doesn't include non-breaking-space (0xa0) in their \s character
  // class (as required by section 7.2 of the ECMAScript spec), we explicitly
  // include it in the regexp to enforce consistent cross-browser behavior.
  return str.replace(/^\s+|\s+$/g, '');
};


/**
 * Trims whitespaces at the left end of a string.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} str The string to left trim.
 * @return {string} A trimmed copy of {@code str}.
 */
string.trimLeft = function(str) {
  // Since IE doesn't include non-breaking-space (0xa0) in their \s character
  // class (as required by section 7.2 of the ECMAScript spec), we explicitly
  // include it in the regexp to enforce consistent cross-browser behavior.
  return str.replace(/^\s+/, '');
};


/**
 * Trims whitespaces at the right end of a string.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} str The string to right trim.
 * @return {string} A trimmed copy of {@code str}.
 */
string.trimRight = function(str) {
  // Since IE doesn't include non-breaking-space (0xa0) in their \s character
  // class (as required by section 7.2 of the ECMAScript spec), we explicitly
  // include it in the regexp to enforce consistent cross-browser behavior.
  return str.replace(/\s+$/, '');
};


/**
 * Repeats a string n times.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} string The string to repeat.
 * @param {number} length The number of times to repeat.
 * @return {string} A string containing {@code length} repetitions of
 *     {@code string}.
 */
string.repeat = function(string, length) {
  return new Array(length + 1).join(string);
};


/**
 * Truncates a string to a certain length and adds {@code '...'} if necessary.
 * The length also accounts for the ellipsis, so a maximum length of 10 and a
 * string {@code 'Hello World!'} produces {@code 'Hello W...'}.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} str The string to truncate.
 * @param {number} chars Max number of characters.
 * @param {boolean=} opt_protectEscapedCharacters Whether to protect escaped
 *     characters from being cut off in the middle.
 * @return {string} The truncated {@code str} string.
 */
string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if (opt_protectEscapedCharacters) {
    str = string.unescapeEntities(str);
  }

  if (str.length > chars) {
    str = str.substring(0, chars - 3) + '...';
  }

  if (opt_protectEscapedCharacters) {
    str = string.htmlEscape(str);
  }

  return str;
};


/**
 * Unescapes an HTML string.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} str The string to unescape.
 * @return {string} An unescaped copy of {@code str}.
 */
string.unescapeEntities = function(str) {
  if (string.contains(str, '&')) {
    // Fall back on pure XML entities
    return string.unescapePureXmlEntities_(str);
  }
  return str;
};


/**
 * Unescapes XML entities.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @private
 * @param {string} str The string to unescape.
 * @return {string} An unescaped copy of {@code str}.
 */
string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch (entity) {
      case 'amp':
        return '&';
      case 'lt':
        return '<';
      case 'gt':
        return '>';
      case 'quot':
        return '"';
      default:
        if (entity.charAt(0) == '#') {
          // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex.
          var n = Number('0' + entity.substr(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        // For invalid entities we just return the entity
        return s;
    }
  });
};


/**
 * Checks whether a string contains a given substring.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {string} s The string to test.
 * @param {string} ss The substring to test for.
 * @return {boolean} True if {@code s} contains {@code ss}.
 */
string.contains = function(s, ss) {
  return s.indexOf(ss) != -1;
};
