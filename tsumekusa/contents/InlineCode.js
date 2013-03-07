// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Code = require('./Code');
var VimHelpInlineCodePublisher = require(
    '../publishing/VimHelpInlineCodePublisher');



/**
 * A class for inline code.
 * @param {string} code Code.
 * @param {?string=} opt_lang Optional programming language.
 * @constructor
 * @extends {tsumekusa.contents.Code}
 */
var InlineCode = function(code, opt_lang) {
  Code.call(this, code, opt_lang);
};
tsumekusa.inherits(InlineCode, Code);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
InlineCode.publisher = VimHelpInlineCodePublisher.getInstance();


// Exports the constructor.
module.exports = InlineCode;
