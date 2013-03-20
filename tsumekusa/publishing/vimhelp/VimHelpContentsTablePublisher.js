// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var TagFactory = require(basePath + '/dom/TagFactory');
var VimHelpContainerPublisher = require(basePath + '/publishing/vimhelp/VimHelpContainerPublisher');



/**
 * A singleton class for table of contents publisher for a doc.
 * @constructor
 * @extends {tsumekusa.publishing.ContainerPublisher}
 */
var VimHelpContentsTablePublisher = function() {
  VimHelpContainerPublisher.call(this);
};
tsumekusa.inherits(VimHelpContentsTablePublisher, VimHelpContainerPublisher);
tsumekusa.addSingletonGetter(VimHelpContentsTablePublisher);


/**
 * Left/Right margin around a contents table.
 * <pre>
 * |    Foo ......... *foo*       |
 * |    FooBar ...... *foobar*    |
 * ^    ^ Left margin         ^   ^ Right margin
 * </pre>
 * @const
 * @type {number}
 */
VimHelpContentsTablePublisher.HORIZONTAL_MARGIN_WIDTH = 2;


/**
 * Vertical spaces height between lines.  Default is 0 as no line space.
 * <pre>
 * Caption 1 ........... *caption-1*
 * | Line space
 * Caption 2 ........... *caption-2*
 * </pre>
 * @const
 * @type {number}
 */
VimHelpContentsTablePublisher.LINE_SPACE_HIGHT = 0;


/**
 * Leader end position that is used when a longest link in the contents table
 * is longer than {@link VimHelpContentsTablePublisher.LINK_LENGTH_TO_WRAP}.
 * <pre>
 * Caption ...........
 *                   ^ Leader end
 *              *too-long-link*
 * </pre>
 * @const
 * @type {number}
 */
VimHelpContentsTablePublisher.LEADER_END_POSITION = 60;


/**
 * Link length to wrap.  Word-wrap if a link length is greater than this.
 * @const
 * @type {number}
 */
VimHelpContentsTablePublisher.LINK_LENGTH_TO_WORDWRAP = 30;


/**
 * Caption of a table of contents.
 * @const
 * @type {string}
 */
VimHelpContentsTablePublisher.CAPTION = 'CONTENTS';


/**
 * Leader is in a table of contents.
 * @const
 * @type {string}
 */
VimHelpContentsTablePublisher.LEADER = '.';


/**
 * Caption of a table of contents.
 * @const
 * @type {string}
 */
VimHelpContentsTablePublisher.CAPTION_REFERENCE_ID_SUFFIX = '-contents';


/**
 * Caption of a table of contents.
 * @const
 * @type {string}
 */
VimHelpContentsTablePublisher.MIDDLE = 'CONTENTS';


/** @override */
VimHelpContentsTablePublisher.prototype.publishHeader = function(doc) {
  var docName = doc.getCaption();
  var tag = TagFactory.createTag(docName + VimHelpContentsTablePublisher.
      CAPTION_REFERENCE_ID_SUFFIX);

  var head = VimHelpContentsTablePublisher.CAPTION;
  var tail = tag.publish();

  var header = string.fillMiddle(head, tail, this.getDisplayWidth());
  return header + string.repeat('\n', VimHelpContainerPublisher.
      HEADER_BOTTOM_MARGIN + 1);
};


/** @override */
VimHelpContentsTablePublisher.prototype.publishFooter = function(doc) {
  // Contents table is not able to have footer.
  return null;
};


/** @override */
VimHelpContentsTablePublisher.prototype.publishTopContentsInternal = function(
    doc) {
  // Publishes only a table of contents.
  return [this.publishContentsTable(doc)];
};


/** @override */
VimHelpContentsTablePublisher.prototype.publishSubContainersInternal = function(
    doc) {
  // Contents table is not able to have children.
  return null;
};


/**
 * Publish a table of contents.
 * @param {tsumekusa.dom.Document} doc Document to create the contents
 *     table.
 * @return {string} Contents table string.
 */
VimHelpContentsTablePublisher.prototype.publishContentsTable = function(
    doc) {
  var willBeLiteds = [], willBeLitedsIdx = 0;
  var maxLinkLen = 0, linkLen;

  // Remove invisible docs.
  doc.getDescendants().forEach(function(sub) {
    if (sub.isVisibleOnContentsTable()) {
      willBeLiteds[willBeLitedsIdx++] = sub;

      var link = sub.getLink().publish();
      if ((linkLen = link.length) > maxLinkLen) {
        maxLinkLen = linkLen;
      }
    }
  });

  var lines;
  if (maxLinkLen <= VimHelpContentsTablePublisher.LINK_LENGTH_TO_WORDWRAP) {
    lines = willBeLiteds.map(function(willBeListed) {
      return this.publishNoWordWrappedLine_(willBeListed, maxLinkLen);
    }, this);
  }
  else {
    lines = willBeLiteds.map(function(willBeListed) {
      return this.publishWordWrappedLine_(willBeListed, maxLinkLen);
    }, this);
  }

  return lines.join(string.repeat('\n', VimHelpContentsTablePublisher.
      LINE_SPACE_HIGHT + 1));
};


/**
 * Publishes a line of a contents table.  The msthod is used when the longest
 * link is shorter than
*  {@link VimHelpContentsTablePublisher.LINK_LENGTH_TO_WRAP}.
*
 * Output example is:
 * <pre>
 * Foo ........ *foo*
 * FooBar ..... *foobar*
 *              ^ Alignment point
 * </pre>
 * @param {tsumekusa.dom.Container} container Container.
 * @param {number} maxLinkLen Length of the longest link.
 * @return {string} Line of a table of contents.
 * @private
 */
VimHelpContentsTablePublisher.prototype.publishNoWordWrappedLine_ = function(
    container, maxLinkLen) {
  var head = this.createContentsTableLineHead_(container, maxLinkLen);
  var link = container.getLink().publish();

  // |                Display width                  |
  // |MARGIN|                                 |MARGIN|
  // |header string| |.......| |*longest-link*|      |
  // |header string| |.......| |*link*|       |      |
  var leaderWidth = this.getDisplayWidth() - VimHelpContentsTablePublisher.
    HORIZONTAL_MARGIN_WIDTH - head.length - maxLinkLen - 2;

  if (leaderWidth < 0) {
    throw Error('Caption is too long: "' + head + '"');
  }

  var leader = string.repeat(VimHelpContentsTablePublisher.LEADER, leaderWidth);

  return [head, leader, link].join(' ');
};


/**
 * Publishes a line of a contents table.  The msthod is used when the longest
 * link is longer than
 * {@link VimHelpContentsTablePublisher.LINK_LENGTH_TO_WRAP}.
 *
 * Output example is:
 * <pre>
 * Foo .......
 *           *foo*
 * FooBar ....
 *        *foobar*
 *               ^ Alignment point
 * </pre>
 * @param {tsumekusa.dom.Container} container Container.
 * @param {number} maxLinkLen Length of the longest link.
 * @return {string} Line of a table of contents.
 * @private
 */
VimHelpContentsTablePublisher.prototype.publishWordWrappedLine_ = function(
    container, maxLinkLen) {
  var head = this.createContentsTableLineHead_(container, maxLinkLen);
  var link = container.getLink().publish();

  // |          Display width           |
  // |MARGIN|                    |MARGIN|
  // |      Leader end       |   |      |
  // |header string| |.......|   |      |
  // |                    |*link*|      |
  var leaderWidth = VimHelpContentsTablePublisher.LEADER_END_POSITION -
      head.length - 1;

  var whiteWidth = this.getDisplayWidth() - VimHelpContentsTablePublisher.
      HORIZONTAL_MARGIN_WIDTH - link.length;

  if (leaderWidth < 0) {
    throw Error('Caption is too long: "' + head + '"');
  }

  if (whiteWidth < 0) {
    throw Error('Link is too long: "' + link + '"');
  }

  var leader = string.repeat(VimHelpContentsTablePublisher.LEADER, leaderWidth);
  var whites = string.repeat(' ', whiteWidth);

  return [head, ' ', leader, '\n', whites, link].join('');
};


/**
 * Creates a line head of a table of contents.
 * @param {tsumekusa.dom.Container} container Container.
 * @return {string} Line head of a table of contents.
 * @private
 */
VimHelpContentsTablePublisher.prototype.createContentsTableLineHead_ = function(
    container) {
  var current = container;
  var ancestor = null;

  // Gets a top-level container that will be listed.
  while (current = current.getParent()) {
    if (current.isVisibleOnContentsTable()) {
      ancestor = current;
      break;
    }
  }

  var indentWidth;
  if (ancestor && ancestor.getParent()) {
    var ancestorIdx = this.createIndex(ancestor);
    indentWidth = ancestorIdx.length + /* white space width */ 1;
  }
  else {
    indentWidth = VimHelpContentsTablePublisher.HORIZONTAL_MARGIN_WIDTH;
  }

  var indentWhites = string.repeat(' ', indentWidth);
  var idx = this.createIndex(container);
  return [indentWhites, idx, ' ', container.getCaption()].join('');
};


// Exports the constructor.
module.exports = VimHelpContentsTablePublisher;
