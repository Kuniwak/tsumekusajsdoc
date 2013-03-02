// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * A class for link contents.
 * @param {string} tgtId Target reference ID.
 * @constructor
 */
var Link = function(tgtId) {
  this.setTargetReferenceId(tgtId);
};


/**
 * Sets a target reference id.  The method is chainable.
 * @param {string} tgtId Target reference ID.
 * @return {jsdocref.publishing.Link} This instance.
 */
Link.prototype.setTargetReferenceId = function(tgtId) {
  this.ref_ = tgtId;
};


/**
 * Returns a target reference id.
 * @return {string} Target reference ID.
 */
Link.prototype.getTargetReferenceId = function() {
  return this.ref_;
};


module.exports = Link;
