// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var string = require('../string');



/**
 * A class for word wrap strategy.  The class can indent for each line.
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
 * @param {number|tsumekusa.publishing.WordWrapper.Indent=} opt_indent Optional
 *     strategy to indent or an indent width.  No indentation if falsey.
 * @param {?tsumekusa.publishing.WordWrapper.WordSplitter=} opt_splitter
 *     Optional strategy to detect word boundaries.  In default, detect a word
 *     boundray when white spaces or word wraps are found.
 * @constructor
 */
var WordWrapper = function(baseLineWidth, opt_indent, opt_splitter) {
  if (baseLineWidth <= 1) {
    throw Error('Width is too shorter: ' + baseLineWidth);
  }

  this.baseLineWidth_ = baseLineWidth;
  this.splitter_ = opt_splitter || new WordWrapper.WordSplitter();

  if (opt_indent) {
    this.indent_ = typeof opt_indent === 'number' ?
        new WordWrapper.Indent(opt_indent) : opt_indent;
  }
  else {
    this.indent_ = new WordWrapper.Indent();
  }

  this.init();
};


/**
 * Indent strategy.
 * @type {tsumekusa.publishing.WordWrapper.Indent}
 * @private
 */
WordWrapper.prototype.indent_ = null;


/**
 * Line buffer.
 * @type {tsumekusa.publishing.WordWrapper.LineBuffer}
 * @private
 */
WordWrapper.prototype.buffer_ = null;


/**
 * Word boundray detection strategy.
 * @type {tsumekusa.publishing.WordWrapper.WordSplitter}
 * @private
 */
WordWrapper.prototype.splitter_ = null;


/**
 * Base line width.  The width is including an indent width.
 * @type {number}
 * @private
 */
WordWrapper.prototype.baseLineWidth_ = null;


/**
 * Current line width.  The width is excluding an indent width.
 * @type {number}
 * @private
 */
WordWrapper.prototype.currentLineWidth_ = null;


/**
 * Initialize the instance.
 * @protected
 */
WordWrapper.prototype.init = function() {
  this.buffer_ = new WordWrapper.LineBuffer();
  this.refreshCurrentLineWidth_();
};


/**
 * Word wraps the given contents.  Hypenate if a word length is greater than the
 * given base line width (but it may ignore rules of word-breaking).
 *
 * NOTE: The method may hyphenate in a content that do not allow word wrap in
 * when the content is longer than the given text width.
 * @param {Array.<tsumekusa.contents.InlineContent>} contents Contents to wrap.
 * @param {?boolean=} opt_keepBreak Whether keep original line breaks.  In
 *     default, line breaks are not kept.
 * @return {string} Wrapped string.
 */
WordWrapper.prototype.wrap = function(contents, opt_keepBreak) {
  if (opt_keepBreak) {
    return this.wrapKeepingBr(contents);
  }

  var words = this.splitter_.split(contents);
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

  // Prepare next processing.
  this.init();

  return output;
};


/**
 * Word wraps keeping line breaks.
 * @param {Array.<tsumekusa.contents.InlineContent>} contents Contents to wrap.
 * @return {string} Wrapped string.
 * @protected
 */
WordWrapper.prototype.wrapKeepingBr = function(contents) {
  var lines = [], linesIdx = 0, lastLine;

  contents.forEach(function(content) {
    if (typeof content === 'string') {
      var newLines = content.split(/\n/);
      var firstLineString = newLines.shift();

      if (lastLine = lines[linesIdx]) {
        // Concat last line and first line was splitted
        lastLine.push(firstLineString);
      }
      else {
        lastLine = lines[linesIdx] = [firstLineString];
      }

      newLines.forEach(function(newLine) {
        lines[++linesIdx] = [newLine];
      });
    }
    else {
      if (lastLine = lines[linesIdx]) {
        lastLine.push(content);
      }
      else {
        lastLine = lines[linesIdx] = [content];
      }
    }
  });

  var output = lines.map(function(line, lineNo) {
    return this.wrap(line);
  }, this).join('\n');

  return output;
};


/**
 * Breaks a current line.
 * @private
 */
WordWrapper.prototype.breakLine_ = function() {
  this.buffer_.breakLine();
  this.refreshCurrentLineWidth_();
};


/**
 * Refreshes a current line width by a base line width and an indent width.
 * @private
 */
WordWrapper.prototype.refreshCurrentLineWidth_ = function() {
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
 * A class for indent for {@link tsumekusa.publishing.WordWrapper#wrap}.  This
 * class support two-step indent. For example, {@code new Indent(3, 5)} as
 * bellow:
 * <pre>
 *    First indent (as opt_first)
 *      Second indent (as opt_after)
 *      Third indent (as opt_after)
 *      ...
 * </pre>
 * @param {?number=} opt_first Indent width to insert before first line. Default
 *     width is 0 (no indent).
 * @param {?number=} opt_after Indent width to insert before lines without first
 *     line.  Default width is same as {@code opt_first}.
 * @constructor
 */
WordWrapper.Indent = function(opt_first, opt_after) {
  this.first_ = opt_first || 0;
  this.after_ = opt_after || this.first_;
};


/**
 * Returns indent width by line number.
 * @param {number} lineNo 0-based line number that is indent insert before.
 * @return {number} Indent width.
 */
WordWrapper.Indent.prototype.getIndentWidth = function(lineNo) {
  return lineNo > 0 ? this.after_ : this.first_;
};



/**
 * A class for word spliting strategy.  The class is word boundray detecting
 * strategy for {@link tsumekusa.publishing.WordWrapper#wrap}. The {@code wrap}
 * method get word boundaries using {@link #split} in the class.
 * @constructor
 */
WordWrapper.WordSplitter = function() {};


/**
 * Splits on interword and returns an array of words.  Default strategy is:
 * Use {@link tsumekusa.contents.InlineContent#isBreakable} when inline content
 * was arrived.  Wraps in the content if the {@code isBreakable} returns a true.
 * @param {Array.<tsumekusa.contents.InlineContent>|string} contents Contents
 *     to split.
 * @return {Array.<string>} Splited content string.
 * @protected
 */
WordWrapper.WordSplitter.prototype.split = function(contents) {
  var words = [];
  var whiteRegExp = /\s+/;
  var str;

  // Split on breakable point.
  contents.forEach(function(content) {
    if (typeof content === 'string') {
      words.push.apply(words, content.split(whiteRegExp));
    }
    else {
      str = content.publish();
      if (content.isBreakable()) {
        words.push.apply(words, str.split(whiteRegExp));
      }
      else {
        words.push(str);
      }
    }
  });

  return words;
};



/**
 * A class for line buffers.
 * @constructor
 */
WordWrapper.LineBuffer = function() {
  this.lines_ = [];

  // Initialize lines.
  this.switchLine(0);
};


/**
 * An array of lines.
 * @type {Array.<Array.<string>>}
 * @private
 */
WordWrapper.LineBuffer.prototype.lines_ = null;


/**
 * Index of a current line.
 * @type {number}
 * @private
 */
WordWrapper.LineBuffer.prototype.currentLineNo_ = null;


/**
 * Count of words are in a current line.
 * @type {number}
 * @private
 */
WordWrapper.LineBuffer.prototype.currentWordCount_ = null;


/**
 * String length of current line.
 * @type {number}
 * @private
 */
WordWrapper.LineBuffer.prototype.currentLineLen_ = null;


/**
 * Appends a word. This method is chainable.
 * @param {string} word Word string.
 * @return {tsumekusa.publishing.WordWrapper.LineBuffer} This instance.
 */
WordWrapper.LineBuffer.prototype.appendWord = function(word) {
  this.currentLine_[this.currentWordCount_++] = word;
  this.currentLineLen_ += word.length;
  return this;
};


/**
 * Swicth to a line has given line number.  Creates a new line if the line is
 * not exists.  This methods is chainable.
 * @param {number} lineNo Index of a line is swich to.
 * @return {tsumekusa.publishing.WordWrapper.LineBuffer} This instance.
 */
WordWrapper.LineBuffer.prototype.switchLine = function(lineNo) {
  this.currentLineNo_ = lineNo;

  // Creates a new line if the specified line is not exists.
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
 * Appends a word wrap.  This method is chainable.
 * @return {tsumekusa.publishing.WordWrapper.LineBuffer} This instance.
 */
WordWrapper.LineBuffer.prototype.breakLine = function() {
  this.switchLine(++this.currentLineNo_);
  return this;
};


/**
 * Returns a current line length.
 * @return {number} Current line length.
 */
WordWrapper.LineBuffer.prototype.getCurrentLineLength = function() {
  return this.currentLineLen_ + (this.currentWordCount_ > 1 ?
      this.currentWordCount_ - 1 : 0);
};


/**
 * Returns an current line number.
 * @return {number} Current liNe number.
 */
WordWrapper.LineBuffer.prototype.getCurrentLineNumber = function() {
  return this.currentLineNo_;
};


/**
 * Returns an current word count.
 * @return {number} Current word count.
 */
WordWrapper.LineBuffer.prototype.getCurrentWordCount = function() {
  return this.currentWordCount_;
};


/**
 * Returns an array of lines.
 * @return {Array.<Array.<string>>} Array of lines.
 */
WordWrapper.LineBuffer.prototype.getLines = function() {
  return this.lines_;
};


// Exports the constructor
module.exports = WordWrapper;
