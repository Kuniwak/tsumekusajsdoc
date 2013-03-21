// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var ContentArray = require(basePath + '/dom/ContentArray');
var BlockContent = require(basePath + '/dom/BlockContent');



/**
 * A class for ordered/unordered list contents.
 * Use {@link tsumekusa.dom.DefinitionList} if you need.
 * @param {?tsumekusa.dom.DefinitionList.ListType=} opt_type List type.
 *     Default is no marker list.
 * @constructor
 * @extends {tsumekusa.dom.BlockContent}
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
DefinitionList.publisher = null;


/**
 * Definitions.
 * @type {tsumekusa.dom.ContentArray.<
 *     tsumekusa.dom.DefinitionList.Definition>}
 * @private
 */
DefinitionList.prototype.definitions_ = null;


/**
 * List type.
 * @type {tsumekusa.dom.List.ListType}
 * @private
 */
DefinitionList.prototype.type_;


/**
 * Returns a list type.
 * @return {tsumekusa.dom.DefinitionList.ListType} List type.
 */
DefinitionList.prototype.getListType = function() {
  return this.type_;
};


// Methods for definitions manipulation {{{
/**
 * Creates a new definition.
 * @param {tsumekusa.dom.Paragraph} term Definition term.
 * @param {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>}
 *     descs Definition content.
 * @param {?tsumekusa.dom.DefinitionList.ListType=} opt_type List type.
 *     Default is same type parent list.
 * @return {tsumekusa.dom.DefinitionList.Definition} Created definition.
 * @protected
 */
DefinitionList.prototype.createDefinition = function(term, descs, opt_type) {
  return new DefinitionList.Definition(term, descs, opt_type ||
      this.getListType());
};


/**
 * Returns a 0-based index of the specified definition.
 * @param {tsumekusa.dom.DefinitionList.Definition} def Definition.
 * @return {number} Index of the specified definition.
 */
DefinitionList.prototype.indexOfDefinitions = function(def) {
  return this.definitions_.getChildren().indexOf(def);
};


/**
 * Returns a definition by index.
 * @param {number} index Index of a definition to get.
 * @return {tsumekusa.dom.DefinitionList.Definition} Definition.
 */
DefinitionList.prototype.getDefinitionAt = function(index) {
  return this.definitions_.getChildAt(index);
};


/**
 * Adds a new definition.  The method is chainable.
 * @param {tsumekusa.dom.Paragraph} term Definition term.
 * @param {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>}
 *     descs Definition content.
 * @param {?tsumekusa.dom.DefinitionList.ListType=} opt_type List type.
 *     Default is same type parent list.
 * @return {tsumekusa.dom.DefinitionList} This instance.
 */
DefinitionList.prototype.addDefinition = function(term, descs, opt_type) {
  var definition = this.createDefinition(term, descs, opt_type);
  this.definitions_.addChild(definition);
  return this;
};


/**
 * Adds a new definition at the given 0-based index.  The method is chainable.
 * @param {tsumekusa.dom.Paragraph} term Definition term.
 * @param {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>}
 *     descs Definition content.
 * @param {number} index 0-based index.
 * @param {?tsumekusa.dom.DefinitionList.ListType=} opt_type List type.
 *     Default is same type parent list.
 * @return {tsumekusa.dom.DefinitionList} This instance.
 */
DefinitionList.prototype.addDefinitionAt = function(term, descs, index,
    opt_type) {
  var definition = this.createDefinition(term, descs, opt_type);
  this.definitions_.addChildAt(definition, index);
  return this;
};


/**
 * Removes the specified definition.
 * @param {tsumekusa.dom.DefinitionList.Definition} definition Definition
 *     to remove.
 * @return {?tsumekusa.dom.DefinitionList.Definition} Removed definition if
 *     any.
 */
DefinitionList.prototype.removeDefinition = function(definition) {
  var removed = this.definitions_.removeChild(definition);
  return removed;
};


/**
 * Removes the specified definition at the given 0-based index.
 * @param {number} index 0-based index.
 * @return {?tsumekusa.dom.DefinitionList.Definition} Removed definition if
 *     any.
 */
DefinitionList.prototype.removeDefinitionAt = function(index) {
  var removed = this.definitions_.removeChildAt(index);
  return removed;
};


/**
 * Returns definitions.
 * @return {tsumekusa.dom.ContentArray.<
 *     tsumekusa.dom.DefinitionList.Definition>} Definitions.
 */
DefinitionList.prototype.getDefinitions = function() {
  return this.definitions_;
};


/**
 * Returns a definition term.
 * @param {number} index Index of a definition to get.
 * @return {tsumekusa.dom.Paragraph} Definition term.
 */
DefinitionList.prototype.getTermAt = function(index) {
  var definition;
  return (definition = this.getDefinitionAt(index)) && definition.getTerm();
};


/**
 * Returns a definition content.
 * @param {number} index Index of a definition to get.
 * @return {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>}
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
 * @param {tsumekusa.dom.Paragraph|string=} opt_term Definition term.
 * @param {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>=}
 *    opt_descs Block contents as descriptions of the definition.
 * @param {?tsumekusa.dom.DefinitionList.ListType=} opt_type List type.
 * @constructor
 */
DefinitionList.Definition = function(opt_term, opt_descs, opt_type) {
  BlockContent.call(this);

  if (opt_term) {
    this.setTerm(opt_term);
  }

  if (opt_descs) {
    this.setDescriptions(opt_descs);
  }

  if (opt_type) {
    this.type_ = opt_type;
  }
};
tsumekusa.inherits(DefinitionList.Definition, BlockContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.DefinitionPublisher}
 */
DefinitionList.Definition.publisher = null;


/**
 * List type of the definition.
 * @type {tsumekusa.dom.DefinitionList.ListType}
 * @private
 */
DefinitionList.Definition.prototype.type_ = null;


/**
 * Paragraph as a term of the definition.
 * @type {tsumekusa.dom.Paragraph}
 * @private
 */
DefinitionList.Definition.prototype.term_ = null;


/**
 * Block contents as descriptions of the definition.
 * @type {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>}
 * @private
 */
DefinitionList.Definition.prototype.descs_ = null;


/**
 * Returns a paragraph as a term of the definition.
 * @return {tsumekusa.dom.Paragraph} Paragraph as a term of the
 *     definition.
 */
DefinitionList.Definition.prototype.getTerm = function() {
  return this.term_;
};


/**
 * Sets a paragraph as a term of the definition.  This method is chainable.
 * @param {tsumekusa.dom.Paragraph|string} term Paragraph as a term of the
 *     definition.
 * @return {tsumekusa.dom.DefinitionList.Definition} This instance.
 */
DefinitionList.Definition.prototype.setTerm = function(term) {
  var p = typeof term === 'string' ? new Paragraph(term) : term;
  p.setParent(this);

  this.term_ = p;
  return this;
};


/**
 * Returns block contents as descriptions of the definition.
 * @return {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>}
 *     Definition content.
 */
DefinitionList.Definition.prototype.getDescriptions = function() {
  return this.descs_;
};


/**
 * Sets block contents as descriptions of the definition.  This method is
 * chainable.
 * @param {tsumekusa.dom.ContentArray.<tsumekusa.dom.BlockContent>} descs
 *     Definition content.
 * @return {tsumekusa.dom.DefinitionList.Definition} This instance.
 */
DefinitionList.Definition.prototype.setDescriptions = function(descs) {
  this.descs_ = descs;
  descs.setParent(this);
  return this;
};


/**
 * Returns a list type.  Returns a list type of the parent list if it is null.
 * @return {tsumekusa.dom.DefinitionList.ListType} List type.
 */
DefinitionList.Definition.prototype.getListType = function() {
  return this.type_ || this.getParent().getListType();
};


/**
 * Returns a 0-based index of the definition.
 * @return {number} Index of the definition.
 */
DefinitionList.Definition.prototype.getIndex = function() {
  // TODO: Caching index.
  var parent = this.getParent();
  return parent.indexOfDefinitions(this);
};
//}}}


// Export the constructor
module.exports = DefinitionList;
