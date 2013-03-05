// This script licensed under the MIT.
// http://orgachem.mit-license.org

var tsumekusa = require('../../tsumekusa');



/**
 * A class for unknown tags.  The tag will be created when an unkown tag was
 * found.  You can construct any tag by property of the unknown tag.
 * @constructor
 * @extends {}
 */
var UnkownInlineTag = function(type, content) {
  this.type = type;
  this.content = content;
};



/**
 * A class for unknown tag publisher.
 */
var UnkownInlineTagPublisher = function() {};
tsumekusa.addSingletonGetter(UnkownInlineTagPublisher);


/**
 * Returns a unknown tag content.  It means that a content pass through (remove
 * only curly braces and atmark) if an unknown tag was published.
 *
 * Note: The method warn that unknown tag was come.
 * @param {tsumekusa.publishing.UnkownTag} tag Unkown tag to publish.
 * @return {string} Unkown tag content.
 */
UnkownInlineTagPublisher.prototype.publish = function(tag) {
  console.warn('Unkown tag is found. type: ' + tag.type + ', content: ' +
               tag.content);
  return tag.content;
};



/**
 * Default content publisher.
 * @type {tsumekusa.publishing.UnkownInlineTagPublisher}
 */
UnkownInlineTag.publisher = new UnkownTagPublisher();
