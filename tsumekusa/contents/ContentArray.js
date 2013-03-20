// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * A class for content array.  This class do not support any publishing.  You
 * can implement publish method for each case.
 * @param {?tsumekusa.contents.IContent=} opt_parent Optional parent.  Sets the
 *     parent to a child when the child is added, if {@code opt_parent} was
 *     given.
 * @constructor
 */
var ContentArray = function(opt_parent) {
  this.children_ = [];
  this.setParent(opt_parent || null);
};


/**
 * Content as a parent of children in the array.  It means that a child can see
 * a parent through the array.
 * @type {?tsumekusa.contents.IContent}
 * @private
 */
ContentArray.prototype.parent_ = null;


/**
 * Contents as children of this array.
 * @type {Array.<T>}
 * @private
 */
ContentArray.prototype.children_ = null;


/**
 * Returns a count of contents was added.
 * @return {number} Count of contents.
 */
ContentArray.prototype.getCount = function() {
  return this.children_.length;
};


/**
 * Sets a content as a parent of children.
 * @param {tsumekusa.contents.IContent} parent Parent content.
 */
ContentArray.prototype.setParent = function(parent) {
  this.parent_ = parent;
  this.getChildren().forEach(function(child) {
    child.setParent(parent);
  });
};


/**
 * Returns a content as a parent of children.
 * @return {tsumekusa.contents.IContent} Parent content.
 */
ContentArray.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Returns contents are contained.
 * @return {Array.<T>} Contents.
 */
ContentArray.prototype.getChildren = function() {
  return this.children_;
};


/**
 * Returns the specified content as a chilf of this array at the given 0-based
 * index.
 * @param {number} index 0-based index.
 * @return {T} Child content as the given index.
 */
ContentArray.prototype.getChildAt = function(index) {
  return this.children_[index];
};


/**
 * Whether this array has children..
 * @return {boolean} Contents.
 */
ContentArray.prototype.hasChildren = function() {
  return this.children_.length != 0;
};


/**
 * Adds the specified contents of this array to last.
 * @param {Array.<T>} contents Contents to add.
 * @return {tsumekusa.contents.ContentArray.<T>} This instance.
 */
ContentArray.prototype.addChildren = function(contents) {
  contents.forEach(function(content) {
    this.addChild(content);
  }, this);
};


/**
 * Adds the specified content of this array to last.
 * @param {T} content Content to add.
 * @return {tsumekusa.contents.ContentArray.<T>} This instance.
 */
ContentArray.prototype.addChild = function(content) {
  this.addChildAt(content, this.getCount());
  return this;
};


/**
 * Adds the specified content of this array at the given 0-based index.
 * @param {T} content Content to add.
 * @param {number} index 0-based index at which the new content is to be added;
 *     must be between 0 and the current content count (inclusive).
 * @return {tsumekusa.contents.ContentArray.<T>} This instance.
 */
ContentArray.prototype.addChildAt = function(content, index) {
  if (this.parent_) {
    content.setParent(this.parent_);
  }
  this.children_.splice(index, 0, content);
  return this;
};


/**
 * Removes the specified content as a child of this array.
 * @param {T} content Content to remove.
 * @return {?T} Content was removed, if any.
 */
ContentArray.prototype.removeChild = function(content) {
  var index;
  if ((index = this.children_.indexOf(content)) >= 0) {
    return this.removeChildAt(index);
  }
  return null;
};


/**
 * Removes the specified content as a child of this array at the given 0-based
 * index.
 * @param {number} index 0-based index at which the content is to be removed;
 *     must be between 0 and the current content count (inclusive).
 * @return {?T} Content was removed, if any.
 */
ContentArray.prototype.removeChildAt = function(index) {
  var removed;
  if (this.children_[index]) {
    removed = this.children_.splice(index, 1)[0];

    if (this.parent_) {
      removed.setParent(null);
    }
    return removed;
  }

  return null;
};


// Exports the constructor.
module.exports = ContentArray;
