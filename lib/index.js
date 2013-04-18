// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for tsumekusa Jsdoc modules.
 * @namespace
 * @exports tsumekusaJsdoc
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


/**
 * Whether the symbol has parameters.
 * @param {module:jsdoc/Doclet} symbol Symbol to check.
 * @return {boolean} Whether the symbol has method.
 */
tsumekusaJsdoc.hasParam = function(symbol) {
  return symbol.params && symbol.params.length > 0;
};


/**
 * Whether the symbol has returns.
 * @param {module:jsdoc/Doclet} symbol Symbol to check.
 * @return {boolean} Whether the symbol has method.
 */
tsumekusaJsdoc.hasReturn = function(symbol) {
  return symbol.returns && symbol.returns.length > 0;
};


/**
 * Returns a decorated param name by tag.  In default,
 * <ul>
 * <li>Optional parameter is wraped with '[]'. ex) 'foo' ⇒ '[foo]'
 * <li>Variavle parameter is added a prefix '...'. ex) 'args'⇒'...args'
 * <li>Otherwise is passed through.
 * </ul>
 * @param {jsdoc.Tag} tag Param tag.
 * @return {string} Decorated param name.
 */
tsumekusaJsdoc.decorateParamName = function(tag) {
  var name = tag.name;

  // display 'foo...' as the tag name if the parameter is variable.
  if (tag.variable) {
    name = '...' + name;
  }
  else if (tag.optional) {
    name = '[' + name + ']';
  }

  return name;
};


/**
 * Default description when a description was not defined.
 * @const
 * @type {string}
 */
tsumekusaJsdoc.NO_DESCRIPTION = 'No description.';


/**
 * Map has pairs that longnames and each members.
 * @type {Object.<Array.<module:lib/dom/DocletWrapper>>}
 */
tsumekusaJsdoc.MembersMap = {};
