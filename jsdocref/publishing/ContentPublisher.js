// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * An interface for content publishers.
 * @interface
 */
var ContentPublisher = function() {};


/**
 * Publishes a content.
 * @param {Content} content Content to publish.
 */
ContentPublisher.prototype.publish;


// Exports the constructor.
module.exports = ContentPublisher;
