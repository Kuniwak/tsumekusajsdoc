// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for date utilities.
 */
var date = exports;


/**
 * Short month names. 
 *
 * This method is clone of
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}.
 *
 * @const
 * @type {Array.<string>}
 */
date.STANDALONESHORTMONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


/**
 * Returns a short month name.
 * @param {Date} date Date to get month.
 * @return {string} Short month name.
 */
date.getShortMonth = function(dateObj) {
  return date.STANDALONESHORTMONTHS[dateObj.getMonth()];
};
