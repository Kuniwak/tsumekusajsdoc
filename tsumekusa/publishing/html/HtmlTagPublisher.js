// This script licensed under the MIT.
// http://orgachem.mit-license.org


var Element = require('../dom/Element');
var files = require('../files');



/**
 * Base class for tag publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var HtmlTagPublisher = function() {};


/** @override */
HtmlTagPublisher.prototype.publish = function(tag) {
  var refId = tag.getReferenceId();
  var elem = this.createDom();
  elem.setAttribute('id', refId);

  return elem;
};


/**
 * Returns a HTML element for the tag.  If you do not want a DIVElement ,
 * override this.
 * @return {tsumekusa.dom.Element} Element for the tag.
 */
HtmlTagPublisher.prototype.createDom = function() {
  return new Element('div');
};


// Exports the constructor.
module.exports = HtmlTagPublisher;
