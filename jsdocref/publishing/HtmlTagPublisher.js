// This script licensed under the MIT.
// http://orgachem.mit-license.org


var AnchorElement = require('../dom/AnchorElement');
var files = require('../files');



/**
 * Base class for tag publisher.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var HtmlTagPublisher = function() {};


/** @override */
HtmlTagPublisher.prototype.publish = function(tag) {
  var refId = tag.getReferenceId();
  var filePath = files.getHtmlFileName(refId);
  return new AnchorElement(refId, filePath);
};


// Exports the constructor.
module.exports = HtmlTagPublisher;
