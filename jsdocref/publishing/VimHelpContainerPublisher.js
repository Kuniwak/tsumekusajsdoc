// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var string = require('../string');
var VimHelpTagPublisher = require('./VimHelpeTagPublisher');
var VimHelpSentencePublisher = require('./VimHelpContainerPublisher');



/**
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var VimHelpContainerPublisher = function() {};


/**
 * Separator characters.  First char is used in top level container, and second
 * char is used in second level container.  Last char used oterwise.
 * @const
 * @type {string}
 */
VimHelpContainerPublisher.SEPARATORS = '=- ';


/**
 * Returns a footer content.
 * @param {jsdocref.publishing.Container} container Contents container
 *     to create a header.
 * @return {jsdocref.publishing.Content} Header content.
 */
VimHelpContainerPublisher.prototype.createHeader = function(container) {
  var indexString = this.createIndex(container);
  var tag = container.getTag();
  var tagString = VimHelpTagPublisher.getInstance().publish(tag);

  var head = indexString + ' ' + container.getCaption();
  var tail = tagString;
  return string.fillMiddle(head, tail, jsdocref.TEXT_WIDTH);
};


/**
 * Creates an index string on head of a header.  Index string foemat as: {@code
 * 1.1.2}.
 * @return {string} Index string.
 */
VimHelpContainerPublisher.prototype.createIndex = function(container) {
  var contents = container.getAncestors();
  contents.push(container);

  return contents.map(function(content) {
    return content.getSelfIndex();
  }).join('.');
};


/**
 * Creates a separator between sub contents.
 * @return {string} Separator.
 */
VimHelpContainerPublisher.prototype.createSubContentSeparator =
    function(container) {
  var i = container.getSelfDepth();
  var SEP = VimHelpContainerPublisher.SEPARATORS;
  var len = SEP.length;
  return '\n' + string.repeat(SEP[i < len ? i : len - 1], jsdocref.TEXT_WIDTH) +
      '\n';
};


/** @override */
VimHelpContainerPublisher.prototype.publish = function(container) {
  var header = this.createHeader(container) + '\n\n';
  var topContent = VimHelpSentencePublisher.getInstance().publish(
      container.getTopContent());
  var separator = this.createSubContentSeparator(container);
  var subContents = container.map(function(content) {
    return VimHelpSentencePublisher.getInstance().publish(content);
  }).join(separator);

  var footer = '\n\n' + this.createFooter();

  return header + topContent + subContents + footer;
};


// Export the constructor
module.exports = VimHelpContainerPublisher;
