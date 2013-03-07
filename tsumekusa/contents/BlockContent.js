// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Content = require('./Content');



/**
 * An abstract class for block content.
 * @constructor
 * @extends {tsumekusa.contents.Content}
 */
var BlockContent = function() {
  Content.call(this);
};
tsumekusa.inherits(BlockContent, Content);


// Exports the constructor.
module.exports = BlockContent;
