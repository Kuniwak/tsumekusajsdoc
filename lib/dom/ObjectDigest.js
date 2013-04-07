// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');
var util = tsumekusa.util;
var InlineCode = tsumekusa.InlineCode;

var basePath = '../../lib';
var Digest = require(basePath + '/dom/Digest');
var Type = require(basePath + '/dom/Type');



/**
 * A class for a object (without function) digest.  Output example is:
 * {@code foo.bar: Foo|Bar}
 *
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Object symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.Digest}
 */
var ObjectDigest = function(symbol, opt_docHelper, opt_refHelper) {
  Digest.call(this, symbol, opt_docHelper, opt_refHelper);
};
util.inherits(ObjectDigest, Digest);


/** @override */
ObjectDigest.prototype.publish = function() {
  var symbol = this.getSymbol();
  var type = new Type(symbol);
  var symbolName = new InlineCode(symbol.longname);

  // current digest string as: foobar: type
  return symbolName.publish() + ': ' + type.publish();
};


// Exports the constructor.
module.exports = ObjectDigest;
