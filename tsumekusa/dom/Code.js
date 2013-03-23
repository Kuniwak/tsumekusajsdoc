// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockElement = require(basePath + '/dom/BlockElement');



/**
 * A class for code block.
 * @param {string} code Code.
 * @constructor
 * @extends {tsumekusa.dom.BlockElement}
 */
var Code = function(code) {
  BlockElement.call(this);
  this.setCode(code);
};
tsumekusa.inherits(Code, BlockElement);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.CodePublisher}
 */
Code.publisher = null;


/**
 * Code in the content.
 * @type {string}
 * @private
 */
Code.prototype.code_ = null;


/**
 * Sets a code.  This method is chainable.
 * @param {string} code Code to set.
 * @return {tsumekusa.dom.Code} This instance.
 */
Code.prototype.setCode = function(code) {
  this.code_ = code;
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
