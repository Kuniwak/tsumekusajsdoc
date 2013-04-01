// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var date = require(basePath + '/date');
var TagFactory = require(basePath + '/dom/TagFactory');
var Link = require(basePath + '/dom/Link');
var vimhelp = require(basePath + '/publishing/vimhelp');
var VimHelpContainerPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpContainerPublisher');



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
 * @type {boolean}
 */
VimHelpDocumentPublisher.PUBLISH_CONTENTS_TABLE = true;


/**
 * Whether note generator information.  Default is true.
 * @const
 * @type {boolean}
 */
VimHelpDocumentPublisher.PUBLISH_GENERATOR_INFORMATION = true;


/** @override */
VimHelpDocumentPublisher.prototype.publishHeader = function(doc) {
  var tag = doc.getTag();
  var tagString = tag.publish();
  var version = this.createVersion(doc);
  var lastChange = this.createLastChange(doc.getDate() || this.getNow_());

  return tagString + '\t' + version + '  ' + lastChange +
      string.repeat('\n', VimHelpContainerPublisher.HEADER_BOTTOM_MARGIN + 1);
};


/**
 * Returns a date object for test.
 * @return {Date} Date.
 * @private
 */
VimHelpDocumentPublisher.prototype.getNow_ = function() {
  return new Date();
};


/** @override */
VimHelpDocumentPublisher.prototype.publishFooter = function(doc) {
  var modeline = 'vim:tw=78:sw=4:ts=8:ft=help:norl:';

  if (VimHelpDocumentPublisher.PUBLISH_GENERATOR_INFORMATION) {
    var width = this.getDisplayWidth();
    var now = doc.getDate() || this.getNow_();
    var year = now.getFullYear();
    var month = date.getShortMonth(now);
    var day = now.getDate();

    var firstLine = string.pullRight('This document was generated by ' +
        'Tsumekusa on ' + [year, month, day].join(' '), width);

    var secondLine = string.pullRight('https://github.com/OrgaChem/Tsumekusa',
        width);

    return [
      firstLine,
      secondLine,
      '',
      modeline
    ].join('\n');
  }

  return modeline;
};


/** @override */
VimHelpDocumentPublisher.prototype.publishSubElements = function(doc) {
  var subElements = VimHelpContainerPublisher.prototype.publishSubElements.
      call(this, doc);

  if (VimHelpDocumentPublisher.PUBLISH_CONTENTS_TABLE) {
    subElements.unshift(this.publishContentsTable(doc));
  }

  return subElements;
};


/**
 * Punlishes a contents table.
 * @param {tsumekusa.dom.Document} doc Document.
 * @return {string} Table of contents.
 */
VimHelpDocumentPublisher.prototype.publishContentsTable = function(doc) {
  return VimHelpContentsTablePublisher.getInstance().publish(doc);
};


/**
 * Creates a version note.
 * @param {tsumekusa.dom.Document} doc Document.
 * @return {string} Version note.
 */
VimHelpDocumentPublisher.prototype.createVersion = function(doc) {
  return 'Version ' + doc.getVersion() + '.';
};


/**
 * Creates a last change note.
 * @param {tsumekusa.dom.Document} doc Document.
 * @return {string} LastChange note.
 */
VimHelpDocumentPublisher.prototype.createLastChange = function(lastDate) {
  var year = lastDate.getFullYear();
  var month = date.getShortMonth(lastDate);
  var day = lastDate.getDate();
  return ['Last change:', year, month, day].join(' ');
};


// Export the constructor
module.exports = VimHelpDocumentPublisher;
