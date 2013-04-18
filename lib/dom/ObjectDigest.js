// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for object (without functions) digests.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var InlineCode = tsumekusa.InlineCode;

var basePath = '../../lib';
var Digest = require(basePath + '/dom/Digest');
var Type = require(basePath + '/dom/Type');



/**
 * A class for object (without functions) digests.  Output example is:
 * {@code foo.bar: Foo|Bar}
 *
 * @param {module:lib/dom/DocletWrapper} symbol Object symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/Digest}
 * @exports lib/dom/ObjectDigest
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
