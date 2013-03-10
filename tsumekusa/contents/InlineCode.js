// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var string = require('../../tsumekusa/string');
var InlineContent = require('./InlineContent');
var VimHelpInlineCodePublisher = require(
    '../publishing/vimhelp/VimHelpInlineCodePublisher');



/**
 * A class for inline code.
 * @param {string} code inline code.
 * @constructor
 * @extends {tsumekusa.contents.InlineContent}
 */
var InlineCode = function(code) {
  InlineContent.call(this);
  this.setCode(code);
};
tsumekusa.inherits(InlineCode, InlineContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
InlineCode.publisher = VimHelpInlineCodePublisher.getInstance();


/**
 * Code in the content.
 * @type {string}
 * @private
 */
InlineCode.prototype.code_ = null;


/** @override */
InlineCode.prototype.isBreakable = function() {
  return false;
};


/**
 * Sets a code.  This method is chainable.
 * @param {string} code Code to set.
 * @return {tsumekusa.contents.Code} This instance.
 */
InlineCode.prototype.setCode = function(code) {
  this.code_ = string.trim(code);
  return this;
};


/**
 * Returns a code.
 * @return {string} Code.
 */
InlineCode.prototype.getCode = function() {
  return this.code_;
};


// Exports the constructor.
module.exports = InlineCode;
