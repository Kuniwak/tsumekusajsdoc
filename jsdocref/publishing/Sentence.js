// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * A class for document publishing.
 * @constructor
 * @implements {jsdocref.publishing.Content}
 */
Sentence = function() {
  this.contents_ = [];
};


/**
 * Sub contents of the sentence.
 * @type {Array.<jsdocref.publishing.Content>}
 * @private
 */
Sentence.prototype.contents_;


/**
 * Returns an array of sub contents.
 * @return {Array.<jsdocref.publishing.Content>} Sub contents.
 */
Sentence.prototype.getSubContents = function() {
  return this.contents_;
};


/**
 * Appends a sub content to last.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Content to append.
 * @return {jsdocref.publishing.Sentence} This instance.
 */
Sentence.prototype.appendSubContent = function(content) {
  return this.appendSubContentAt(content, this.contents_.length);
};


/**
 * Appends a sub content by an index.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Content to append.
 * @param {number} index Index.
 * @return {jsdocref.publishing.Sentence} This instance.
 */
Sentence.prototype.appendSubContentAt = function(content, index) {
  this.contents_.splice(index, 0, content);
  return this;
};


/**
 * Removes a sub content by a content.
 * @param {jsdocref.publishing.Content} content to remove.
 * @return {?jsdocref.publishing.Content} Content was removed, if any.
 */
Sentence.prototype.removeSubContent = function(content) {
  var index;
  if ((index = this.contents_.indexOf(content)) >= 0) {
    return this.removeSubContentAt(index);
  }
  return null;
};


/**
 * Removes a sub content by an index.
 * @param {number} index Index.
 * @return {?jsdocref.publishing.Content} Content was removed, if any.
 */
Sentence.prototype.removeSubContentAt = function(index) {
  return this.contents_.splice(index, 1)[0] || null;
};


// Exports the constructor.
module.exports = Sentence;