// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var string = require('../string');



/**
 * A singleton class for line wrap strategy.
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
 * NOTE: The method may hyphenate in a content that do not allow line break in
 * when the content is longer than given text width.
 * @param {Array.<tsumekusa.contents.InlineContent>} contents Contents to wrap.
 * @param {number} width Text width.
 * @param {?tsumekusa.publishing.LineWrapper.Indent=} opt_indent Optional
 *     indent.  No indent if undefined.
 * @return {string} Wrapped string.
 */
LineWrapper.prototype.wrap = function(contents, width, opt_indent) {
  var indent = opt_indent || new LineWrapper.Indent();
  var white = ' ';

  var words = this.splitWords(contents);

  if (width <= 0) {
    throw Error('Width is too shorter: ' + width);
  }

  // lineLen is excluded indent width.
  var lineLen = 0;
  var lineIdx = 0;
  var whites = string.repeat(white, indent.getIndentWidth(lineIdx));
  // set first indent.
  var arr = [whites], arrIdx = 1;

  var indentWidth;
  var textWidth;

  // TODO: Split to WrappedString class
  var appendBreak = function() {
    indentWidth = indent.getIndentWidth(++lineIdx);
    whites = string.repeat(white, indentWidth);
    arr[arrIdx++] = '\n' + whites;
    textWidth = width - indentWidth;
    if (textWidth <= 0) {
      throw Error('Indent width is greater than a width: ' + indentWidth +
                  '>=' + width);
    }
    lineLen = 0;
  };

  var appendWhite = function() {
    arr[arrIdx++] = white;
    lineLen += 1;
  };

  var appendWord = function(word) {
    arr[arrIdx++] = word;
    lineLen += word.length;
  };

  words.forEach(function(word, idx) {
    var wordLen = word.length;
    indentWidth = indent.getIndentWidth(lineIdx);
    textWidth = width - indentWidth;

    // Whether hyphenation is necessary.
    if (wordLen > textWidth) {
      // Whether hyphen is insertable at last. A hyphen is not insertable when a
      // remainder is less than 3 chars (a white, a char, a hyphen).
      if (textWidth - lineLen < 3) {
        appendBreak();
      }
      else {
        appendWhite();
      }
      var start = 0;
      var end = textWidth - lineLen;

      while (end < wordLen) {
        end -= 1; // 1 is a hyphen width.
        appendWord(word.slice(start, end) + '-');
        appendBreak();
        start = end;
        end = start + textWidth;
      }

      appendWord(word.slice(start, wordLen));
    }
    else {
      // Whether a word exists before the word.
      if (idx > 0) {
        // Whether a word and a white fall inside within the text width.
        if (wordLen + 1 <= textWidth - lineLen) {
          appendWhite();
        }
        // Whether a line break is necessary.
        else {
          appendBreak();
        }
      }
      appendWord(word);
    }
  });

  return string.trimRight(arr.join(''));
};



/**
 * A class for indent for {@link tsumekusa.publishing.LineWrapper#wrap}.
 * @constructor
 */
LineWrapper.Indent = function(opt_indentWidth) {
  this.indentWidth_ = opt_indentWidth || 0;
};


/**
 * Returns indent width by line index.
 * @param {number} lineIdx Line index that is indent insert before.
 * @return {number} Indent width.
 */
LineWrapper.Indent.prototype.getIndentWidth = function(lineIdx) {
  return this.indentWidth_;
};



// Exports the constructor
module.exports = LineWrapper;
