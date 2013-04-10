// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var Container = tsumekusa.Container;
var DefinitionList = tsumekusa.DefinitionList;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
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

  members.sort(this.compareFunc).forEach(function(member) {
    var def = this.createMemberDefinition(member);
    defs.addChild(def.getElement());
  }, this);

  topBlocks.addChild(dl);
  this.setElement(container);
};
util.inherits(MembersContainer, DocElement);


/**
 * Compares 2 members.  Used in Array#sort.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} a No description.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} b No description.
 * @return {number} Result.
 * @protected
 */
MembersContainer.prototype.compareFunc = function(a, b) {
  if (a.inherits) {
    if (b.inherits) {
      var aSym = tsumekusaJsdoc.MembersMap[a.inherits];
      var bSym = tsumekusaJsdoc.MembersMap[b.inherits];

      if (aSym === bSym) {
        return this.compareFunc(aSym, bSym);
      }
      else {
        var aLen = aSym.ancestors.length;
        var bLen = bSym.ancestors.length;
        return aLen === bLen ? 0 : aLen < bLen ? 1 : -1;
      }
    }
    else {
      return 1;
    }
  }
  else {
    if (b.inherits) {
      return -1;
    }
    else {
      return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
    }
  }
};


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
