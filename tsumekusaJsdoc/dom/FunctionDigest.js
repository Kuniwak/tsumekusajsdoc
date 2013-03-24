// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var InlineCode = require(tsumekusaPath + '/dom/InlineCode');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var Digest = require(basePath + '/dom/Digest');
var Type = require(basePath + '/dom/Type');



/**
 * A class for a function digest. Output example is:
 * {@code foo.bar(arg1, arg2, arg3) => FooBar}
 *
 * @param {jsdoc.Doclet} symbol Function symbol.
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
tsumekusa.inherits(FunctionDigest, Digest);


/** @override */
FunctionDigest.prototype.publish = function() {
  var symbol = this.getSymbol();
  var digest = [], digestIdx = 0;
  var paramsMax, returnsMax;

  // current digest string as: foobar(
  digest[digestIdx++] = symbol.longname + '(';

  if (tsumekusaJsdoc.hasParam(symbol)) {
    // current digest string as: foobar( arg1, arg2, arg3
    digest[digestIdx++] = symbol.params.map(function(tag, index) {
      var paramName = tsumekusaJsdoc.decorateParamName(tag);
      if (FunctionDigest.VERBOSE_PARAM) {
        var type = new Type(tag);
        return paramName + ' ' + type.publish();
      }
      else {
        return paramName;
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
