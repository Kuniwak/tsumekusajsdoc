// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var references = require('../references');
var Container = require('./Container');



/**
 * A singleton class for publishing helper.
 * @constructor
 */
var PublishingHelper = function() {};
tsumekusa.addSingletonGetter(PublishingHelper);


PublishingHelper.SUMMARY_MODIFIER = 'summary';


PublishingHelper.PARAMS_MODIFIER = 'params';


PublishingHelper.RETURNS_MODIFIER = 'returns';


PublishingHelper.SUMMARY_CAPTION = 'Summary';


PublishingHelper.STATIC_METHODS_CAPTION = 'Static Methods';


PublishingHelper.PARAMS_CAPTION = 'Parameters';


PublishingHelper.RETURNS_CAPTION = 'Returns';


PublishingHelper.prototype.createSummaryContainer = function(symbol) {
  var refId = references.getReferenceId(symbol, PublishingHelper.
                                        SUMMARY_MODIFIER);
  var container = new Container(PublishingHelper.SUMMARY_CAPTION, refId, null,
                                true);

  var p = new Paragraph();
  container.setTopContent(p);

  var desc = this.createSentence(symbol.description);
  p.appendSentence(desc);

  return container;
};


/**
 * Creates members container.  The method is useful when you want to create
 * a new member category.
 * @param {Array.<jsdoc.Doclet>} symbols Symbols.
 * @param {string} caption Caption of the container such as
 *     {@code 'Static members'}.
 * @param {string} modifier Modifier of the reference ID.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createMembersContainer = function(symbols, caption, modifier) {
  var refId = references.getReferenceId(symbol, modifier);
  var container = new Container(caption, refId, null, true);

  return container;
};


/**
 * Creates a member container.
 * @param {jsdoc.Doclet} symbol Symbol of the container.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createMemberContainer = function(symbol) {
  var refId = references.getReferenceId(symbol);
  var container = new Container(symbol.longname, refId, null, true);

  var desc = this.createSentence(symbol.description);
  p.appendSentence(desc);

  return container;
};


/**
 * Creates a method container.
 * @param {jsdoc.Doclet} symbol Symbol of the container.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createMethodContainer = function(symbol) {
  var container = this.createMemberContainer(symbol);
  var params = this.createParametersContainer(symbol);
  var returns = this.createReturnsContainer(symbol);

  var p = this.createMethodContainerSumary(symbol);;
  container.setTopContent(p);

  container.appendSubContainer(params);
  container.appendSubContainer(returns);

  return container;
};


/**
 * Creates a member container top content.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Paragraph} Top content.
 */
PublishingHelper.prototype.createMethodContainerSumary = function(symbol) {
  var p = new Paragraph();
  var code = new Code(symbol.longname);
  var desc = this.createSentence(symbol.description);

  desc.appendInlineContentAt(0, code);
  p.appendSentence(desc);
  return p;
};


/**
 * Creates a method container.
 * @param {jsdoc.Doclet} symbol Symbol of the container.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createPropertyContainer = function(symbol) {
  var container = this.createMemberContainer(symbol);
  var type = this.createTypeContainer(symbol);

  var p = this.createPropertyContainerSumary();
  container.setTopContent(p);

  container.appendSubContainer(type);
  return container;
};


/**
 * Creates a property container top content.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Paragraph} Top content.
 */
PublishingHelper.prototype.createPropertyContainerSumary = function(
    symbol) {
  var p = new Paragraph();
  var code = new Code(symbol.longname);
  var desc = this.createSentence(symbol.description);

  desc.appendInlineContentAt(0, code);
  p.appendSentence(desc);
};


/**
 * Creates a parameters container.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createParametersContainer = function(symbol) {
  var refId = references.getReferenceId(symbol, PublishingHelper.
                                        PARAMS_MODIFIER);
  var container = new Container(PublishingHelper.PARAMS_CAPTION, refId);

  return this.createParamContainerInternal(symbol.params, container);
};


/**
 * Decorates a parameters container.
 * @param {Array.<jsdoc.Tag>} params Parameter tags.
 * @param {tsumekusa.publishing.Container} container Container to decorate.
 * @return {tsumekusa.publishing.Container} Decorated container.
 * @protected
 */
PublishingHelper.prototype.createParametersContainerInternal = function(
    params, container) {
  var defs = new DefinitionList(DefinitionList.ListType.UNORDERED);

  params.forEach(function(tag) {
    var signature = this.createTypeSignatureSentence(tag);
    var paramName = this.createParameterNameString();
    var desc = this.createSentence(tag.text);

    // Add caption to head.
    signature.appendInlineContentAt(paramName + ':', 0);

    defs.appendDefinition(signature, desc);
  }, this);

  container.setTopContent(defs);
  return container;
};


/**
 * Creates a parameter name string.
 * @param {jsdoc.Tag} tag Parameter tag.
 * @return {string} Parameter name.
 */
PublishingHelper.prototype.createParameterNameString = function(tag) {
  var name = tag.name;
  if (tag.variable) {
    name += '...';
  }

  if (tag.optional) {
    name = '[' + name + ']';
  }

  return name;
};


/**
 * Creates a returns container.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createReturnsContainer = function(symbol) {
  var refId = references.getReferenceId(symbol, PublishingHelper.
                                        RETURNS_MODIFIER);
  var container = new Container(PublishingHelper.RETURNS_CAPTION, refId);

  return this.createReturnsContainerInternal(container);
};


/**
 * Decorates a returns container.
 * @param {Array.<jsdoc.Tag>} returns Return tags.
 * @param {tsumekusa.publishing.Container} container Container to decorate.
 * @return {tsumekusa.publishing.Container} Decorated container.
 * @protected
 */
PublishingHelper.prototype.createReturnsContainerInternal = function(returns,
    container) {
  var defs = new DefinitionList(DefinitionList.ListType.UNORDERED);

  returns.forEach(function(tag) {
    var signature = this.createTypeSignatureSentence(tag);
    var desc = this.createSentence(tag.text);

    defs.appendDefinition(signature, desc);
  }, this);

  container.setTopContent(defs);

  return container;
};


/**
 * Creates a type signature sentence.
 * @param {jsdoc.Tag} tag Tag.
 * @return {tsumekusa.publishing.Sentence} Type signature sentence.
 */
PublishingHelper.prototype.createTypeSignatureSentence = function(tag) {
  var sentence = new Sentence();
  var links = [], linksIdx = 0;
  var separator = '|';

  if (tag.type && tag.type.names) {
    tag.type.names.forEach(function(type) {
      links[linksIdx++] = new Link(type);
      links[linksIdx++] = separator;
    }, this);

    if (tag.nullable) {
      links[linksIdx++] = 'null';
      links[linksIdx++] = separator;
    }

    // if (tag.optional) {
    //   links[linksIdx++] = 'undefined';
    //   links[linksIdx++] = separator;
    // }

    // Remove a last separator.
    links.pop();
    sentence.appendInlineContents(links);
  }

  return sentence;
};


/**
 * Parses a string to an array of inline contents.  Returns an original string,
 * if {@link tsumekusa.INLINE_TAG_DISABLED} flag was set.
 * @param {string} string String to parse.
 * @return {Array.<string|tsumekusa.publishing.InlineContent>} Parsed contents.
 */
PublishingHelper.prototype.parseToInlineContents = function(string) {
  // Return an original string if no inline code.
  var contents = [string], contentsIdx = 0;

  if (tsumekusa.INLINE_TAG_DISABLED) {
    // Returns original string if tsumekusa.INLINE_TAG_DISABLED flag was set.
    return [string];
  }

  string.replace(/([^\{]+)\{@([\S]+)\s+([^\}]+)\}/g, function(
      matched, pre, tagName, tagContent) {
    contents[contentsIdx++] = pre;
    contents[contentsIdx++] = this.createInlineContent(tagName, tagContent);
  }, this);

  return contents;
};


/**
 * Creates an inline content by tag name and tag content.
 *
 * Note: You can get an unknown tag by overriding the method, when you defined
 * a new inline tag.
 * @param {string} tagName Tag name.
 * @param {string} tagContent Tag content.
 * @return {tsumekusa.publishing.InlineContent} Created inline content.  Returns
 *     an {@code tsumekusa.publishing.UnknownInlineTag} for overriding if the
 *     tag type was unknown.  You can get an other content by overriding the
 *     method when you defined a new inline tag.
 */
PublishingHelper.prototype.createInlineContent = function(tagName, tagContent) {
  switch (tagName) {
    case 'link':
      return new Link(tagContent);
    case 'plain':
    case 'code':
      return new InlineCode(tagContent);
    default:
      return new UnknownInlineTag(tagName, tagContent);
  }
};


/**
 * Creates a sentence by string.  The string will be parsed by
 * {@link #parseToInlineContents}.
 * @param {string} string String to parse.
 * @return {tsumekusa.publishing.Sentence} Created sentence.
 */
PublishingHelper.prototype.createSentence = function(string) {
  var sentence = new Sentence();
  sentence.appendInlineContents(this.parseToInlineContents(string));

  return sentence;
};
