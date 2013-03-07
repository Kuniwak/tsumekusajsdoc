// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for tsumekusa Jsdoc modules.
 * @namespace
 */
var tsumekusaJsdoc = exports;


/**
 * Whether inline tags are parsed.  Inline tags parsing is heavy, so you can
 * disabled the parsing if you do not use inline tags in your doclets (or you do
 * not want to decorate inline tags, of course).  By default, inline tag parsing
 * is enabled.
 * @const
 * @type {boolean}
 */
tsumekusaJsdoc.INLINE_TAG_DISABLED = false;


/**
 * Whether HTML in a doclet are parsed.  HTML parsing is heavy, so you can
 * disabled the parsing if you do not use HTML in your doclets (or you do
 * not want to decorate HTML, of course).  In default, HTML parsing is enabled.
 * @const
 * @type {boolean}
 */
tsumekusaJsdoc.HTML_DISABLED = false;
