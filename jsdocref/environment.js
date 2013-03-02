// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for environment.
 * @namespace
 */
environment = exports;


/**
 * Environment type string.
 * @enum {string}
 */
environment.EnvironmentType = {
  /** Vim help style publishing environment. */
  VIM: 'vim',
  /** HTML document style publishing environment. */
  HTML: 'html'
};


/**
 * Definition of current environment.  Default is {@code
 * jsdocref.environment.EnvironmentType.VIM}
 * @const
 * @type {jsdocref.environment.EnvironmentType}
 */
environment.ENVIRONMENT = environment.EnvironmentType.VIM;
