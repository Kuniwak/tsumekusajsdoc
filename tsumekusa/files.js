// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for root.
 * @namespace
 */
var files = exports;


/**
 * Directory path to put HTML files.
 * @const
 * @type {string}
 */
files.OUTPUT_DIRECTORY_PATH = '';


/**
 * Returns a HTML file name by reference ID.
 * @param {string} refId Reference ID.
 * @return {string} HTML file path.
 */
files.getHtmlFileName = function(refId) {
  return files.OUTPUT_DIRECTORY_PATH + '/' + refId + '.html';
};
