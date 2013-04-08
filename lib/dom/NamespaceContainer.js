// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;
var Container = tsumekusa.Container;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var PropertiesContainer = require(basePath + '/dom/PropertiesContainer');



/**
 * A class for a container explains any member.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.PropertiesContainer}
 */
var NamespaceContainer = function(symbol, opt_docHelper, opt_refHelper) {
  PropertiesContainer.call(this, symbol, NamespaceContainer.CAPTION,
      NamespaceContainer.MODIFIER, opt_docHelper, opt_refHelper);
};
util.inherits(NamespaceContainer, PropertiesContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a class document.
 * @const
 * @type {string}
 */
NamespaceContainer.CAPTION = 'Namespace';


/**
 * Default modifier for a constructor chapter.
 * @const
 * @type {string}
 */
NamespaceContainer.MODIFIER = 'constructor';


/** @override */
NamespaceContainer.prototype.getMembers = function() {
  var parent = this.getSymbol();
  return [parent];
};


// Exports the constructor.
module.exports = NamespaceContainer;
