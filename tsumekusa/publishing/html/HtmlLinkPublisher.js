// This script licensed under the MIT.
// http://orgachem.mit-license.org


var AnchorElement = require('../dom/AnchorElement');
var files = require('../files');



/**
 * A class for link publisher for Vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var HtmlLinkPublisher = function() {
};


/** @override */
HtmlLinkPublisher.prototype.publish = function(link) {
  var refId = link.getTargetReferenceId();
  var filePath = files.getHtmlFileName(refId);
  return new AnchorElement(refId, filePath);
};


// Exports the constructor.
module.exports = HtmlLinkPublisher;
