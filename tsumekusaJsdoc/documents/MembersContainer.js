// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Container = require('../../tsumekusa/contents/Container');
var DocumentationContent = require('./DocumentationContent');



/**
 * A class for members container.  For example, the members are all static
 * methods.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Member symbols.
 * @param {string} caption Caption of the container such as {@code
 *     'Static members'}.
 * @param {string} modifier Modifier of the reference ID.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsDoc.documents.DocumentationContent}
 */
var MembersContainer = function(parent, members, caption, modifier,
    opt_docHelper, opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);

  var refId = this.getReferenceHelper().getReferenceId(parent, modifier);

  var container = new Container(caption, refId, true);

  members.forEach(function(member) {
    var memberContainer = this.createMemberContainer(member);
    container.appendSubContainer(memberContainer);
  }, this);

  this.setContent(container);
};
tsumekusa.inherits(MembersContainer, DocumentationContent);


/**
 * Creates a member container.
 * @param {jsdoc.Doclet} symbol Member symbol.
 * @return {tsumekusaJsdoc.documents.DocumentationContent} Created method
 *     container.
 * @protected
 */
MembersContainer.prototype.createMemberContainer = tsumekusa.abstractMethod; 


// Exports the constructor.
module.exports = MembersContainer;
