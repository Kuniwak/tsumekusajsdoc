// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Container = require(tsumekusaPath + '/dom/Container');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var MembersContainer = require(basePath + '/dom/MembersContainer');
var MethodDefinition = require(basePath + '/dom//MethodDefinition');



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
var ConstructorContainer = function(symbol, opt_docHelper, opt_refHelper) {
  MembersContainer.call(this, symbol, [symbol], ConstructorContainer.CAPTION,
      ConstructorContainer.MODIFIER, opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(ConstructorContainer, MembersContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a class document.
 * @const
 * @type {string}
 */
ConstructorContainer.CAPTION = 'Constructor';


/**
 * Default modifier for a constructor chapter.
 * @const
 * @type {string}
 */
ConstructorContainer.MODIFIER = 'constructor';


/** @override */
ConstructorContainer.prototype.createMemberDefinition = function(symbol) {
  return new MethodDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = ConstructorContainer;
