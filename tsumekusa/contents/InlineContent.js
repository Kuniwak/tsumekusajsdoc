// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Content = require('./Content');



/**
 * An abstract class for inline contents.
 * @constructor
 * @extends {tsumekusa.contents.Content}
 */
var InlineContent = function() {
  Content.call(this);
};
tsumekusa.inherits(InlineContent, Content);


/**
 * Whether the inline tag is unknown.
 * @type {boolean}
 */
InlineContent.prototype.unknown = false;


/**
 * Whether a content allows a line break is included in.
 * @return {boolean} Whether a content allows a line break is included in.
 */
InlineContent.prototype.isBreakable = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = InlineContent;
