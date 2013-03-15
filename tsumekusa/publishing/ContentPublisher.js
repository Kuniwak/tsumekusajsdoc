// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * An interface for content publishers.
 * @interface
 */
var IContentPublisher = function() {};


/**
 * Publishes a content.
 * @param {Content} content Content to publish.
 */
IContentPublisher.prototype.publish;


// Exports the constructor.
module.exports = ContentPublisher;
