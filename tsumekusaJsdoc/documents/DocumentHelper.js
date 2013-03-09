// This script licensed under the MIT.
// http://orgachem.mit-license.org

var tsumekusa = require('../../tsumekusa');
var string = require('../../tsumekusa/string');
var Sentence = require('../../tsumekusa/contents/Sentence');
var Paragraph = require('../../tsumekusa/contents/Paragraph');
var InlineCode = require('../../tsumekusa/contents/InlineCode');
var Link = require('../../tsumekusa/contents/Link');
var List = require('../../tsumekusa/contents/List');

var tsumekusaJsdoc = require('../../tsumekusaJsdoc');
var UnknownInlineTag = require('./UnknownInlineTag');

var htmlparser = require('../../htmlparser2');



/**
 * A singleton class for documenting helper.  You can change behavior of inline
 * code parsing, and then you should call {@link tsumekusa.addSingletonGetter},
 * it helps to prevent different helper used.
 * @constructor
 */
var DocumentHelper = function() {};
tsumekusa.addSingletonGetter(DocumentHelper);


/**
 * Creates paragraphs with HTML parsing and inline tag parsing.
 * @param {string} string String to parse.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 */
DocumentHelper.prototype.createParagraphs = function(string, opt_current) {
  var paragraphs = [], paragraphsIdx = 0;

  if (!tsumekusaJsdoc.HTML_DISABLED) {
    var root = new DocumentHelper.TreeNode();
    var currentNode = root, tmp;

    var parser = new htmlparser.Parser({
      onopentag: function(name) {
        tmp = new DocumentHelper.TreeNode();
        tmp.setValue({ name: name, text: null });
        currentNode.append(tmp);
        currentNode = tmp;
      },
      ontext: function(text) {
        tmp = new DocumentHelper.TreeNode();
        tmp.setValue({ name: null, text: text });
        currentNode.append(tmp);
      },
      onclosetag: function() {
        currentNode = currentNode.getParent();
      }
    });

    parser.write(string);
    parser.done();

    root.getChildren().forEach(function(node) {
      var obj = node.getValue();
      if (obj.name) {
        var content = this.createContentByHtml(obj.name, node.getChildren(),
            opt_current);
        if (content) {
          paragraphs[paragraphsIdx++] = content;
        }
      }
      else {
        // The obj is a text node
        var p = new Paragraph();
        p.appendSentence(this.createSentence(obj.text, opt_current));
        paragraphs[paragraphsIdx++] = p;
      }
    }, this);
  }
  else {
    var p = new Paragraph();
    p.appendSentence(this.createSentence(string, opt_current));
    paragraphs[0] = p;
  }

  return paragraphs;
};


/**
 * Creates a content by HTML.
 * @param {string} tagName HTML tag name.
 * @param {Array.<tsumekusa.documents.DocumentHelper.TreeNode>} nodes Nodes
 *     are included the tag.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {Array.<tsumekusa.contents.Content>}
 */
DocumentHelper.prototype.createContentByHtml = function(tagName, nodes,
    opt_current) {
  var content;
  switch (tagName) {
    case 'ul':
      content = new List(List.ListType.UNORDERED);
    case 'ol':
      content = new List(List.ListType.ORDERED);
      nodes.forEach(function(node) {
        var obj;
        if ((obj = node.getValue()) && obj.name === 'li') {
          child = node.getChildren()[0];
          var li = this.createSentence(child.getValue().text, opt_current);
          content.appendListContent(li);
        }
      }, this);
      return content;
    default:
      return null;
  }
};


/**
 * Parses a string to an array of inline tags.  Returns an original string,
 * if {@link tsumekusa.INLINE_TAG_DISABLED} flag was set.
 * @param {string} string String to parse.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {Array.<string|tsumekusa.contents.InlineContent>} Parsed contents.
 */
DocumentHelper.prototype.parseInlineTags = function(input, opt_current) {
  // Return an original input if no inline code.
  var contents = [input], contentsIdx = 0;
  var that = this;

  if (!tsumekusaJsdoc.INLINE_TAG_DISABLED) {
    input.replace(/([^\{]+)?(\{@([\S]+)\s+([^\}]+)\})?/g, function(matched, pre,
        tag, tagName, tagContent) {
          if (pre) {
            contents[contentsIdx++] = string.trim(pre);
          }
          if (tag) {
            contents[contentsIdx++] = that.createInlineContent(tagName,
                tagContent, opt_current);
          }
        });
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
 *         return new YourInlineContent(tag.content);
 *       default:
 *         // Make chainable
 *         return tag;
 *     }
 *   }
 *   return tag;
 * };</pre>
 * @param {string} tagName Tag name.
 * @param {string} tagContent Tag content.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {tsumekusa.contents.InlineContent} Created inline content.  Returns
 *     an {@code tsumekusa.publishing.UnknownInlineTag} for overriding if the
 *     tag type was unknown.  You can get an other content by overriding the
 *     method when you defined a new inline tag.
 */
DocumentHelper.prototype.createInlineContent = function(tagName, tagContent,
    opt_current) {
  switch (tagName) {
    case 'link':
      return new Link(this.resolveInlineLink(tagContent, opt_current));
    case 'plain':
    case 'code':
      return new InlineCode(tagContent);
    default:
      return new UnknownInlineTag(tagName, tagContent, opt_current);
  }
};


/**
 * Resolves relational link in an inline content.
 * @param {string} link Link string.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {string} Absolute link string.
 */
DocumentHelper.prototype.resolveInlineLink = function(link, opt_current) {
  // The method can not resolve a link, if current doclet is not defined. then
  // the method should pass through.  And link head is not '#', it seems
  // an absolute link.
  if (opt_current && opt_current.memberof && link.match(/^\s*#/)) {
    var parent = opt_current.memberof;
    return parent + link;
  }
  return link;
};


/**
 * Creates a sentence by string.  The string will be parsed by
 * {@link #parseInlineTags}.
 * @param {string} string String to parse.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {tsumekusa.contents.Sentence} Created sentence.
 */
DocumentHelper.prototype.createSentence = function(string, opt_current) {
  var sentence = new Sentence();
  sentence.appendInlineContents(this.parseInlineTags(string, opt_current));

  return sentence;
};


DocumentHelper.TreeNode = function() {
  this.children_ = [];
};

DocumentHelper.TreeNode.prototype.super_ = null;

DocumentHelper.TreeNode.prototype.children_ = null;

DocumentHelper.TreeNode.prototype.setValue = function(val) {
  this.val_ = val;
};

DocumentHelper.TreeNode.prototype.getValue = function() {
  return this.val_;
};


DocumentHelper.TreeNode.prototype.setParent = function(tree) {
  this.super_ = tree;
};


DocumentHelper.TreeNode.prototype.getParent = function() {
  return this.super_;
};


DocumentHelper.TreeNode.prototype.getChildren = function() {
  return this.children_;
};


DocumentHelper.TreeNode.prototype.append = function(tree) {
  this.children_.push(tree);
  tree.setParent(this);
};

DocumentHelper.TreeNode.prototype.forEachDecendant = function(func, opt_obj) {
  this.getChildren().forEach(function(child) {
    func.call(opt_obj, child);
    child.forEachDecendant(func, opt_obj);
  });
};


// Exports the constructor.
module.exports = DocumentHelper;
