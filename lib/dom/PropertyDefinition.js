// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for definitions of a property.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var MemberDefinition = require(basePath + '/dom/MemberDefinition');
var ObjectDigest = require(basePath + '/dom/ObjectDigest');



/**
 * A class for definitions of a property.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/PropertyDefinition
 */
var PropertyDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  MemberDefinition.call(this, symbol, opt_docHelper, opt_refHelper);

  var elem = this.getElement();
  var dd = elem.getDescriptions();

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
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
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
