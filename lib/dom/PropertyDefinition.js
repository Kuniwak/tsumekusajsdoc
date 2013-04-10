// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var MemberDefinition = require(basePath + '/dom/MemberDefinition');
var ObjectDigest = require(basePath + '/dom/ObjectDigest');



/**
 * A class for a definition of a property.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var PropertyDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  MemberDefinition.call(this, symbol, opt_docHelper, opt_refHelper);

  var elem = this.getElement();
  var dd = elem.getDescriptions()
  
  if (symbol.isEnum) {
    dd.addChild(this.createEnumarableDefinitionList(symbol));
  }
};
util.inherits(PropertyDefinition, MemberDefinition);


/** @override */
PropertyDefinition.prototype.createDigest = function(symbol) {
  return new ObjectDigest(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a definition list explains an enumeration.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @return {tsumekusa.dom.DefinitionList} Definition list.
 */
PropertyDefinition.prototype.createEnumarableDefinitionList = function(symbol) {
  var docHelper = this.getDocHelper();
  var refHelper = this.getReferenceHelper();

  var dl = new DefinitionList();
  var defs = dl.getDefinitions();

  symbol.staticProperties.forEach(function(member) {
    var propDef = new PropertyDefinition(member, docHelper, refHelper);
    defs.addChild(propDef.getElement());
  }, this);

  return dl;
};


// Exports the constructor.
module.exports = PropertyDefinition;
