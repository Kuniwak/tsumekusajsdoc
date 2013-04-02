// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Container = require(tsumekusaPath + '/dom/Container');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var MembersContainer = require(basePath + '/dom/MembersContainer');
var PropertyDefinition = require(basePath + '/dom//PropertyDefinition');



/**
 * A class for a container explains any member.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.MembersContainer}
 */
var NamespaceContainer = function(symbol, opt_docHelper, opt_refHelper) {
  MembersContainer.call(this, symbol, [symbol], NamespaceContainer.CAPTION,
      NamespaceContainer.MODIFIER, opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(NamespaceContainer, MembersContainer);


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
NamespaceContainer.prototype.createMemberDefinition = function(symbol) {
  return new PropertyDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = NamespaceContainer;
