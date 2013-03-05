// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var InlineContent = require('./InlineContent');
var VimHelpLinkPublisher = require('./VimHelpLinkPublisher');



/**
 * A class for link contents.
 * @param {string} tgtId Target reference ID.
 * @constructor
 * @extends {jsdocref.publishing.InlineContent}
 */
var Link = function(tgtId) {
  InlineContent.call(this);
  this.setTargetReferenceId(tgtId);
};
jsdocref.inherits(Link, InlineContent);


/**
 * Default content publisher.
 * @type {jsdocref.publishing.ContentPublisher}
 */
Link.publisher = VimHelpLinkPublisher.getInstance();


/**
 * Sets a target reference id.  The method is chainable.
 * @param {string} tgtId Target reference ID.
 * @return {jsdocref.publishing.Link} This instance.
 */
Link.prototype.setTargetReferenceId = function(tgtId) {
  this.ref_ = tgtId;
  return this;
};


/**
 * Returns a target reference id.
 * @return {string} Target reference ID.
 */
Link.prototype.getTargetReferenceId = function() {
  return this.ref_;
};


/** @override */
Link.prototype.isBreakable = function() {
  return false;
};


// Export the constructor
module.exports = Link;
