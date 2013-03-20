// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../../tsumekusaJsdoc';
var Digest = require(basePath + '/components/Digest');
var Type = require(basePath + '/components/Type');



/**
 * A class for a object (without function) digest.  Output example is:
 * {@code foo.bar: Foo|Bar}
 *
 * @param {jsdoc.Doclet} symbol Object symbol.
 * @param {?tsumekusaJsdoc.components.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.components.Digest}
 */
var ObjectDigest = function(symbol, opt_docHelper, opt_refHelper) {
  Digest.call(this, symbol, opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(ObjectDigest, Digest);


/** @override */
ObjectDigest.prototype.publish = function() {
  var symbol = this.getSymbol();
  var type = new Type(symbol);

  // current digest string as: foobar(
  return symbol.longname + ': ' + type.publish();
};


// Exports the constructor.
module.exports = ObjectDigest;
