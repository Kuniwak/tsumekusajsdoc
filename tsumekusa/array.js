// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for array utilities.
 * @namespace
 */
array = exports;


/**
 * Converts an object to an array.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {goog.array.ArrayLike} object  The object to convert to an array.
 * @return {!Array} The object converted into an array. If object has a
 *     length property, every property indexed with a non-negative number
 *     less than length will be included in the result. If object does not
 *     have a length property, an empty array will be returned.
 */
array.toArray = function(object) {
  var length = object.length;

  // If length is not a number the following it false. This case is kept for
  // backwards compatibility since there are callers that pass objects that are
  // not array like.
  if (length > 0) {
    var rv = new Array(length);
    for (var i = 0; i < length; i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return [];
};


/**
 * Does a shallow copy of an array.
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @param {goog.array.ArrayLike} arr  Array or array-like object to clone.
 * @return {!Array} Clone of the input array.
 */
array.clone = array.toArray;
