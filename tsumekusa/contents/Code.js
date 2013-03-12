// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var string = require('../../tsumekusa/string');
var BlockContent = require('./BlockContent');
var VimHelpCodePublisher = require(
    '../publishing/vimhelp/VimHelpCodePublisher');



/**
 * A class for code block.
 * @param {string} code Code.
 * @constructor
 * @extends {tsumekusa.contents.BlockContent}
 */
var Code = function(code) {
  BlockContent.call(this);
  this.setCode(code);
};
tsumekusa.inherits(Code, BlockContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
Code.publisher = VimHelpCodePublisher.getInstance();


/**
 * Code in the content.
 * @type {string}
 * @private
 */
Code.prototype.code_ = null;


/**
 * Sets a code.  This method is chainable.
 * @param {string} code Code to set.
 * @return {tsumekusa.contents.Code} This instance.
 */
Code.prototype.setCode = function(code) {
  this.code_ = string.trim(code);
  return this;
};


/**
 * Returns a code.
 * @return {string} Code.
 */
Code.prototype.getCode = function() {
  return this.code_;
};


// Exports the constructor.
module.exports = Code;
