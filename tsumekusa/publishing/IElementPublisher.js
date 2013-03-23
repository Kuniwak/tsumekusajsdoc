// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * An interface for content publishers.
 * @interface
 */
var IElementPublisher = function() {};


/**
 * Publishes a content.
 * @param {Element} content Element to publish.
 */
IElementPublisher.prototype.publish;


// Exports the constructor.
module.exports = ElementPublisher;
