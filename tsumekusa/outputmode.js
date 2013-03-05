// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for outputmode.
 * @namespace
 */
outputmode = exports;


/**
 * Environment type string.
 * @enum {string}
 */
outputmode.OutputMode = {
  /** Vim help style publishing outputmode. */
  VIM: 'vim',
  /** HTML document style publishing outputmode. */
  HTML: 'html'
};


/**
 * Definition of current outputmode.  Default is {@code
 * tsumekusa.outputmode.OutputMode.VIM}
 * @const
 * @type {tsumekusa.outputmode.OutputMode}
 */
outputmode.ENVIRONMENT = outputmode.OutputMode.VIM;
