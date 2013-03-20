// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../../tsumekusaJsdoc';
var Digest = require(basePath + '/documents/Digest');
var Type = require(basePath + '/documents/Type');



/**
 * A class for a object (without function) digest.  Output example is:
 * {@code foo.bar: Foo|Bar}
 *
 * @param {jsdoc.Doclet} symbol Object symbol.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.Digest}
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
