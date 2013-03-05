// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var Content = require('./Content');



/**
 * An abstract class for inline contents.
 * @constructor
 * @extends {jsdocref.publishing.Content}
 */
var InlineContent = function() {
  Content.call(this);
};
jsdocref.inherits(InlineContent, Content);


/**
 * Whether a content allows a line break is included in.
 * @return {boolean} Whether a content allows a line break is included in.
 */
InlineContent.prototype.isBreakable = jsdocref.abstractMethod;


// Exports the constructor.
module.exports = InlineContent;
