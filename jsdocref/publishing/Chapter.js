// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var registry = require('./registry');
var ContentsContainer = require('./ContentsContainer');



/**
 * A class for chapters.
 * @param {string} caption Caption of the chapter.
 * @constructor
 * @extends {jsdocref.publishing.ContentsContainer}
 */
var Chapter = function(caption) {
  ContentsContainer.call(this, caption);
};
jsdocref.inherits(Chapter, ContentsContainer);
