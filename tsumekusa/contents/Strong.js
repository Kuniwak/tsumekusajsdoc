// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var InlineContent = require(basePath + '/contents/InlineContent');



/**
 * A class for strong (highlight) word.
 * @param {string} word Word to highlight.
 * @constructor
 * @extends {tsumekusa.contents.InlineContent}
 */
var Strong = function(word) {
  InlineContent.call(this);
  this.content_ = word;
};
tsumekusa.inherits(Strong, InlineContent);


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
 * @return {string} Content string.
 */
Strong.prototype.getContent = function() {
  return this.content_;
};


// Export the constructor
module.exports = Strong;
