// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var Digest = require(basePath + '/documents/Digest');
var Type = require(basePath + '/documents/Type');



/**
 * A class for a function digest.  Output example is:
 * {@code foo.bar(arg1, arg2) -> Foo|Bar}
 *
 * @param {jsdoc.Doclet} symbol Function symbol.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.Digest}
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

  // current detail string as: foobar(
  digest[digestIdx++] = symbol.longname + '(';

  if (tsumekusaJsdoc.hasParam(symbol)) {
    // current detail string as: foobar( arg1, arg2, arg3
    digest[digestIdx++] = symbol.params.map(function(tag) {
      var paramName = this.createParameterNameString(tag);

      if (FunctionDigest.VERBOSE_PARAM) {
        var type = new Type(tag);
        return paramName + ' ' + type.publish();
      }
      else {
        return paramName;
      }
    }, this).join(', ');
  }

  // current detail string as: foobar( arg1, arg2, arg3 )
  digest[digestIdx++] = ')';

  if (tsumekusaJsdoc.hasReturn(symbol)) {
    // current detail string as: foobar( arg1, arg2, arg3 ) ->
    digest[digestIdx++] = ' -> ';

    // current detail string as: foobar( arg1, arg2, arg3 ) -> val
    digest[digestIdx++] = symbol.returns.map(function(tag) {
      var type = new Type(tag);
      return type.publish();
    }, this).join(', ');
  }

  return digest.join('');
};


/**
 * Creates a parameter name string.
 * @param {jsdoc.Tag} tag Parameter tag.
 * @return {string} Parameter name.
 */
FunctionDigest.prototype.createParameterNameString = function(tag) {
  var name = tag.name;

  // display 'foo...' as the tag name if the parameter is variable.
  if (tag.variable) {
    name += '...';
  }

  // display '[foo]' as the tag name if the parameter is optional.
  if (tag.optional) {
    name = '[' + name + ']';
  }

  return name;
};


// Exports the constructor.
module.exports = FunctionDigest;
