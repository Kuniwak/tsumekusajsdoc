// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');
var util = tsumekusa.util;
var InlineCode = tsumekusa.InlineCode;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var Digest = require(basePath + '/dom/Digest');
var Type = require(basePath + '/dom/Type');



/**
 * A class for a function digest. Output example is:
 * {@code foo.bar(arg1, arg2, arg3) => FooBar}
 *
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Function symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.Digest}
 */
var FunctionDigest = function(symbol, opt_docHelper, opt_refHelper) {
  Digest.call(this, symbol, opt_docHelper, opt_refHelper);
};
util.inherits(FunctionDigest, Digest);


/** @override */
FunctionDigest.prototype.publish = function() {
  var symbol = this.getSymbol();
  var digest = [], digestIdx = 0;
  var paramsMax, returnsMax;

  // current digest string as: foobar(
  digest[digestIdx++] = new InlineCode(symbol.longname).publish() +
      '(';

  if (tsumekusaJsdoc.hasParam(symbol)) {
    // current digest string as: foobar( arg1, arg2, arg3
    digest[digestIdx++] = symbol.params.map(function(tag, index) {
      var paramName = new InlineCode(
          tsumekusaJsdoc.decorateParamName(tag));
      if (FunctionDigest.VERBOSE_PARAM) {
        var type = new Type(tag);
        return paramName.publish() + ' ' + type.publish();
      }
      else {
        return paramName.publish();
      }
    }, this).join(', ');
  }

  // current digest string as: foobar( arg1, arg2, arg3 )
  digest[digestIdx++] = ')';

  if (tsumekusaJsdoc.hasReturn(symbol)) {
    // current digest string as: foobar( arg1, arg2, arg3 ) =>
    digest[digestIdx++] = ' -> ';

    // current digest string as: foobar( arg1, arg2, arg3 ) => val
    digest[digestIdx++] = symbol.returns.map(function(tag, index) {
      var type = new Type(tag);
      return type.publish();
    }, this);
  }

  return digest.join('');
};


// Exports the constructor.
module.exports = FunctionDigest;
