// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';


/**
 * Element publisher map.
 * @name tsumekusa.publishing.DefaultsMap
 * @enum {function(new:tsumekusa.publishing.IElementPublisher)}
 */
module.exports = {
  /** Publisher for codes. */
  CODE: require(basePath + '/publishing/CodePublisher').getInstance(),
  /** Publisher for containers. */
  CONTAINER: require(basePath + '/publishing/ContainerPublisher').getInstance(),
  /** Publisher for contents tables. */
  CONTENTS_TABLE: require(basePath +
      '/publishing/ContentsTablePublisher').getInstance(),
  /** Publisher for definitions. */
  DEFINITION: require(basePath +
      '/publishing/DefinitionPublisher').getInstance(),
  /** Publisher for definition lists. */
  DEFINITION_LIST: require(basePath +
      '/publishing/DefinitionListPublisher').getInstance(),
  /** Publisher for documents. */
  DOCUMENT: require(basePath + '/publishing/DocumentPublisher').getInstance(),
  /** Publisher for element arrays. */
  ELEMENT_ARRAY: require(basePath +
      '/publishing/ElementArrayPublisher').getInstance(),
  /** Publisher for inline codes. */
  INLINE_CODE: require(basePath +
      '/publishing/InlineCodePublisher').getInstance(),
  /** Publisher for links. */
  LINK: require(basePath + '/publishing/LinkPublisher').getInstance(),
  /** Publisher for lists. */
  LIST: require(basePath + '/publishing/ListPublisher').getInstance(),
  /** Publisher for list items. */
  LIST_ITEM: require(basePath + '/publishing/ListItemPublisher').getInstance(),
  /** Publisher for paragraphs. */
  PARAGRAPH: require(basePath + '/publishing/ParagraphPublisher').getInstance(),
  /** Publisher for preformatted paragraphs. */
  PREFORMATTED_PARAGRAPH: require(basePath +
      '/publishing/PreformattedParagraphPublisher').getInstance(),
  /** Publisher for strongs. */
  STRONG: require(basePath + '/publishing/StrongPublisher').getInstance(),
  /** Publisher for tags. */
  TAG: require(basePath + '/publishing/TagPublisher').getInstance()
};
