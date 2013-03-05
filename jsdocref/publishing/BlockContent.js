// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var Content = require('./Content');



/**
 * An abstract class for block content.
 * @constructor
 * @extends {jsdocref.publishing.Content}
 */
var BlockContent = function() {
  Content.call(this);
};
jsdocref.inherits(BlockContent, Content);


// Exports the constructor.
module.exports = BlockContent;
