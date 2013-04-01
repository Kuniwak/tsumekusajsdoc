// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Container = require('./Container');



/**
 * A class for document.
 * @param {string} caption Caption.
 * @param {string} filename File name.
 * @constructor
 * @extends {tsumekusa.dom.Container}
 */
var Document = function(caption, filename) {
  Container.call(this, caption, filename, true);
};
tsumekusa.inherits(Document, Container);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.DocumentPublisher}
 */
Document.publisher = null;


/**
 * Version identifier.
 * @type {?string}
 * @private
 */
Document.prototype.version_ = null;


/**
 * Date object.
 * @type {?Date}
 * @private
 */
Document.prototype.date_ = null;


/**
 * Returns a date object.
 * @return {?Date} Date object.
 */
Document.prototype.getDate = function() {
  return this.date_;
};


/**
 * Sets a date object.
 * @param {Date} date Date object to set.
 */
Document.prototype.setDate = function(date) {
  this.date_ = date;
};


/**
 * Returns a version identifier.
 * @return {string} Version identifier.
 */
Document.prototype.getVersion = function() {
  return this.version_ || 'n/a';
};


/**
 * Sets a version identifier.
 * @param {string} ver Version identifier to set.
 */
Document.prototype.setVersion = function(ver) {
  this.version_ = ver;
};


// Export the constructor
module.exports = Document;
