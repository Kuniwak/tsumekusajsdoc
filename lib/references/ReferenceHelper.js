// This script licensed under the MIT.
// http://orgachem.mit-license.org


var path = require('path');
var tsumekusa = require('tsumekusa');
var util = tsumekusa.util;



/**
 * A singleton class for reference helper.  You can change behavior of strategy
 * of generating of reference ID, and then you should call
 * {@link tsumekusa.addSingletonGetter}, it helps to prevent different helper
 * used.
 * @constructor
 */
var ReferenceHelper = function() {};
util.addSingletonGetter(ReferenceHelper);


/**
 * Base directory path.
 * @type {?string}
 */
ReferenceHelper.baseDirectoryPath = null;


/**
 * Returns a reference ID of the symbol.  The method allows to add a modifier
 * that is set by {@code opt_modifier}.
 * @param {jsdoc.Doclet} symbol Symbol to make a reference ID.
 * @param {?string=} opt_modifier A modifier to be appended to the reference ID.
 * @return {string} Reference ID.
 */
ReferenceHelper.prototype.getReferenceId = function(symbol, opt_modifier) {
  return opt_modifier ? symbol.longname + '-' + opt_modifier : symbol.longname;
};


/**
 * Returns a file name of the symbol without an extension.
 * @param {jsdoc.Doclet} symbol Symbol to generate the file name.
 * @return {string} File name of the symbol.
 */
ReferenceHelper.prototype.getFileName = function(symbol) {
  var fileName = symbol.longname.replace(/\./g, '_') + '.tsumekusa';

  var filePath;
  if (ReferenceHelper.baseDirectoryPath) {
    filePath = path.join(ReferenceHelper.baseDirectoryPath, fileName);
  }
  else {
    filePath = fileName;
  }

  return  filePath;
};


/**
 * Returns a file name of the symbol without an extension.
 * @param {jsdoc.Doclet} symbol Symbol to generate the file name.
 * @return {string} File name of the symbol.
 */
ReferenceHelper.prototype.getDirectoryPath = function(symbol) {
  return path.dirname(this.getFileName(symbol));
};


// Exports the constructor.
module.exports = ReferenceHelper;
