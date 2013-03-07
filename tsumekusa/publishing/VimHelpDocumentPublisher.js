// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var string = require('../string');
var date = require('../date');
var TagFactory = require('../contents/TagFactory');
var Link = require('../contents/Link');
var VimHelpContainerPublisher = require('./VimHelpContainerPublisher');



/**
 * A class for document publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.VimHelpContainerPublisher}
 */
var VimHelpDocumentPublisher = function() {
  VimHelpContainerPublisher.call(this);
};
tsumekusa.inherits(VimHelpDocumentPublisher, VimHelpContainerPublisher);
tsumekusa.addSingletonGetter(VimHelpDocumentPublisher);


/**
 * Whether make table of contents.  Default is true.
 * @const
 */
VimHelpDocumentPublisher.MAKE_INDEX_ENABLED = true;


/** @override */
VimHelpDocumentPublisher.prototype.createHeader = function(doc) {
  var tag = doc.getTag();
  var tagString = tag.publish();
  var version = this.createVersion(doc);
  var lastChange = this.createLastChange(doc);

  return tagString + '\t' + version + '  ' + lastChange;
};


/** @override */
VimHelpDocumentPublisher.prototype.createFooter = function(doc) {
  var separator = this.createSubContentSeparator(doc);
  return separator + 'vim:tw=78:sw=4:ts=8:ft=help:norl:';
};


/** @override */
VimHelpDocumentPublisher.prototype.createSubContentsInternal = function(doc) {
  var strs = VimHelpContainerPublisher.prototype.createSubContentsInternal.
      call(this, doc);

  if (VimHelpDocumentPublisher.MAKE_INDEX_ENABLED) {
    strs.unshift(this.createContentsTable(doc));
  }

  return strs;
};


/**
 * Creates a contents table.
 * @param {tsumekusa.contents.Document} doc Document.
 * @return {string} Table of contents.
 */
VimHelpDocumentPublisher.prototype.createContentsTable = function(doc) {
  return VimHelpContentsTablePublisher.getInstance().publish(doc);
};


/**
 * Creates a version note.
 * @param {tsumekusa.contents.Document} doc Document.
 * @return {string} Version note.
 */
VimHelpDocumentPublisher.prototype.createVersion = function(doc) {
  return 'Version ' + doc.getVersion() + '.';
};


/**
 * Creates a last change note.
 * @param {tsumekusa.contents.Document} doc Document.
 * @return {string} LastChange note.
 */
VimHelpDocumentPublisher.prototype.createLastChange = function(doc) {
  var now = doc.getDate();
  var year = now.getFullYear();
  var month = date.getShortMonth(now);
  var day = now.getDay();
  return ['Last change:', year, month, day].join(' ');
};



/**
 * A class for table of contents publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.VimHelpContainerPublisher}
 */
var VimHelpContentsTablePublisher = function() {
  VimHelpContainerPublisher.call(this);
};
tsumekusa.inherits(VimHelpContentsTablePublisher, VimHelpContainerPublisher);
tsumekusa.addSingletonGetter(VimHelpContentsTablePublisher);


/**
 * Margin of a table.
 * @const
 * @type {number}
 */
VimHelpContentsTablePublisher.TABLE_MARGIN = 4;


/**
 * Link length to wrap.
 * @const
 * @type {number}
 */
VimHelpContentsTablePublisher.LINK_LENGTH_TO_WRAP = 25;


/**
 * Link length to wrap.
 * @const
 * @type {number}
 */
VimHelpContentsTablePublisher.WRAPPED_PERIODS_LENGTH = 20;


/** @override */
VimHelpContentsTablePublisher.prototype.createHeader = function(doc) {
  var docName = doc.getCaption();
  var tag = TagFactory.createTag(docName + '-contents');

  var head = 'CONTENTS';
  var tail = tag.publish();
  return string.fillMiddle(head, tail, tsumekusa.TEXT_WIDTH);
};


/** @override */
VimHelpContentsTablePublisher.prototype.createSubContents = function(doc) {
  return '';
};


/** @override */
VimHelpContentsTablePublisher.prototype.createTopContents = function(doc) {
  var TABLE_MARGIN = VimHelpContentsTablePublisher.TABLE_MARGIN;
  var maxIdxLen = 0, idxLen;
  var maxLnkLen = 0, lnkLen;
  var subs = [], subsIdx = 0;
  var idxs = [], idx;
  var lnks = [], lnk;

  // remove invisible containers
  doc.getDescendants().forEach(function(sub) {
    if (sub.isVisibleOnContentsTable()) {
      subs[subsIdx++] = sub;
    }
  });

  subs.forEach(function(sub) {
    // idx includes a indent
    idx = this.createContentsTableIndex(sub) + ' ' + sub.getCaption();
    idxs.push(idx);
    if ((idxLen = idx.length) > maxIdxLen) {
      maxIdxLen = idxLen;
    }

    lnk = sub.getLink().publish();
    lnks.push(lnk);
    if ((lnkLen = lnk.length) > maxLnkLen && lnkLen <
        VimHelpContentsTablePublisher.LINK_LENGTH_TO_WRAP) {
      maxLnkLen = lnkLen;
    }
  }, this);

  var pt, ptWidth, ws, wsWidth;
  var contents = subs.map(function(sub, i) {
    idx = idxs[i], lnk = lnks[i];
    idxLen = idx.length;
    lnkLen = lnk.length;

    // |<-(TABLE_MARGIN)->|<-(idxLen)->| ... |<-(lnkLen)->|<(TABLE_MARGIN)>|
    ptWidth = tsumekusa.TEXT_WIDTH - idxLen - maxLnkLen - TABLE_MARGIN * 2 -
        /* end whites */ 2;

    if (lnkLen >= VimHelpContentsTablePublisher.LINK_LENGTH_TO_WRAP) {
      // Wrap and right-align a link if the link length is too long.
      pt = string.repeat('.', VimHelpContentsTablePublisher.
          WRAPPED_PERIODS_LENGTH);
      wsWidth = tsumekusa.TEXT_WIDTH - lnkLen - TABLE_MARGIN * 2 -
          VimHelpContentsTablePublisher.WRAPPED_PERIODS_LENGTH;
      ws = string.repeat(' ', wsWidth);
      return [idx, '\n', ws, pt, ' ', lnk].join('');
    }
    else if (ptWidth < /* length of ' ... ' */ 5) {
      // Wrap periods and link if index is too long
      pt = string.repeat('.', VimHelpContentsTablePublisher.
          WRAPPED_PERIODS_LENGTH);
      wsWidth = tsumekusa.TEXT_WIDTH - maxLnkLen - TABLE_MARGIN * 2 -
          VimHelpContentsTablePublisher.WRAPPED_PERIODS_LENGTH;
      ws = string.repeat(' ', wsWidth);
      return [idx, '\n', ws, pt, ' ', lnk].join('');
    }
    else {
      pt = string.repeat('.', ptWidth);
      return [idx, pt, lnk].join(' ');
    }
  });

  return '\n' + contents.join('\n') + '\n\n';
};


/**
 * Creates an index of table of contents.
 * @param {tsumekusa.contents.Container} sub Sub container.
 * @return {string} Index of table of contents.
 */
VimHelpContentsTablePublisher.prototype.createContentsTableIndex = function(
    sub) {
  var TABLE_MARGIN = VimHelpContentsTablePublisher.TABLE_MARGIN;

  var current = sub;
  var ancestor = null;

  while (current = current.getParent()) {
    if (current.isVisibleOnContentsTable()) {
      ancestor = current;
      break;
    }
  }

  var indentWidth;
  if (ancestor) {
    var ancestorIdx = this.createContentsTableIndex(ancestor);
    indentWidth = ancestorIdx.length + /* white space width */ 1;
  }
  else {
    indentWidth = TABLE_MARGIN;
  }
  var indentWhites = string.repeat(' ', indentWidth);

  var idx = this.createIndex(sub);
  return indentWhites + idx;
};


VimHelpDocumentPublisher.VimHelpContentsTablePublisher =
    VimHelpContentsTablePublisher;


// Export the constructor
module.exports = VimHelpDocumentPublisher;
