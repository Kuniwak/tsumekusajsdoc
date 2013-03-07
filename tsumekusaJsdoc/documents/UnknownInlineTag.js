// This script licensed under the MIT.
// http://orgachem.mit-license.org

var tsumekusa = require('../../tsumekusa');
var InlineContent = require('../../tsumekusa/contents/InlineContent');



/**
 * A class for unknown tags.  The tag will be created when an unknown inline tag
 * was found.  You can construct any tag by property of the unknown tag.
 * See {@link }
 * @param {string} type Unkown inline tag name.  An at mark was excluded.
 * @param {string} content Unkown unline tag content.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusa.contents.InlineContent}
 */
var UnkownInlineTag = function(type, content) {
  InlineContent.call(this);
  this.type = type;
  this.content = content;
};
tsumekusa.inherits(UnkownInlineTag, InlineContent);


/**
 * Whether the inline tag is unknown.
 * @type {boolean}
 */
UnknownInlineTag.prototype.unknown = true;


/**
 * Unkown tag name.
 * @type {string}
 */
UnknownInlineTag.prototype.type = null;


/**
 * Unkown tag content.
 * @type {boolean}
 */
UnknownInlineTag.prototype.content = null;



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
  console.warn('Unkown tag is found. The type is: "' + tag.type + '", and the' +
               ' content is: "' + tag.content +'"');
  return tag.content;
};



/**
 * Default content publisher.
 * @type {tsumekusa.publishing.UnkownInlineTagPublisher}
 */
UnkownInlineTag.publisher = new UnkownInlineTagPublisher();
