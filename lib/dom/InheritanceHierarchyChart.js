// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var string = tsumekusa.string;

var BlockElement = tsumekusa.BlockElement;
var Link = tsumekusa.Link;
var Strong = tsumekusa.Strong;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for an inheritance hierarchy chart.
 *
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var InheritanceHierarchyChart = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  this.setElement(new InheritanceHierarchyChartImpl(symbol));
};
util.inherits(InheritanceHierarchyChart, DocElement);


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
 * A class for inheritance hierarchy chart implementations.
 * @constructor
 * @extends {tsumekusa.dom.BlockElement}
 */
InheritanceHierarchyChartImpl = function(symbol) {
  BlockElement.call(this);
  this.symbol_ = symbol;
};
util.inherits(InheritanceHierarchyChartImpl, BlockElement);


/**
 * Symbol.
 * @type {tsumekusaJsdoc.dom.DocletWrapper}
 * @private
 */
InheritanceHierarchyChartImpl.prototype.symbol_ = null;


/**
 * Returns a symbol.
 * @return {tsumekusaJsdoc.dom.DocletWrapper} Symbol.
 */
InheritanceHierarchyChartImpl.prototype.getSymbol = function() {
  return this.symbol_;
};


/** @override */
InheritanceHierarchyChartImpl.prototype.getPublisher = function() {
  return null;
};


/** @override */
InheritanceHierarchyChartImpl.prototype.publish = function() {
  var symbol = this.getSymbol();
  var ancestors = symbol.ancestors;
  var MARGIN_WIDTH = InheritanceHierarchyChart.HORIZONTAL_MARGIN_WIDTH;

  var downArrowIndent = string.repeat(' ', InheritanceHierarchyChart.
      DOWN_ARROW_INDENT_WIDTH + MARGIN_WIDTH)

  var downArrowLine = '\n' + downArrowIndent + InheritanceHierarchyChart.
      DOWN_ARROW + '\n';

  // TODO: List unknown doclet too.
  var lines = ancestors.map(function(ancestor) {
    var lnk = new Link(ancestor);
    var ancestorSymbol = tsumekusaJsdoc.MembersMap[ancestor];

    var kind = ancestorSymbol ? ancestorSymbol.kind : 'unknown';

    var ancestorMargin = string.repeat(' ', MARGIN_WIDTH + 2);

    return [ancestorMargin, lnk.publish(), ' [', kind, ']'].join('');
  });

  var margin = string.repeat(' ', MARGIN_WIDTH);

  lines.push([margin, InheritanceHierarchyChart.MARKER, ' ',
      new Strong(symbol.longname).publish(), ' [', symbol.kind, ']'
  ].join(''));

  return [margin, 'Inheritance:\n', lines.join(downArrowLine)].join('');
};


// Exports the constructor.
module.exports = InheritanceHierarchyChart;
