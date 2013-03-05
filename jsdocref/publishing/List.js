// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var BlockContent = require('./BlockContent');
var VimHelpListPublisher = require('./VimHelpListPublisher');



/**
 * A class for ordered/unordered list contents.
 * Use {@link jsdocref.publishing.DefinitionList} if you need.
 * @param {?jsdocref.publishing.List.ListType=} opt_type List type.  Default
 *     type is unordered list.
 * @constructor
 * @extends {jsdocref.publishing.BlockContent}
 */
var List = function(opt_type) {
  BlockContent.call(this);
  this.listeds_ = [];
  this.type_ = opt_type || List.ListType.UNORDERED;
};
jsdocref.inherits(List, BlockContent);


/**
 * List type numbers.
 * @enum {number}
 */
List.ListType = {
  /** Ordered list type. */
  ORDERED: 0,
  /** Unordered list type. */
  UNORDERED: 1
};


/**
 * Default content publisher.
 * @type {jsdocref.publishing.ContentPublisher}
 */
List.publisher = VimHelpListPublisher.getInstance();


/**
 * Listed contents.
 * @type {Array.<jsdocref.publishing.Sentence>}
 * @private
 */
List.prototype.listeds_ = null;


/**
 * List type.
 * @type {jsdocref.publishing.List.ListType}
 * @private
 */
List.prototype.type_;


/**
 * Appends a list content.  The method is chainable.
 * @param {jsdocref.publishing.Sentence} content Content to append.
 * @return {jsdocref.publishing.List} This instance.
 */
List.prototype.appendListContent = function(content) {
  this.listeds_.push(content);
  return this;
};


/**
 * Removes a list content.
 * @param {jsdocref.publishing.Sentence} content Content to remove.
 * @return {jsdocref.publishing.Sentence} Removed content if exists.
 */
List.prototype.appendListContent = function(content) {
  var i = this.listeds_.indexOf(content);
  if (i >= 0) {
    this.listeds_.splice(i, 1) || null;
  }
  return null;
};


/**
 * Returns listed contents.
 * @return {Array.<jsdocref.publishing.Sentence>} Listed contents.
 */
List.prototype.getListedContents = function() {
  return this.listeds_;
};


/**
 * Returns a list type.
 * @return {jsdocref.publishing.List.ListType} List type.
 */
List.prototype.getListType = function() {
  return this.type_;
};


// Export the constructor
module.exports = List;
