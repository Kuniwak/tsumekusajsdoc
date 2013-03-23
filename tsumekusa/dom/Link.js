// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var InlineElement = require(basePath + '/dom/InlineElement');
var LinkPublisher = require(basePath + '/publishing/LinkPublisher');



/**
 * A class for link contents.
 * @param {string} tgtId Target reference ID.
 * @constructor
 * @extends {tsumekusa.dom.InlineElement}
 */
var Link = function(tgtId) {
  InlineElement.call(this);
  this.setTargetReferenceId(tgtId);
};
tsumekusa.inherits(Link, InlineElement);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.LinkPublisher}
 */
Link.publisher = null;


/**
 * Sets a target reference id.  The method is chainable.
 * @param {string} tgtId Target reference ID.
 * @return {tsumekusa.dom.Link} This instance.
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
