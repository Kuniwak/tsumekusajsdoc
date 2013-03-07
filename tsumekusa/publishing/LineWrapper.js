// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');



/**
 * A class for line wrap strategy.
 * @constructor
 */
var LineWrapper = function() {};
tsumekusa.addSingletonGetter(LineWrapper);


/**
 * Splits on interword.
 * @param {Array.<tsumekusa.contents.InlineContent>|string} contents Contents
 *     to split.
 * @return {Array.<string>} Splited content string.
 * @protected
 */
LineWrapper.prototype.splitWords = function(contents) {
  var words = [];
  var whiteRegExp = /\s+/;
  var str;

  // Split on breakable point.
  contents.forEach(function(content) {
    if (content.publish) {
      str = content.publish();
      if (content.isBreakable()) {
        words = words.concat(str.split(whiteRegExp));
      }
      else {
        words.push(str);
      }
    }
    else {
      words = words.concat(content.split(whiteRegExp));
    }
  });

  return words;
};


/**
 * Wraps contents with loose hyphenation.
 * NOTE: The method may hyphenate in a content that do not allow break in.
 * @param {Array.<tsumekusa.contents.InlineContent>} contents Contents to wrap.
 * @param {number} width Text width.
 * @param {?number=} opt_indent Optional indent width.
 * @return {string} Wrapped string.
 */
LineWrapper.prototype.wrap = function(contents, width, opt_indent) {
  var indentWidth = opt_indent || 0;
  var indentWhites = indentWidth > 0 ? string.repeat(' ', indentWidth) : '';
  var textWidth = width - indentWidth;

  var words = this.splitWords(contents);
  var lineEnd = '\n' + indentWhites;

  if (width <= 0) {
    throw Error('Width is too shorter: ' + width);
  }

  if (indentWidth < 0) {
    throw Error('Indent width is too shorter: ' + indentWidth);
  }

  if (textWidth < 0) {
    throw Error('Indent width is longer than width: ' + indentWidth + ' > ' +
                textWidth);
  }

  // set first indent.
  var arr = [indentWhites], arrIndex = 1;
  var lineLen = 0;

  words.forEach(function(word, index) {
    var wordLen = word.length;
    var remainder = textWidth > lineLen ? textWidth - lineLen - 1 : 0;

    if (wordLen <= remainder) {
      if (index > 0) {
        arr[arrIndex++] = ' ';
        lineLen += 1;
      }
      arr[arrIndex++] = word;
      lineLen += wordLen;
      return;
    }

    // do NOT hyphenate if the word length is lower than text width.
    if (wordLen <= textWidth) {
      arr[arrIndex++] = lineEnd;
      arr[arrIndex++] = word;
      lineLen = wordLen;
      return;
    }

    // force break, if the word is larger than the text width.
    var start, end, last;

    // subtract a hyphen length from remainder
    remainder -= 1;

    if (remainder <= 0) {
      arr[arrIndex++] = lineEnd;
      arr[arrIndex++] = word.slice(0, textWidth - 1);
      start = textWidth - 1;
    }
    else {
      arr[arrIndex++] = ' ';
      arr[arrIndex++] = word.slice(0, remainder);
      start = remainder;
    }

    // check hyphenation will be done next
    if (wordLen - start <= textWidth) {
      end = start + textWidth;
    }
    else {
      end = start + textWidth - 1;
    }

    // force break continually until word end was got.
    while (start < wordLen) {
      arr[arrIndex++] = '-';
      arr[arrIndex++] = lineEnd;
      last = arr[arrIndex++] = word.slice(start, end);
      start = end;
      end += textWidth - 1;
    }

    lineLen = last.length;
  });

  return arr.join('');
};


// Exports the constructor
module.exports = LineWrapper;
