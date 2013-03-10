// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var InlineContent = require('./InlineContent');
var VimHelpStrongPublisher = require(
    '../publishing/vimhelp/VimHelpStrongPublisher');



/**
 * A class for strong (highlight) word.
 * @param {string} word Word to highlight.
 * @constructor
 * @extends {tsumekusa.contents.InlineContent}
 */
var Strong = function(word) {
  InlineContent.call(this);
  this.word_ = word;
};
tsumekusa.inherits(Strong, InlineContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
Strong.publisher = VimHelpStrongPublisher.getInstance();


/** @override */
Strong.prototype.isBreakable = function() {
  return false;
};


/**
 * Returns a strong word.
 * @return {string} Word.
 */
Strong.prototype.getWord = function() {
  return this.word_;
};


// Export the constructor
module.exports = Strong;
