// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var InlineElement = require(basePath + '/dom/InlineElement');



/**
 * A class for strong (highlight) word.
 * @param {string} word Word to highlight.
 * @constructor
 * @extends {tsumekusa.dom.InlineElement}
 */
var Strong = function(word) {
  InlineElement.call(this);
  this.content_ = word;
};
tsumekusa.inherits(Strong, InlineElement);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.StorngPublisher}
 */
Strong.publisher = null;


/**
 * Strong content.
 * @type {string}
 * @private
 */
Strong.prototype.content_ = null;


/** @override */
Strong.prototype.isBreakable = function() {
  return false;
};


/**
 * Returns a strong content.
 * @return {string} Element string.
 */
Strong.prototype.getElement = function() {
  return this.content_;
};


// Export the constructor
module.exports = Strong;
