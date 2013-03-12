// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * An abstract class for contents.  This class provide a publishing system.
 * @constructor
 * @implements {tsumekusa.contents.IContent}
 */
var Content = function() {};


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
Content.publisher = null;


/** @override */
Content.prototype.publish = function() {
  var publisher = this.getPublisher();
  return publisher.publish(this);
};


/**
 * Returns a publisher for the content.  Default is {@code publisher} as the
 * class property if exists.
 * @return {tsumekusa.publishing.ContentPublisher} Publisher.
 */
Content.prototype.getPublisher = function() {
  var publisher = this.constructor.publisher;
  if (!publisher) {
    throw Error('Publisher was not found.');
  }

  return publisher;
};


// Exports the constructor.
module.exports = Content;
