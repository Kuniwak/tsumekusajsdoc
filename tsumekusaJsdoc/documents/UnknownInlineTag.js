// This script licensed under the MIT.
// http://orgachem.mit-license.org

var tsumekusa = require('../../tsumekusa');
var InlineContent = require('../../tsumekusa/contents/InlineContent');



/**
 * A class for unknown tags.  The tag will be created when an unknown inline tag
 * was found.  You can construct any tag by property of the unknown tag.
 * See {@link }
 * @param {string} type Unknown inline tag name.  An at mark was excluded.
 * @param {string} content Unknown unline tag content.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusa.contents.InlineContent}
 */
var UnknownInlineTag = function(type, content) {
  InlineContent.call(this);
  this.type = type;
  this.content = content;
};
tsumekusa.inherits(UnknownInlineTag, InlineContent);


/**
 * Whether the inline tag is unknown.
 * @type {boolean}
 */
UnknownInlineTag.prototype.unknown = true;


/**
 * Unknown tag name.
 * @type {string}
 */
UnknownInlineTag.prototype.type = null;


/**
 * Unknown tag content.
 * @type {boolean}
 */
UnknownInlineTag.prototype.content = null;



/**
 * A class for unknown tag publisher.
 */
var UnknownInlineTagPublisher = function() {};
tsumekusa.addSingletonGetter(UnknownInlineTagPublisher);


/**
 * Returns a unknown tag content.  It means that a content pass through (remove
 * only curly braces and atmark) if an unknown tag was published.
 *
 * Note: The method warn that unknown tag was come.
 * @param {tsumekusa.publishing.UnknownTag} tag Unknown tag to publish.
 * @return {string} Unknown tag content.
 */
UnknownInlineTagPublisher.prototype.publish = function(tag) {
  console.warn('Unknown tag is found. The type is: "' + tag.type + '", and ' +
      'the content is: "' + tag.content +'"');
  return tag.content;
};



/**
 * Default content publisher.
 * @type {tsumekusa.publishing.UnknownInlineTagPublisher}
 */
UnknownInlineTag.publisher = new UnknownInlineTagPublisher();
