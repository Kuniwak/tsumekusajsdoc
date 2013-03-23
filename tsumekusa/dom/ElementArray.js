// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var Element = require(basePath + '/dom/Element');



/**
 * A class for element array.  This class do not support any publishing.  You
 * can implement publish method for each case.
 * @param {?tsumekusa.dom.IElement=} opt_parent Optional parent.  Sets the
 *     parent to a child when the child is added, if {@code opt_parent} was
 *     given.
 * @constructor
 * @extends {tsumekusa.dom.Element}
 */
var ElementArray = function(opt_parent) {
  Element.call(this);
  this.children_ = [];
  this.setParent(opt_parent || null);
  this.count_ = 0;
};
tsumekusa.inherits(ElementArray, Element);


/**
 * Element as a parent of children in the array.  It means that a child can see
 * a parent through the array.
 * @type {?tsumekusa.dom.IElement}
 * @private
 */
ElementArray.prototype.parent_ = null;


/**
 * Elements as children of this array.
 * @type {Array.<T>}
 * @private
 */
ElementArray.prototype.children_ = null;


/**
 * Count of children.
 * @type {number}
 * @private
 */
ElementArray.prototype.count_;


/**
 * Returns a count of elements was added.
 * @return {number} Count of elements.
 */
ElementArray.prototype.getCount = function() {
  return this.count_;
};


/**
 * Sets a element as a parent of children.  This method is chainable.
 * @param {tsumekusa.dom.IElement} parent Parent element.
 * @return {tsumekusa.dom.ElementArray} This instance.
 */
ElementArray.prototype.setParent = function(parent) {
  this.parent_ = parent;
  return this;
};


/**
 * Returns a element as a parent of children.
 * @return {tsumekusa.dom.IElement} Parent element.
 */
ElementArray.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Returns elements are contained.
 * @return {Array.<T>} Elements.
 */
ElementArray.prototype.getChildren = function() {
  return this.children_;
};


/**
 * Returns the specified element as a chilf of this array at the given 0-based
 * index.
 * @param {number} index 0-based index.
 * @return {T} Child element as the given index.
 */
ElementArray.prototype.getChildAt = function(index) {
  return this.children_[index];
};


/**
 * Whether this array has children..
 * @return {boolean} Elements.
 */
ElementArray.prototype.hasChildren = function() {
  return this.count_ > 0;
};


/**
 * Adds the specified elements of this array to last.
 * @param {Array.<T>} elements Elements to add.
 * @return {tsumekusa.dom.ElementArray.<T>} This instance.
 */
ElementArray.prototype.addChildren = function(elements) {
  elements.forEach(function(element) {
    this.addChild(element);
  }, this);

  return this;
};


/**
 * Adds the specified element of this array to last.
 * @param {T} element Element to add.
 * @return {tsumekusa.dom.ElementArray.<T>} This instance.
 */
ElementArray.prototype.addChild = function(element) {
  this.addChildAt(element, this.getCount());
  return this;
};


/**
 * Adds the specified element of this array at the given 0-based index.
 * @param {T} element Element to add.
 * @param {number} index 0-based index at which the new element is to be added;
 *     must be between 0 and the current element count (inclusive).
 * @return {tsumekusa.dom.ElementArray.<T>} This instance.
 */
ElementArray.prototype.addChildAt = function(element, index) {
  if (element.setParent) {
    element.setParent(this);
  }
  this.children_.splice(index, 0, element);
  this.count_++;
  return this;
};


/**
 * Removes the specified element as a child of this array.
 * @param {T} element Element to remove.
 * @return {?T} Element was removed, if any.
 */
ElementArray.prototype.removeChild = function(element) {
  var index;
  if ((index = this.children_.indexOf(element)) >= 0) {
    return this.removeChildAt(index);
  }
  return null;
};


/**
 * Removes the specified element as a child of this array at the given 0-based
 * index.
 * @param {number} index 0-based index at which the element is to be removed;
 *     must be between 0 and the current element count (inclusive).
 * @return {?T} Element was removed, if any.
 */
ElementArray.prototype.removeChildAt = function(index) {
  var removed;
  if (this.children_[index]) {
    removed = this.children_.splice(index, 1)[0];
    this.count_--;

    if (removed.setParent) {
      removed.setParent(null);
    }
    return removed;
  }

  return null;
};


/**
 * Returns the 0-based index of the given child element, or -1 if no such child
 * is found.
 * @param {T} element Child element.
 * @return {number} 0-based index.
 */
ElementArray.prototype.indexOfChild = function(element) {
  return this.children_.indexOf(element);
};


/**
 * Returns a clone of the instance.
 * @return {tsumekusa.dom.ElementArray} Clone.
 */
ElementArray.prototype.clone = function() {
  var clone = new this.constructor();
  clone.children_ = this.children_;
  clone.count_ = this.count_;
  clone.parent_ = this.parent_;
  return clone;
};


// Exports the constructor.
module.exports = ElementArray;
