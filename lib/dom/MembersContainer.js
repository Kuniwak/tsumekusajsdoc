// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Container = require(tsumekusaPath + '/dom/Container');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for members container.  For example, the members are all static
 * methods.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {Array.<tsumekusaJsdoc.dom.DocletWrapper>} members Member symbols.
 * @param {string} caption Caption of the container such as {@code
 *     'Static members'}.
 * @param {string} modifier Modifier of the reference ID.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var MembersContainer = function(parent, caption, modifier, opt_docHelper,
    opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  this.parent_ = parent;

  var refId = this.getReferenceHelper().getReferenceId(parent, modifier);
  var container = new Container(caption, refId, true);
  var topBlocks = container.getTopElements();

  var dl = new DefinitionList(DefinitionList.ListType.NO_MARKER);
  var defs = dl.getDefinitions();

  var members = this.getMembers();

  members.forEach(function(member) {
    var def = this.createMemberDefinition(member);
    defs.addChild(def.getElement());
  }, this);

  topBlocks.addChild(dl);
  this.setElement(container);
};
tsumekusa.inherits(MembersContainer, DocElement);


/**
 * Returns a symbol.
 * @return {tsumekusaJsdoc.dom.DocletWrapper} Symbol.
 */
MembersContainer.prototype.getSymbol = function() {
  return this.parent_;
};


/**
 * Creates a member definition.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Member symbol.
 * @return {tsumekusaJsdoc.dom.MemberDefinition} Created method
 *     container.
 * @protected
 */
MembersContainer.prototype.createMemberDefinition = tsumekusa.abstractMethod; 


/**
 * Returns a members to document.
 * @return {Array.<tsumekusaJsdoc.dom.DocletWrapper>} Members.
 * @protected
 */
MembersContainer.prototype.getMembers = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = MembersContainer;
