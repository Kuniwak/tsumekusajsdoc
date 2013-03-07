// This script licensed under the MIT.
// http://orgachem.mit-license.org

var tsumekusa = require('../../tsumekusa');
var tsumekusaJsdoc = require('../../tsumekusaJsdoc');
var InlineCode = require('../../tsumekusa/publishing/InlineCode');
var Link = require('../../tsumekusa/contents/Link');
var UnknownInlineTag = require('../../tsumekusa/publishing/UnknownInlineTag');



/**
 * A singleton class for documenting helper.  You can change behavior of inline
 * code parsing, and then you should call {@link tsumekusa.addSingletonGetter},
 * it helps to prevent different helper used.
 * @constructor
 */
var DocumentHelper = function() {};
tsumekusa.addSingletonGetter(DocumentHelper);


/**
 * Parses a string to an array of inline contents.  Returns an original string,
 * if {@link tsumekusa.INLINE_TAG_DISABLED} flag was set.
 * @param {string} string String to parse.
 * @return {Array.<string|tsumekusa.contents.InlineContent>} Parsed contents.
 */
DocumentHelper.prototype.parseInlineContents = function(string) {
  // Return an original string if no inline code.
  var contents = [string], contentsIdx = 0;

  if (!tsumekusaJsdoc.INLINE_TAG_DISABLED) {
    // TODO: Implement HTML tag parser
    string.replace(/([^\{]+)\{@([\S]+)\s+([^\}]+)\}/g, function(matched, pre,
        tagName, tagContent) {
          contents[contentsIdx++] = pre;
          contents[contentsIdx++] = this.createInlineContent(tagName,
              tagContent);
        }, this);
  }

  return contents;
};


/**
 * Creates an inline content by tag name and tag content.  You can get an
 * unknown tag by overriding the method, when you defined a new inline tag.
 *
 * See the sample overriding:
 * <pre>function(tagName, tagContent) {
 *   var tag = DocumentHelper.prototype.createInlineContent(tagName,
 *       tagContent);
 *
 *   // Check whether the tag is unknown
 *   if (tag.unknown) {
 *     // You can switch to construct your inline contents
 *     switch (tag.type) {
 *       case 'foo':
 *         return new YourInlineContent();
 *       default:
 *         // Make chainable
 *         return tag;
 *     }
 *   }
 *   return tag;
 * };</pre>
 * @param {string} tagName Tag name.
 * @param {string} tagContent Tag content.
 * @return {tsumekusa.contents.InlineContent} Created inline content.  Returns
 *     an {@code tsumekusa.publishing.UnknownInlineTag} for overriding if the
 *     tag type was unknown.  You can get an other content by overriding the
 *     method when you defined a new inline tag.
 */
DocumentHelper.prototype.createInlineContent = function(tagName, tagContent) {
  switch (tagName) {
    case 'link':
      return new Link(tagContent);
    case 'plain':
    case 'code':
      return new InlineCode(tagContent);
    default:
      return new UnknownInlineTag(tagName, tagContent);
  }
};


/**
 * Creates a sentence by string.  The string will be parsed by
 * {@link #parseInlineContents}.
 * @param {string} string String to parse.
 * @return {tsumekusa.contents.Sentence} Created sentence.
 */
DocumentHelper.prototype.createSentence = function(string) {
  var sentence = new Sentence();
  sentence.appendInlineContents(this.parseInlineContents(string));

  return sentence;
};


// Exports the constructor.
module.exports = DocumentHelper;
