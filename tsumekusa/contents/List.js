// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var BlockContent = require('./BlockContent');
var VimHelpListPublisher = require('../publishing/VimHelpListPublisher');



/**
 * A class for ordered/unordered list contents.
 * Use {@link tsumekusa.contents.DefinitionList} if you need.
 * @param {?tsumekusa.contents.List.ListType=} opt_type List type.  Default
 *     type is unordered list.
 * @constructor
 * @extends {tsumekusa.contents.BlockContent}
 */
var List = function(opt_type) {
  BlockContent.call(this);
  this.listeds_ = [];
  this.type_ = opt_type || List.ListType.UNORDERED;
};
tsumekusa.inherits(List, BlockContent);


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
 * @type {tsumekusa.publishing.ContentPublisher}
 */
List.publisher = VimHelpListPublisher.getInstance();


/**
 * Listed contents.
 * @type {Array.<tsumekusa.contents.Sentence>}
 * @private
 */
List.prototype.listeds_ = null;


/**
 * List type.
 * @type {tsumekusa.contents.List.ListType}
 * @private
 */
List.prototype.type_;


/**
 * Appends a list content.  The method is chainable.
 * @param {tsumekusa.contents.Sentence} content Content to append.
 * @return {tsumekusa.contents.List} This instance.
 */
List.prototype.appendListContent = function(content) {
  this.listeds_.push(content);
  return this;
};


/**
 * Removes a list content.
 * @param {tsumekusa.contents.Sentence} content Content to remove.
 * @return {tsumekusa.contents.Sentence} Removed content if exists.
 */
List.prototype.removeListContent = function(content) {
  var i = this.listeds_.indexOf(content);
  if (i >= 0) {
    this.listeds_.splice(i, 1) || null;
  }
  return null;
};


/**
 * Returns listed contents.
 * @return {Array.<tsumekusa.contents.Sentence>} Listed contents.
 */
List.prototype.getListedContents = function() {
  return this.listeds_;
};


/**
 * Returns a list type.
 * @return {tsumekusa.contents.List.ListType} List type.
 */
List.prototype.getListType = function() {
  return this.type_;
};


// Export the constructor
module.exports = List;
