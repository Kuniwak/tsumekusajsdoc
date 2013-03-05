// This script licensed under the MIT.
// http://orgachem.mit-license.org



var references = exports;


/**
 * Returns a reference ID of the symbol.  The method allows to add a modifier
 * that is set by {@code opt_modifier}.
 * @param {jsdoc.Doclet} symbol Symbol to make a reference ID.
 * @param {?string=} opt_modifier A modifier to be appended to the reference ID.
 */
references.getReferenceId = function(symbol, opt_modifier) {
  return symbol.longname + '-' + opt_str;
};
