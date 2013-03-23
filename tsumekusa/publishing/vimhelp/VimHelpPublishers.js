// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';


/**
 * Element publisher map.
 * @name tsumekusa.publishing.vimhelp.VimHelpPublishers
 * @enum {tsumekusa.publishing.IElementPublisher}
 */
module.exports = {
  /** Publisher for codes. */
  CODE: require(basePath +
      '/publishing/vimhelp/VimHelpCodePublisher').getInstance(),
  /** Publisher for containers. */
  CONTAINER: require(basePath +
      '/publishing/vimhelp/VimHelpContainerPublisher').getInstance(),
  /** Publisher for contents tables. */
  CONTENTS_TABLE: require(basePath +
      '/publishing/vimhelp/VimHelpContentsTablePublisher').getInstance(),
  /** Publisher for definitions. */
  DEFINITION: require(basePath +
      '/publishing/vimhelp/VimHelpDefinitionPublisher').getInstance(),
  /** Publisher for definition lists. */
  DEFINITION_LIST: require(basePath +
      '/publishing/vimhelp/VimHelpDefinitionListPublisher').getInstance(),
  /** Publisher for documents. */
  DOCUMENT: require(basePath +
      '/publishing/vimhelp/VimHelpDocumentPublisher').getInstance(),
  ELEMENT_ARRAY: require(basePath +
      '/publishing/vimhelp/VimHelpElementArrayPublisher').getInstance(),
  /** Publisher for inline codes. */
  INLINE_CODE: require(basePath +
      '/publishing/vimhelp/VimHelpInlineCodePublisher').getInstance(),
  /** Publisher for links. */
  LINK: require(basePath +
      '/publishing/vimhelp/VimHelpLinkPublisher').getInstance(),
  /** Publisher for lists. */
  LIST: require(basePath +
      '/publishing/vimhelp/VimHelpListPublisher').getInstance(),
  /** Publisher for list items. */
  LIST_ITEM: require(basePath +
      '/publishing/vimhelp/VimHelpListItemPublisher').getInstance(),
  /** Publisher for paragraphs. */
  PARAGRAPH: require(basePath +
      '/publishing/vimhelp/VimHelpParagraphPublisher').getInstance(),
  /** Publisher for preformatted paragraphs. */
  PREFORMATTED_PARAGRAPH: require(basePath +
      '/publishing/vimhelp/VimHelpPreformattedParagraphPublisher').getInstance(),
  /** Publisher for strongs. */
  STRONG: require(basePath +
      '/publishing/vimhelp/VimHelpStrongPublisher').getInstance(),
  /** Publisher for tags. */
  TAG: require(basePath +
      '/publishing/vimhelp/VimHelpTagPublisher').getInstance()
};
