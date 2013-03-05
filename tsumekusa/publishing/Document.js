// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa')
var Container = require('./Container');
var VimHelpDocumentPublisher = require('./VimHelpDocumentPublisher');



/**
 * A class for document.
 * @param {string} caption Caption.
 * @param {string} version Version identifier.
 * @param {?string=} opt_refId Optional reference ID.  The ID is generated by
 *     the {@code caption}, if not given {@code opt_refId}.
 * @constructor
 * @extends {tsumekusa.publishing.Container}
 */
var Document = function(caption, filename, version, opt_date) {
  Container.call(this, caption, filename);
  this.version_ = version;
  this.date_ = opt_date || new Date();
};
tsumekusa.inherits(Document, Container);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
Document.publisher = VimHelpDocumentPublisher.getInstance();


/**
 * Returns a date object.
 * @return {Date} Date object.
 */
Document.prototype.getDate = function() {
  return this.date_;
};


/**
 * Returns a version identifier.
 * @return {string} Version identifier.
 */
Document.prototype.getVersion = function() {
  return this.version_;
};


// Export the constructor
module.exports = Document;
