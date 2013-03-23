// This script licensed under the MIT.
// http://orgachem.mit-license.org

var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var string = require(tsumekusaPath + '/string');

var ElementArray = require(tsumekusaPath + '/dom/ElementArray');
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');
var List = require(tsumekusaPath + '/dom/List');
var InlineCode = require(tsumekusaPath + '/dom/InlineCode');
var Link = require(tsumekusaPath + '/dom/Link');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var UnknownInlineTag = require(basePath + '/dom/UnknownInlineTag');

var htmlparser = require('../../htmlparser2');



/**
 * A singleton class for documenting helper.  You can change behavior of inline
 * code parsing, and then you should call {@link tsumekusa.addSingletonGetter},
 * it helps to prevent different helper used.
 * @constructor
 */
var DocHelper = function() {};
tsumekusa.addSingletonGetter(DocHelper);


/**
 * Parses a string includes block-like contents.  The method parse HTML if
 * {@link tsumekusaJsdoc.HTML_DISABLED} is true.
 * @param {string} str String to parse.
 * @param {?jsdoc.Doclet=} opt_current Optional doclet that has {@code str}.
 */
DocHelper.prototype.parseBlocks = function(str, opt_current) {
  var blocks = [], blockIdx = 0;

  if (!tsumekusaJsdoc.HTML_DISABLED) {
    var root = new DocHelper.TreeNode();
    var currentNode = root, tmp;

    var parser = new htmlparser.Parser({
      onopentag: function(name) {
        tmp = new DocHelper.TreeNode();
        tmp.setValue({ name: name, text: null });
        currentNode.append(tmp);
        currentNode = tmp;
      },
      ontext: function(text) {
        tmp = new DocHelper.TreeNode();
        tmp.setValue({ name: 'text', text: text });
        currentNode.append(tmp);
      },
      onclosetag: function() {
        currentNode = currentNode.getParent();
      }
    });

    parser.write(str);
    parser.done();

    root.getChildren().forEach(function(node) {
      var block = this.createBlockElementByNode(node);
      if (block) {
        blocks[blockIdx++] = block;
      }
    }, this);
  }
  else {
    var p = new Paragraph();
    p.addInlineElements(this.parseInlineTags(str, opt_current));
    blocks[0] = p;
  }

  return blocks;
};


/**
 * Creates block content by a node.
 * @param {tsumekusaJsdoc.dom.DocHelper.TreeNode} node Node.
 * @param {?boolean=} opt_current Optional
 * @protected
 */
DocHelper.prototype.createBlockElementByNode = function(node, opt_current) {
  var obj = node.getValue();
  var tagName = obj.name;
  var text = obj.text;
  var childNodes = node.getChildren();

  switch (tagName) {
    case 'ul':
    case 'UL':
      var list = new List(List.ListType.UNORDERED);

      childNodes.forEach(function(childNode) {
        var child = this.createBlockElementByNode(childNode, opt_current);
        if (child) {
          list.addListItem(child);
        }
      }, this);

      return list;
    case 'ol':
    case 'OL':
      var list = new List(List.ListType.ORDERED);

      childNodes.forEach(function(childNode) {
        var child = this.createBlockElementByNode(childNode, opt_current);
        if (child) {
          list.addListItem(child);
        }
      }, this);

      return list;
    case 'li':
    case 'LI':
      var blocks = new ElementArray();

      childNodes.forEach(function(childNode) {
        var child = this.createBlockElementByNode(childNode, opt_current);
        if (child) {
          blocks.addChild(child);
        }
      }, this)

      return new List.ListItem(blocks);
    case 'pre':
    case 'PRE':
    case 'code':
    case 'CODE':
      return new Code(string.trim(text));
    case 'text':
      var p = new Paragraph();
      p.addInlineElements(this.parseInlineTags(text, opt_current));
      return p;
    default:
      console.warn('Unpublishable HTMl tag found: <' + tagName + '>');
      return null;
  }
};


/**
 * Parses a string to an array of inline tags.  Returns an original string,
 * if {@link tsumekusa.INLINE_TAG_DISABLED} flag was set.
 * @param {string} string String to parse.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {Array.<string|tsumekusa.dom.InlineElement>} Parsed contents.
 */
DocHelper.prototype.parseInlineTags = function(input, opt_current) {
  // Return an original input if no inline code.
  var contents = [input], contentsIdx = 0;
  var that = this;

  if (!tsumekusaJsdoc.INLINE_TAG_DISABLED) {
    input.replace(/([^\{]+)?(\{@([\S]+)\s+([^\}]+)\})?/g, function(matched, pre,
        tag, tagName, tagElement) {
          if (pre) {
            contents[contentsIdx++] = string.trim(pre);
          }
          if (tag) {
            contents[contentsIdx++] = that.createInlineElement(tagName,
                tagElement, opt_current);
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
 * <pre>
 * function(tagName, tagElement) {
 *   var tag = DocHelper.prototype.createInlineElement(tagName,
 *       tagElement);
 *
 *   // Check whether the tag is unknown
 *   if (tag.unknown) {
 *     // You can switch to construct your inline contents
 *     switch (tag.type) {
 *       case 'foo':
 *         return new YourInlineElement(tag.content);
 *       default:
 *         // Make chainable
 *         return tag;
 *     }
 *   }
 *   return tag;
 * };
 * </pre>
 * @param {string} tagName Tag name.
 * @param {string} tagElement Tag content.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {tsumekusa.dom.InlineElement} Created inline content.  Returns
 *     an {@code tsumekusa.publishing.UnknownInlineTag} for overriding if the
 *     tag type was unknown.  You can get an other content by overriding the
 *     method when you defined a new inline tag.
 */
DocHelper.prototype.createInlineElement = function(tagName, tagElement,
    opt_current) {
  switch (tagName) {
    case 'link':
      return new Link(this.resolveInlineLink(tagElement, opt_current));
    case 'plain':
    case 'code':
      return new InlineCode(tagElement);
    default:
      return new UnknownInlineTag(tagName, tagElement, opt_current);
  }
};


/**
 * Resolves relational link in an inline content.
 * @param {string} link Link string.
 * @param {?jsdoc.Doclet=} opt_current Optional current doclet.
 * @return {string} Absolute link string.
 */
DocHelper.prototype.resolveInlineLink = function(link, opt_current) {
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
 * A class for tree nodes.
 * @constructor
 */
DocHelper.TreeNode = function() {
  this.children_ = [];
};


/**
 * Tree node as a parent of the node.
 * @type {tsumekusaJsdoc.dom.DocHelper.TreeNode}
 * @private
 */
DocHelper.TreeNode.prototype.super_ = null;


/**
 * Tree nodes as children of the node.
 * @type {Array.<tsumekusaJsdoc.dom.DocHelper.TreeNode>}
 * @private
 */
DocHelper.TreeNode.prototype.children_ = null;


/**
 * Sets a value to the node.
 * @param {*} val Value to set.
 */
DocHelper.TreeNode.prototype.setValue = function(val) {
  this.val_ = val;
};


/**
 * Returns a value of the node.
 * @return {*} Value of the node.
 */
DocHelper.TreeNode.prototype.getValue = function() {
  return this.val_;
};


/**
 * Sets a parent node.
 * @param {tsumekusaJsdoc.dom.DocHelper.TreeNode} tree Parent tree
 *   node.
 */
DocHelper.TreeNode.prototype.setParent = function(tree) {
  this.super_ = tree;
};


/**
 * Returns a parent node.
 * @return {?tsumekusaJsdoc.dom.DocHelper.TreeNode} Parent tree node
 *     if any.
 */
DocHelper.TreeNode.prototype.getParent = function() {
  return this.super_;
};


/**
 * Returns children of the node.
 * @return {Array.<tsumekusaJsdoc.dom.DocHelper.TreeNode>} Children.
 */
DocHelper.TreeNode.prototype.getChildren = function() {
  return this.children_;
};


/**
 * Appends a tree node.
 * @param {tsumekusaJsdoc.dom.DocHelper.TreeNode} tree Tree node to
 *     append.
 */
DocHelper.TreeNode.prototype.append = function(tree) {
  this.children_.push(tree);
  tree.setParent(this);
};


/**
 * Traverses all child nodes recursively in preorder.
 * @param {?function (goog.structs.TreeNode)} func Callback function. It takes
 *     the node as argument.
 * @param {?Object=} opt_obj The object to be used as the value of this within
 *     {@code func}.
 */
DocHelper.TreeNode.prototype.forEachDecendant = function(func, opt_obj) {
  this.getChildren().forEach(function(child) {
    func.call(opt_obj, child);
    child.forEachDecendant(func, opt_obj);
  });
};


// Exports the constructor.
module.exports = DocHelper;
