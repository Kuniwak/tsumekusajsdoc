// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var InlineCode = require(basePath + '/contents/InlineCode');
var InlineContent = require(basePath + '/contents/InlineContent');
var InlineCodePublisher = require(basePath + '/publishing/InlineCodePublisher');



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
InlineCode.publisher = InlineCodePublisher.getInstance();


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
  this.code_ = code;
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
