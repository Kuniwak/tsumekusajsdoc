// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Container = require('../../tsumekusa/dom/Container');
var DocElement = require('./DocElement');



/**
 * A class for members container.  For example, the members are all static
 * methods.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Member symbols.
 * @param {string} caption Caption of the container such as {@code
 *     'Static members'}.
 * @param {string} modifier Modifier of the reference ID.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topElements Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var MembersContainer = function(parent, members, caption, modifier,
    opt_topElements, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);

  var refId = this.getReferenceHelper().getReferenceId(parent, modifier);

  var container = new Container(caption, refId, true);

  if (opt_topElements) {
    container.setTopElements(opt_topElements);
  }

  members.forEach(function(member) {
    var memberContainer = this.createMemberContainer(member);
    container.appendSubContainer(memberContainer.getElement());
  }, this);

  this.setElement(container);
};
tsumekusa.inherits(MembersContainer, DocElement);


/**
 * Creates a member container.
 * @param {jsdoc.Doclet} symbol Member symbol.
 * @return {tsumekusaJsdoc.dom.DocElement} Created method
 *     container.
 * @protected
 */
MembersContainer.prototype.createMemberContainer = tsumekusa.abstractMethod; 


// Exports the constructor.
module.exports = MembersContainer;
