// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * An abstract class for contents.
 * @constructor
 */
var Content = function() {};


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
Content.publisher = null;


/**
 * Publishes a content.
 * @return {string} Published content.
 */
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
    throw Error('Publisher not found.');
  }

  return publisher;
};


// Exports the constructor.
module.exports = Content;
