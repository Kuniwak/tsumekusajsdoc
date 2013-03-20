// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var string = require(tsumekusaPath + '/string');

var basePath = '../../tsumekusaJsdoc';
var DocumentationContent = require(basePath +
    '/documents/DocumentationContent');



/**
 * A class for an inheritance hierarchy chart.
 *
 * @param {tsumekusaJsdoc.documents.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.DocumentationContent}
 */
var InheritanceHierarchyChart = function(symbol, opt_docHelper, opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  this.symbol_ = symbol;
};
tsumekusa.inherits(InheritanceHierarchyChart, DocumentationContent);


/**
 * Horizontal margin width.
 * @const
 * @type {number}
 */
InheritanceHierarchyChart.HORIZONTAL_MARGIN_WIDTH = 2;


/**
 * Indent width for a down arrow between a parent and the child.
 * @const
 * @type {number}
 */
InheritanceHierarchyChart.DOWN_ARROW_INDENT_WIDTH = 4;


/**
 * Down arrow between a parent and the child.
 * @const
 * @type {number}
 */
InheritanceHierarchyChart.DOWN_ARROW = 'v';


/**
 * Marker put before the symbol to be explained.
 * @const
 * @type {number}
 */
InheritanceHierarchyChart.MARKER = '*';


/**
 * Symbol.
 * @type {jsdoc.Doclet}
 * @private
 */
InheritanceHierarchyChart.prototype.symbol_ = null;


/**
 * Returns a symbol.
 * @return {jsdoc.Doclet} Symbol.
 */
InheritanceHierarchyChart.prototype.getSymbol = function() {
  return this.symbol_;
};


/** @override */
InheritanceHierarchyChart.prototype.publish = function() {
  var symbol = this.getSymbol();
  var ancestors = symbol.ancestors;
  var original = symbol.getOriginalDoclet();
  var MARGIN_WIDTH = InheritanceHierarchyChart.HORIZONTAL_MARGIN_WIDTH;

  var downArrowIndent = string.repeat(' ', InheritanceHierarchyChart.
      DOWN_ARROW_INDENT_WIDTH + MARGIN_WIDTH)

  var downArrowLine = '\n' + downArrowIndent + InheritanceHierarchyChart.
      DOWN_ARROW + '\n';

  var lines = ancestors.map(function(ancestor) {
    var originalAncestor = ancestor.getOriginalDoclet();
    var longname = originalAncestor.longname;
    var kind = originalAncestor.kind;

    var ancestorMargin = string.repeat(' ', MARGIN_WIDTH + 2);

    return [ancestorMargin, longname, ' [', kind, ']'].join('');
  });

  var margin = string.repeat(' ', MARGIN_WIDTH);
  lines.push([margin, InheritanceHierarchyChart.MARKER, ' ', original.longname,
      ' [', original.kind, ']'].join(''));

  return lines.join(downArrowLine);
};


// Exports the constructor.
module.exports = InheritanceHierarchyChart;
