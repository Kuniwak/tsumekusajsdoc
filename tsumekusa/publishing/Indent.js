// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * A class for indentation strategies.
 * This class support constant width indentation by an argument.
 * For example, {@code new Indent(2)} as bellow:
 * <pre>
 *   First indent (as opt_first)
 *   Second indent (as opt_first)
 *   Third indent (as opt_first)
 *   ...
 * </pre>
 *
 * And this class support two-step indent by two arguments.
 * For example, {@code new Indent(2, 4)} as bellow:
 * <pre>
 *   First indent (as opt_first)
 *     Second indent (as opt_after)
 *     Third indent (as opt_after)
 *     ...
 * </pre>
 * @param {?number=} opt_first Indent width to insert before first line. Default
 *     width is 0 (no indent).
 * @param {?number=} opt_after Indent width to insert before lines without first
 *     line.  Default width is same as {@code opt_first}.
 * @constructor
 */
var Indent = function(opt_first, opt_after) {
  this.first_ = opt_first || 0;
  this.after_ = opt_after || this.first_;
};


/**
 * Returns an indent width by number of a line or paragraph.  You can change the
 * strategy by overriding the method.
 * @param {number} index 0-based number that is indent insert before.
 * @return {number} Indent width.
 */
Indent.prototype.getIndentWidth = function(num) {
  return num > 0 ? this.after_ : this.first_;
};


// Exports the constructor.
module.exports = Indent;
