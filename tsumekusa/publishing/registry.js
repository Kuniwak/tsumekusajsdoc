// This script licensed under the MIT.
// http://orgachem.mit-license.org



var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);


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
  if (!map) {
    throw Error('Illegal publishers map: ' + map);
  }

  if (map.CODE) {
    registry.registerContentPublisher(
        require(basePath + '/dom/Code'), map.CODE);
  }

  if (map.CONTAINER) {
    registry.registerContentPublisher(
        require(basePath + '/dom/Container'), map.CONTAINER);
  }

  if (map.CONTENTS_TABLE) {
    registry.registerContentPublisher(
        require(basePath + '/dom/ContentsTable'), map.CONTENTS_TABLE);
  }

  if (map.DEFINITION_LIST) {
    registry.registerContentPublisher(
        require(basePath + '/dom/DefinitionList').Definition,
        map.DEFINITION_LIST);
  }

  if (map.DEFINITION) {
    registry.registerContentPublisher(
        require(basePath + '/dom/DefinitionList'), map.DEFINITION);
  }

  if (map.DOCUMENT) {
    registry.registerContentPublisher(
        require(basePath + '/dom/Document'), map.DOCUMENT);
  }

  if (map.INLINE_CODE) {
    registry.registerContentPublisher(
        require(basePath + '/dom/InlineCode'), map.INLINE_CODE);
  }

  if (map.LINK) {
    registry.registerContentPublisher(
        require(basePath + '/dom/Link'), map.LINK);
  }

  if (map.LIST) {
    registry.registerContentPublisher(
        require(basePath + '/dom/List'), map.LIST);
  }

  if (map.LIST_ITEM) {
    registry.registerContentPublisher(
        require(basePath + '/dom/List').ListItem, map.LIST_ITEM);
  }

  if (map.PARAGRAPH) {
    registry.registerContentPublisher(
        require(basePath + '/dom/Paragraph'), map.PARAGRAPH);
  }

  if (map.PREFORMATTED_PARAGRAPH) {
    registry.registerContentPublisher(
        require(basePath + '/dom/PreformattedParagraph'),
        map.PREFORMATTED_PARAGRAPH);
  }

  if (map.STRONG) {
    registry.registerContentPublisher(
        require(basePath + '/dom/Strong'), map.STRONG);
  }

  if (map.TAG) {
    registry.registerContentPublisher(
        require(basePath + '/dom/Tag'), map.TAG);
  }
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
