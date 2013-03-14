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
 * Wraps contents with loose hyphenation.
 * Give your indent object to {@code opt_indent} or indent width if you want to
 * indentation. The indent object have to be implemented a {@code
 * getIndentWidth(lineNo)} that can return an indent width by a line number.
 *
 * <pre>
 * |-        base line width        -|
 * |- indent width -|-  line width  -|
 * </pre>
 *
 * NOTE: The method may hyphenate in a content that do not allow line break in
 * when the content is longer than given text width.
 * @param {Array.<tsumekusa.contents.InlineContent>|string} inlineContents
 *     Inline contents or strings to wrap.
 * @param {number} baseLineWidth Base line width.
 * @param {?tsumekusa.publishing.LineWrapper.Indent=} opt_indent Optional
 *     indent.  No indent if falsey.
 * @param {?tsumekusa.publishing.LineWrapper.WordSplitter=} opt_splitter Optional
 *     word spliting strategy.  In default, uses {@link
 *     tsumekusa.publishing.LineWrapper.WordSplitter}.
 * @param {boolean=} opt_keepBreak Whether line breaks are kept.  Default is not
 *     kept.
 * @return {string} Wrapped string.
 */
LineWrapper.prototype.wrap = function(inlineContents, baseLineWidth, opt_indent,
    opt_splitter, opt_keepBreak) {
  var splitter = opt_splitter || new LineWrapper.WordSplitter();
  var words = splitter.split(inlineContents);
  var indent = opt_indent || new LineWrapper.Indent();
  var white = ' ';

  if (baseLineWidth <= 0) {
    throw Error('Width is too shorter: ' + baseLineWidth);
  }

  // lineLen is excluded indent width.
  var lineLen = 0;
  var lineIdx = 0;
  var whites = string.repeat(white, indent.getIndentWidth(lineIdx));
  // set first indent.
  var arr = [whites], arrIdx = 1;

  var indentWidth;
  var currentLineWidtn;

  var appendBreak = function() {
    indentWidth = indent.getIndentWidth(++lineIdx);
    whites = string.repeat(white, indentWidth);
    arr[arrIdx++] = '\n' + whites;
    currentLineWidtn = baseLineWidth - indentWidth;
    if (currentLineWidtn <= 0) {
      throw Error('Indent width is greater than a width: ' + indentWidth +
                  '>=' + baseLineWidth);
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
    currentLineWidtn = baseLineWidth - indentWidth;

    // Whether hyphenation is necessary.
    if (wordLen > currentLineWidtn) {
      // Whether hyphen is insertable at last. A hyphen is not insertable when a
      // remainder is less than 3 chars (a white, a char, a hyphen).
      if (currentLineWidtn - lineLen < 3) {
        appendBreak();
      }
      else {
        appendWhite();
      }
      var start = 0;
      var end = currentLineWidtn - lineLen;

      while (end < wordLen) {
        end -= 1; // 1 is a hyphen width.
        appendWord(word.slice(start, end) + '-');
        appendBreak();
        start = end;
        end = start + currentLineWidtn;
      }

      appendWord(word.slice(start, wordLen));
    }
    else {
      // Whether a word exists before the word.
      if (idx > 0) {
        // Whether a word and a white fall inside within the text width.
        if (wordLen + 1 <= currentLineWidtn - lineLen) {
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
 * @param {?number=} opt_indentWidth Optional indent width.  Default is 0 as no
 *     indentation.
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



/**
 * A class for word spliting strategy.  The class is word boundray detecting
 * strategy for {@link tsumekusa.publishing.LineWrapper#wrap}. The {@code wrap}
 * method get word boundaries using {@link #split} in the class.
 * @constructor
 */
LineWrapper.WordSplitter = function() {};


/**
 * Splits on interword and returns an array of words.  Default strategy is:
 * Use {@link tsumekusa.contents.InlineContent#isBreakable} when inline content
 * was arrived.  Wraps in the content if the {@code isBreakable} returns a true.
 * @param {Array.<tsumekusa.contents.InlineContent>|string} contents Contents
 *     to split.
 * @return {Array.<string>} Splited content string.
 * @protected
 */
LineWrapper.WordSplitter.prototype.split = function(contents) {
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



// Exports the constructor
module.exports = LineWrapper;
