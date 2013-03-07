// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var InlineContent = require('./InlineContent');
var VimHelpCodePublisher = require('../publishing/VimHelpCodePublisher');



/**
 * A class for code.
 * @param {string} code Code.
 * @param {?string=} opt_lang Optional programming language.
 * @constructor
 * @extends {tsumekusa.contents.InlineContent}
 */
var Code = function(code, opt_lang) {
  InlineContent.call(this);
  this.lang_ = opt_lang || null;
};
tsumekusa.inherits(Code, InlineContent);


/**
 * Programming language names.
 * @enum {string}
 */
Code.Language = {
  JAVASCRIPT: 'javascript'
};


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
Code.prototype.code_;


/**
 * Programming language of the code.
 * @type {string}
 * @private
 */
Code.prototype.lang_ = Code.Language.JAVASCRIPT;


/** @override */
Code.prototype.isBreakable = function() {
  return false;
};


/**
 * Sets a code.  This method is chainable.
 * @param {string} code Code to set.
 * @return {tsumekusa.contents.Code} This instance.
 */
Code.prototype.setCode = function(code) {
  this.code_ = code.replace(/\n+$/, '\n');
  return this;
};


/**
 * Returns a code.
 * @return {string} Code.
 */
Code.prototype.getCode = function() {
  return this.code_;
};


/**
 * Returns a language of the code.
 * @return {string} Programming language.
 */
Code.prototype.getLanguage = function() {
  return this.lang_;
};


// Exports the constructor.
module.exports = Code;
