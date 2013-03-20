// This script licensed under the MIT.
// http://orgachem.mit-license.org



var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var defaults = require(basePath + '/publishing/DefaultPublishers');


/**
 * Namespace for registry for publishers.
 * @name tsumekusa.registry
 * @namespace
 */
var registry = exports;


/**
 * Registers content publishers by publishers map.
 * @param {Object.<function(new:tsumekusa.publishing.IContentPublisher)>} map
 *     Content publishers map.
 */
registry.registerContentPublishers = function(map) {
  registry.registerContentPublisher(
      require(basePath + '/dom/Code'), map.CODE || defaults.CODE);

  registry.registerContentPublisher(
      require(basePath + '/dom/Container'),
      map.CONTAINER || defaults.CONTAINER);

  registry.registerContentPublisher(
      require(basePath + '/dom/ContentsTable'),
      map.CONTENTS_TABLE || defaults.CONTENTS_TABLE);

  registry.registerContentPublisher(
      require(basePath + '/dom/DefinitionList').Definition,
      map.DEFINITION_LIST || defaults.DEFINITION_LIST);

  registry.registerContentPublisher(
      require(basePath + '/dom/DefinitionList'),
      map.DEFINITION || defaults.DEFINITION);

  registry.registerContentPublisher(
      require(basePath + '/dom/Document'),
      map.DOCUMENT || defaults.DOCUMENT);

  registry.registerContentPublisher(
      require(basePath + '/dom/InlineCode'),
      map.INLINE_CODE || defaults.INLINE_CODE);

  registry.registerContentPublisher(
      require(basePath + '/dom/Link'), map.LINK || defaults.LINK);

  registry.registerContentPublisher(
      require(basePath + '/dom/List'), map.LIST || defaults.LIST);

  registry.registerContentPublisher(
      require(basePath + '/dom/List').ListItem,
      map.LIST_ITEM || defaults.LIST_ITEM);

  registry.registerContentPublisher(
      require(basePath + '/dom/Paragraph'),
      map.PARAGRAPH || defaults.PARAGRAPH);

  registry.registerContentPublisher(
      require(basePath + '/dom/PreformattedParagraph'),
      map.PREFORMATTED_PARAGRAPH || defaults.PREFORMATTED_PARAGRAPH);

  registry.registerContentPublisher(
      require(basePath + '/dom/Strong'), map.STRONG || defaults.STRONG);

  registry.registerContentPublisher(
      require(basePath + '/dom/Tag'), map.TAG || defaults.TAG);
};


/**
 * Registers a content-publisher pair.
 * @param {function(new:tsumekusa.dom.IContent)} content Content
 *     constructor to register.
 * @param {function(new:tsumekusa.dom.IContentPublisher)} publisher Content
 *     publisher constructor to register.
 */
registry.registerContentPublisher = function(content, publisher) {
  content.publisher = publisher;
};
