// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var string = require('../string');



/**
 * A class for line wrap strategy.  The class can indent for each line.
 * Give your indent object to {@code opt_indent} or indent width if you want to
 * indentation. The indent object have to be implemented a {@code
 * getIndentWidth(lineNo)} that can return an indent width by a line number.
 *
 * <pre>
 * |-        base line width        -|
 * |- indent width -|-  line width  -|
 * </pre>
 *
 * @param {number} baseLineWidth A base line width.
 * @param {number|tsumekusa.publishing.LineWrapper.Indent=} opt_indent Optional
 *     indent object or indent width.  No indentation if falsey.
 * @constructor
 */
var LineWrapper = function(baseLineWidth, opt_indent) {
  this.buffer_ = new LineWrapper.LineBuffer();

  if (baseLineWidth <= 1) {
    throw Error('Width is too shorter: ' + baseLineWidth);
  }

  this.baseLineWidth_ = baseLineWidth;

  if (opt_indent) {
    this.indent_ = typeof opt_indent === 'number' ?
        new LineWrapper.Indent(opt_indent) : opt_indent;
  }
  else {
    this.indent_ = new LineWrapper.Indent();
  }

  this.refreshCurrentLineWidth_();
};


/**
 * Indent strategy.
 * @type {tsumekusa.publishing.LineWrapper.Indent}
 * @private
 */
LineWrapper.prototype.indent_ = null;


/**
 * Line buffer.
 * @type {tsumekusa.publishing.LineWrapper.LineBuffer}
 * @private
 */
LineWrapper.prototype.buffer_ = null;


/**
 * Base line width.  The width is including an indent width.
 * @type {number}
 * @private
 */
LineWrapper.prototype.baseLineWidth_ = null;


/**
 * Current line width.  The width is excluding an indent width.
 * @type {number}
 * @private
 */
LineWrapper.prototype.currentLineWidth_ = null;


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
 * @return {string} Wrapped string.
 */
LineWrapper.prototype.wrap = function(contents) {
  var words = this.splitWords(contents);
  var baseLineWidth = this.baseLineWidth_;
  var buffer = this.buffer_;
  var indent = this.indent_;

  words.forEach(function(word, idx) {
    var wordLen = word.length;

    // Whether hyphenation is necessary.
    if (wordLen > this.currentLineWidth_) {

      // Whether hyphen is insertable at last. A hyphen is not insertable when a
      // remainder width is less than 3 chars (a white, a char, a hyphen).
      if (this.currentLineWidth_ - buffer.getCurrentLineLength() < 3) {
        this.breakLine_();
      }
      var start = 0;
      var end = this.currentLineWidth_ - buffer.getCurrentLineLength() - (
          buffer.getCurrentWordCount() > 0);

      while (end < wordLen) {
        end -= 1; // 1 is a hyphen width.
        buffer.appendWord(word.slice(start, end) + '-');
        this.breakLine_();
        start = end;
        end = start + this.currentLineWidth_;
      }

      buffer.appendWord(word.slice(start));
    }
    else {
      // Whether a word with a white space fall inside within the text width.
      if (wordLen + 1 > this.currentLineWidth_ -
          buffer.getCurrentLineLength() && idx > 0) {
        this.breakLine_();
      }
      buffer.appendWord(word);
    }
  }, this);

  var output = buffer.getLines().map(function(line, lineNo) {
    var indentWhites = string.repeat(' ', indent.getIndentWidth(lineNo));
    return indentWhites + line.join(' ');
  }).join('\n');

  return output;
};


/**
 * Breaks a current line.
 * @private
 */
LineWrapper.prototype.breakLine_ = function() {
  this.buffer_.breakLine();
  this.refreshCurrentLineWidth_();
};


LineWrapper.prototype.refreshCurrentLineWidth_ = function() {
  var baseLineWidth = this.baseLineWidth_;
  var indentWidth = this.indent_.getIndentWidth(this.buffer_.
      getCurrentLineNumber());

  var currentLineWidth = baseLineWidth - indentWidth;

  if (currentLineWidth <= 1) {
    throw Error('Line width is too short: ' + currentLineWidth);
  }

  this.currentLineWidth_ = currentLineWidth;
};



/**
 * A class for indent for {@link tsumekusa.publishing.LineWrapper#wrap}.
 * @param {?number=} opt_indentWidth Optional indent width.  No indentation if
 *     falsey.
 * @constructor
 */
LineWrapper.Indent = function(opt_indentWidth) {
  this.indentWidth_ = opt_indentWidth || 0;
};


/**
 * Returns indent width by line number.
 * @param {number} lineNo Line number that is indent insert before.
 * @return {number} Indent width.
 */
LineWrapper.Indent.prototype.getIndentWidth = function(lineNo) {
  return this.indentWidth_;
};



/**
 * A class for line buffers.
 * @constructor
 */
LineWrapper.LineBuffer = function() {
  this.lines_ = [];

  // Initialize lines.
  this.switchLine(0);
};


/**
 * An array of lines.
 * @type {Array.<Array.<string>>}
 * @private
 */
LineWrapper.LineBuffer.prototype.lines_ = null;


/**
 * Index of a current line.
 * @type {number}
 * @private
 */
LineWrapper.LineBuffer.prototype.currentLineNo_ = null;


/**
 * Count of words are in a current line.
 * @type {number}
 * @private
 */
LineWrapper.LineBuffer.prototype.currentWordCount_ = null;


/**
 * String length of current line.
 * @type {number}
 * @private
 */
LineWrapper.LineBuffer.prototype.currentLineLen_ = null;


/**
 * Appends a word. This method is chainable.
 * @param {string} word Word string.
 * @return {tsumekusa.publishing.LineWrapper.LineBuffer} This instance.
 */
LineWrapper.LineBuffer.prototype.appendWord = function(word) {
  this.currentLine_[this.currentWordCount_++] = word;
  this.currentLineLen_ += word.length;
  return this;
};


/**
 * Swicth to a line has given line number.  Creates a new line if the line is
 * not exists.  This methods is chainable.
 * @param {number} lineNo Index of a line is swich to.
 * @return {tsumekusa.publishing.LineWrapper.LineBuffer} This instance.
 */
LineWrapper.LineBuffer.prototype.switchLine = function(lineNo) {
  this.currentLineNo_ = lineNo;

  // Creates a new line if a line has the number is not exists.
  if (this.lines_[lineNo]) {
    this.currentWordCount_ = (this.currentLine_ = this.lines_[lineNo]).length;
    this.currentLineLen_ = this.currentLine_.join('').length;
  }
  else {
    // Sets an indent to head of a new line.
    this.currentLine_ = this.lines_[lineNo] = [];
    this.currentWordCount_ = 0;
    this.currentLineLen_ = 0;
  }

  return this;
};


/**
 * Appends a line break.  This method is chainable.
 * @return {tsumekusa.publishing.LineWrapper.LineBuffer} This instance.
 */
LineWrapper.LineBuffer.prototype.breakLine = function() {
  this.switchLine(++this.currentLineNo_);
  return this;
};


/**
 * Returns a current line length.
 * @return {number} Current line length.
 */
LineWrapper.LineBuffer.prototype.getCurrentLineLength = function() {
  return this.currentLineLen_ + (this.currentWordCount_ > 1 ?
      this.currentWordCount_ - 1 : 0);
};


/**
 * Returns an current line number.
 * @return {number} Current liNe number.
 */
LineWrapper.LineBuffer.prototype.getCurrentLineNumber = function() {
  return this.currentLineNo_;
};


/**
 * Returns an current word count.
 * @return {number} Current word count.
 */
LineWrapper.LineBuffer.prototype.getCurrentWordCount = function() {
  return this.currentWordCount_;
};


/**
 * Returns an array of lines.
 * @return {Array.<Array.<string>>} Array of lines.
 */
LineWrapper.LineBuffer.prototype.getLines = function() {
  return this.lines_;
};


// Exports the constructor
module.exports = LineWrapper;
