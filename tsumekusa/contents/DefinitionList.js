// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var ContentArray = require(basePath + '/contents/ContentArray');
var BlockContent = require(basePath + '/contents/BlockContent');
var DefinitionListPublisher = require(basePath + 
    '/publishing/DefinitionListPublisher');
var DefinitionPublisher = require(basePath + 
    '/publishing/DefinitionPublisher');



/**
 * A class for ordered/unordered list contents.
 * Use {@link tsumekusa.contents.DefinitionList} if you need.
 * @param {?tsumekusa.contents.DefinitionList.ListType=} opt_type List type.
 *     Default is no marker list.
 * @constructor
 * @extends {tsumekusa.contents.BlockContent}
 */
var DefinitionList = function(opt_type) {
  BlockContent.call(this);
  this.definitions_ = new ContentArray(this);
  this.type_ = opt_type || DefinitionList.ListType.NO_MARKER;
};
tsumekusa.inherits(DefinitionList, BlockContent);


/**
 * List type numbers.
 * @enum {number}
 */
DefinitionList.ListType = {
  /** No marker list type. */
  NO_MARKER: 0,
  /** Ordered list type. */
  ORDERED: 1,
  /** Unordered list type. */
  UNORDERED: 2
};


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.DefinitionListPublisher}
 */
DefinitionList.publisher = DefinitionListPublisher.getInstance();


/**
 * Definitions.
 * @type {tsumekusa.contents.ContentArray.<
 *     tsumekusa.contents.DefinitionList.Definition>}
 * @private
 */
DefinitionList.prototype.definitions_ = null;


/**
 * List type.
 * @type {tsumekusa.contents.List.ListType}
 * @private
 */
DefinitionList.prototype.type_;


/**
 * Returns a list type.
 * @return {tsumekusa.contents.DefinitionList.ListType} List type.
 */
DefinitionList.prototype.getListType = function() {
  return this.type_;
};


// Methods for definitions manipulation {{{
/**
 * Creates a new definition.
 * @param {tsumekusa.contents.Paragraph} term Definition term.
 * @param {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     descs Definition content.
 * @param {?tsumekusa.contents.DefinitionList.ListType=} opt_type List type.
 *     Default is same type parent list.
 * @return {tsumekusa.contents.DefinitionList.Definition} Created definition.
 * @protected
 */
DefinitionList.prototype.createDefinition = function(term, descs, opt_type) {
  return new DefinitionList.Definition(term, descs, opt_type ||
      this.getListType());
};


/**
 * Returns a 0-based index of the specified definition.
 * @param {tsumekusa.contents.DefinitionList.Definition} def Definition.
 * @return {number} Index of the specified definition.
 */
DefinitionList.prototype.indexOfDefinitions = function(def) {
  return this.definitions_.getChildren().indexOf(def);
};


/**
 * Returns a definition by index.
 * @param {number} index Index of a definition to get.
 * @return {tsumekusa.contents.DefinitionList.Definition} Definition.
 */
DefinitionList.prototype.getDefinitionAt = function(index) {
  return this.definitions_.getChildAt(index);
};


/**
 * Adds a new definition.  The method is chainable.
 * @param {tsumekusa.contents.Paragraph} term Definition term.
 * @param {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     descs Definition content.
 * @param {?tsumekusa.contents.DefinitionList.ListType=} opt_type List type.
 *     Default is same type parent list.
 * @return {tsumekusa.contents.DefinitionList} This instance.
 */
DefinitionList.prototype.addDefinition = function(term, descs, opt_type) {
  var definition = this.createDefinition(term, descs, opt_type);
  this.definitions_.addChild(definition);
  return this;
};


/**
 * Adds a new definition at the given 0-based index.  The method is chainable.
 * @param {tsumekusa.contents.Paragraph} term Definition term.
 * @param {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     descs Definition content.
 * @param {number} index 0-based index.
 * @param {?tsumekusa.contents.DefinitionList.ListType=} opt_type List type.
 *     Default is same type parent list.
 * @return {tsumekusa.contents.DefinitionList} This instance.
 */
DefinitionList.prototype.addDefinitionAt = function(term, descs, index,
    opt_type) {
  var definition = this.createDefinition(term, descs, opt_type);
  this.definitions_.addChildAt(definition, index);
  return this;
};


/**
 * Removes the specified definition.
 * @param {tsumekusa.contents.DefinitionList.Definition} definition Definition
 *     to remove.
 * @return {?tsumekusa.contents.DefinitionList.Definition} Removed definition if
 *     any.
 */
DefinitionList.prototype.removeDefinition = function(definition) {
  var removed = this.definitions_.removeChild(definition);
  return removed;
};


/**
 * Removes the specified definition at the given 0-based index.
 * @param {number} index 0-based index.
 * @return {?tsumekusa.contents.DefinitionList.Definition} Removed definition if
 *     any.
 */
DefinitionList.prototype.removeDefinitionAt = function(index) {
  var removed = this.definitions_.removeChildAt(index);
  return removed;
};


/**
 * Returns definitions.
 * @return {tsumekusa.contents.ContentArray.<
 *     tsumekusa.contents.DefinitionList.Definition>} Definitions.
 */
DefinitionList.prototype.getDefinitions = function() {
  return this.definitions_;
};


/**
 * Returns a definition term.
 * @param {number} index Index of a definition to get.
 * @return {tsumekusa.contents.Paragraph} Definition term.
 */
DefinitionList.prototype.getTermAt = function(index) {
  var definition;
  return (definition = this.getDefinitionAt(index)) && definition.getTerm();
};


/**
 * Returns a definition content.
 * @param {number} index Index of a definition to get.
 * @return {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     Definition content.
 */
DefinitionList.prototype.getDescriptionAt = function(index) {
  var definition;
  return (definition = this.getDefinitionAt(index)) &&
      definition.getDescriptions();
};
//}}}



// Definition class {{{
/**
 * A class for definition.
 * @param {tsumekusa.contents.Paragraph|string} term Definition term.
 * @param {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *    descs Block contents as descriptions of the definition.
 * @param {tsumekusa.contents.DefinitionList.ListType} type List type.
 * @constructor
 */
DefinitionList.Definition = function(term, descs, type) {
  BlockContent.call(this);
  this.term_ = typeof term === 'string' ? new Paragraph(term) :
      term;
  this.descs_ = descs;
  this.type_ = type;
};
tsumekusa.inherits(DefinitionList.Definition, BlockContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.DefinitionPublisher}
 */
DefinitionList.Definition.publisher = DefinitionPublisher.getInstance();


/**
 * List type of the definition.
 * @type {tsumekusa.contents.DefinitionList.ListType}
 * @private
 */
DefinitionList.Definition.prototype.type_;


/**
 * Paragraph as a term of the definition.
 * @type {tsumekusa.contents.Paragraph}
 * @private
 */
DefinitionList.Definition.prototype.term_;


/**
 * Block contents as descriptions of the definition.
 * @type {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 * @private
 */
DefinitionList.Definition.prototype.descs_;


/**
 * Returns a paragraph as a term of the definition.
 * @return {tsumekusa.contents.Paragraph} Paragraph as a term of the
 *     definition.
 */
DefinitionList.Definition.prototype.getTerm = function() {
  return this.term_;
};


/**
 * Returns block contents as descriptions of the definition.
 * @return {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     Definition content.
 */
DefinitionList.Definition.prototype.getDescriptions = function() {
  return this.descs_;
};


/**
 * Returns a list type.
 * @return {tsumekusa.contents.DefinitionList.ListType} List type.
 */
DefinitionList.Definition.prototype.getListType = function() {
  return this.type_;
};


/**
 * Returns a 0-based index of the definition.
 * @return {number} Index of the definition.
 */
DefinitionList.Definition.prototype.getIndex = function() {
  var parent = this.getParent();
  return parent.indexOfDefinitions(this);
};
//}}}


// Export the constructor
module.exports = DefinitionList;
