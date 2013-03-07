// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var references = require('../references');
var Container = require('./Container');
var Paragraph = require('./Paragraph');
var DefinitionList = require('./DefinitionList');
var Sentence = require('./Sentence');
var InlineCode = require('./InlineCode');
var Code = require('./Code');
var Link = require('./Link');
var UnknownInlineTag = require('./UnknownInlineTag');



/**
 * A singleton class for publishing helper.
 * @constructor
 */
var PublishingHelper = function() {};
tsumekusa.addSingletonGetter(PublishingHelper);


// Modifier definitions {{{
/**
 * Default modifier for a symbol summary chapter.
 * @const
 * @type {string}
 */
PublishingHelper.SUMMARY_MODIFIER = 'summary';


/**
 * Default modifier for a static methods chapter.
 * @const
 * @type {string}
 */
PublishingHelper.STATIC_METHODS_MODIFIER = 'static-methods';


/**
 * Default modifier for a static properties chapter.
 * @const
 * @type {string}
 */
PublishingHelper.STATIC_PROPERTIES_MODIFIER = 'static-properties';


/**
 * Default modifier for a instance methods chapter.
 * @const
 * @type {string}
 */
PublishingHelper.INSTANCE_METHODS_MODIFIER = 'instance-methods';


/**
 * Default modifier for a instance properties chapter.
 * @const
 * @type {string}
 */
PublishingHelper.INSTANCE_PROPERTIES_MODIFIER = 'instance-properties';


/**
 * Default modifier for parameters section.
 * @const
 * @type {string}
 */
PublishingHelper.PARAMS_MODIFIER = 'params';
//}}}


// Caption definitions {{{
/**
 * Default modifier for returns section.
 * @const
 * @type {string}
 */
PublishingHelper.RETURNS_MODIFIER = 'returns';


/**
 * Default caption for a symbol summary chapter.
 * @const
 * @type {string}
 */
PublishingHelper.SUMMARY_CAPTION = 'Summary';


/**
 * Default caption for a static methods chapter.
 * @const
 * @type {string}
 */
PublishingHelper.STATIC_METHODS_CAPTION = 'static-methods';


/**
 * Default caption for a static properties chapter.
 * @const
 * @type {string}
 */
PublishingHelper.STATIC_PROPERTIES_CAPTION = 'static-properties';


/**
 * Default caption for a instance methods chapter.
 * @const
 * @type {string}
 */
PublishingHelper.INSTANCE_METHODS_CAPTION = 'instance-methods';


/**
 * Default caption for a instance properties chapter.
 * @const
 * @type {string}
 */
PublishingHelper.INSTANCE_PROPERTIES_CAPTION = 'instance-properties';


/**
 * Default caption for parameters section.
 * @const
 * @type {string}
 */
PublishingHelper.PARAMS_CAPTION = 'Parameters';


/**
 * Default caption for returns section.
 * @const
 * @type {string}
 */
PublishingHelper.RETURNS_CAPTION = 'Returns';
//}}}


/**
 * Creates a document.
 * @param {string} symbol Symbol of the document.  Usually, the symbol is kind
 *     of namespace or class.
 * @param {?string=} opt_version Optional version identifier.
 * @param {?Date=} opt_date Optional date object.
 */
PublishingHelper.prototype.createDocument = function(symbol, opt_version,
                                                     opt_date) {
  var doc = new Document(symbol.longname, symbol.meta.filename, opt_version,
                         opt_date);

  this.createStaticMethodsContainer();
  return doc;
};


/**
 * Parses a string to an array of inline contents.  Returns an original string,
 * if {@link tsumekusa.INLINE_TAG_DISABLED} flag was set.
 * @param {string} string String to parse.
 * @return {Array.<string|tsumekusa.publishing.InlineContent>} Parsed contents.
 */
PublishingHelper.prototype.parseInlineContents = function(string) {
  // Return an original string if no inline code.
  var contents = [string], contentsIdx = 0;

  if (tsumekusa.INLINE_TAG_DISABLED) {
    // Returns original string if tsumekusa.INLINE_TAG_DISABLED flag was set.
    return [string];
  }

  // TODO: Implement HTML tag parser
  string.replace(/([^\{]+)\{@([\S]+)\s+([^\}]+)\}/g, function(matched, pre,
      tagName, tagContent) {
        contents[contentsIdx++] = pre;
        contents[contentsIdx++] = this.createInlineContent(tagName, tagContent);
      }, this);

  return contents;
};


/**
 * Creates static methods container.
 * @param {Array.<jsdoc.Doclet>} symbol Symbol contains {@code methods}.
 * @param {Array.<jsdoc.Doclet>} methods Method symbols.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createStaticMethodsContainer = function(symbol,
                                                                   methods) {
  return this.createMethodsContainer(symbol, methods, PublishingHelper.
      STATIC_METHODS_CAPTION, PublishingHelper.STATIC_METHODS_MODIFIER);
};


/**
 * Creates static properties container.
 * @param {Array.<jsdoc.Doclet>} symbol Symbol contains {@code methods}.
 * @param {Array.<jsdoc.Doclet>} props Property symbols.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createStaticPropertiesContainer = function(symbol,
    props) {
  return this.createPropertiesContainer(symbol, methods, PublishingHelper.
      STATIC_PROPERTIES_CAPTION, PublishingHelper.STATIC_PROPERTIES_MODIFIER);
};


/**
 * Creates instance methods container.
 * @param {Array.<jsdoc.Doclet>} symbol Symbol contains {@code methods}.
 * @param {Array.<jsdoc.Doclet>} methods Method symbols.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createStaticMethodsContainer = function(symbol,
    methods) {
  return this.createMethodsContainer(symbol, methods, PublishingHelper.
      INSTANCE_METHODS_CAPTION, PublishingHelper.INSTANCE_METHODS_MODIFIER);
};


/**
 * Creates instance properties container.
 * @param {Array.<jsdoc.Doclet>} symbol Symbol contains {@code methods}.
 * @param {Array.<jsdoc.Doclet>} props Property symbols.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createStaticPropertiesContainer = function(symbol,
    props) {
  return this.createPropertiesContainer(symbol, methods, PublishingHelper.
      INSTANCE_PROPERTIES_CAPTION, PublishingHelper.
      INSTANCE_PROPERTIES_MODIFIER);
};


/**
 * Creates a summary container.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createSummaryParagraph = function(symbol) {
  var refId = references.getReferenceId(symbol, PublishingHelper.
                                        SUMMARY_MODIFIER);
  var container = new Container(PublishingHelper.SUMMARY_CAPTION, refId, true);

  var p = new Paragraph();
  container.appendTopContent(p);

  var desc = this.createSentence(symbol.description);
  p.appendSentence(desc);

  return container;
};


/**
 * Creates members container.  The method is useful when you want to create
 * a new member category.  The method do NOT create members, so override and
 * implement constructing members.
 * @param {Array.<jsdoc.Doclet>} symbol Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Member symbols.
 * @param {string} caption Caption of the container such as {@code
 *     'Static members'}.
 * @param {string} modifier Modifier of the reference ID.
 * @return {tsumekusa.publishing.Container} Created container.
 * @protected
 */
PublishingHelper.prototype.createMembersContainer = function(symbol, members,
    caption, modifier) {
  var refId = references.getReferenceId(symbol, modifier);
  var container = new Container(caption, refId, true);

  return container;
};


/**
 * Creates methods container.
 * @param {Array.<jsdoc.Doclet>} symbol Symbol contains {@code methods}.
 * @param {Array.<jsdoc.Doclet>} methods Method symbols.
 * @param {string} caption Caption of the container such as {@code
 *     'Static methods'}.
 * @param {string} modifier Modifier of the reference ID.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createMethodsContainer = function(symbol, methods,
    caption, modifier) {
  var container = this.createMembersContainer(symbol, members, caption,
                                              modifier);
  methods.forEach(function(method) {
    var methodContainer = this.createMethodContainer(symbol);
    container.appendSubContainer(methodContainer);
  }, this);

  return container;
};


/**
 * Creates properties container.
 * @param {Array.<jsdoc.Doclet>} symbol Symbol contains {@code props}.
 * @param {Array.<jsdoc.Doclet>} props Property symbols.
 * @param {string} caption Caption of the container such as {@code
 *     'Static properties'}.
 * @param {string} modifier Modifier of the reference ID.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createPropertiesContainer = function(symbol, props,
    caption, modifier) {
  var container = this.createMembersContainer(symbol, members, caption,
                                              modifier);
  props.forEach(function(prop) {
    var propContainer = this.createPropertyContainer(symbol);
    container.appendSubContainer(propContainer);
  }, this);

  return container;
};


/**
 * Creates a member container.
 * @param {jsdoc.Doclet} symbol Symbol of the container.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createMemberContainer = function(symbol) {
  var refId = references.getReferenceId(symbol);
  var container = new Container(symbol.longname, refId, true);

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

  var p = this.createMethodSummaryParagraphs(symbol);
  container.appendTopContent(p);

  container.appendSubContainer(params);
  container.appendSubContainer(returns);

  return container;
};


/**
 * Creates a method container.
 * @param {jsdoc.Doclet} symbol Symbol of the container.
 * @return {tsumekusa.publishing.Container} Created container.
 */
PublishingHelper.prototype.createPropertyContainer = function(symbol) {
  var container = this.createMemberContainer(symbol);
  var type = this.createTypeContainer(symbol);

  var p = this.createPropertySummaryParagraphs();
  container.appendTopContent(p);

  container.appendSubContainer(type);
  return container;
};


/**
 * Creates a top content for a method summary.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {Array.<tsumekusa.publishing.Paragraph>} Top contents.
 */
PublishingHelper.prototype.createMethodSummaryParagraphs = function(symbol) {
  var p1 = new Paragraph();
  var desc = this.createSentence(symbol.description);
  p1.appendSentence(desc);

  var p2 = new Paragraph();
  var format = this.createMethodDetailSentence(symbol);
  p2.appendSentence(format);

  return [p1, p2];
};


/**
 * Creates a top content for a property summary.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {Array.<tsumekusa.publishing.Paragraph>} Top contents.
 */
PublishingHelper.prototype.createPropertySummaryParagraphs = function(symbol) {
  var p1 = new Paragraph();
  var desc = this.createSentence(symbol.description);
  p1.appendSentence(desc);

  var p2 = new Paragraph();
  var format = this.createPropertyDetailSentence(symbol);
  p2.appendSentence(format);

  return [p1, p2];
};


/**
 * Creates a method format.  For example,
 * {@code 'foo( string str, Foo | null foo ) => string'}.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Setence} Method detail sentence.
 */
PublishingHelper.prototype.createMethodDetailSentence = function(symbol) {
  var sentence = new Sentence();
  var paramsMax = symbol.params.length - 1;
  var returnsMax = symbol.returns.length - 1;

  sentence.appendInlineContent(symbol.longname + '(');

  symbol.params.forEach(function(tag, index) {
    var links = this.createTypeSentence(tag);
    var paramName = this.createParameterNameString(tag.name);
    sentence.appendInlineContents(links);
    sentence.appendInlineContent(paramName + (index < paramsMax ? ',' : ''));
  }, this);

  sentence.appendInlineContent(')');
  sentence.appendInlineContent('=>');

  symbol.returns.forEach(function(tag, index) {
    var links = this.createTypeSentence(tag);
    sentence.appendInlineContents(links);
    if (index < returnsMax) {
      sentence.appendInlineContent(',');
    }
  }, this);

  return sentence;
};


/**
 * Creates a property format.  For example, {@code 'foo: string | null'}.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Setence} Property detail sentence.
 */
PublishingHelper.prototype.createPropertyDetailSentence = function(symbol) {
  var sentence = new Sentence();
  var typeMax = symbol.type.length - 1;

  sentence.appendInlineContent(symbol.longname + ':');

  symbol.type.forEach(function(tag, index) {
    var links = this.createTypeSentence(tag);
    sentence.appendInlineContents(links);
    if (index < typeMax) {
      sentence.appendInlineContent(',');
    }
  }, this);

  return sentence;
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
    var signature = this.createTypeSentence(tag);
    var paramName = this.createParameterNameString();
    var desc = this.createSentence(tag.text);

    // Add caption to head.
    signature.appendInlineContentAt(paramName + ':', 0);

    defs.appendDefinition(signature, desc);
  }, this);

  container.appendTopContent(defs);
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
    var signature = this.createTypeSentence(tag);
    var desc = this.createSentence(tag.text);

    defs.appendDefinition(signature, desc);
  }, this);

  container.appendTopContent(defs);

  return container;
};


/**
 * Creates a type signature sentence.
 * @param {jsdoc.Tag} tag Tag.
 * @return {tsumekusa.publishing.Sentence} Type signature sentence.
 */
PublishingHelper.prototype.createTypeContents = function(tag) {
  var links = [], linksIdx = 0;

  if (tag.type && tag.type.names) {
    tag.type.names.forEach(function(type) {
      links[linksIdx++] = new Link(type);
    }, this);

    if (tag.nullable) {
      links[linksIdx++] = 'null';
    }

    return links;
  }
  else {
    return ['?'];
  }
};


/**
 * Creates a type signature sentence.
 * @param {jsdoc.Tag} tag Tag.
 * @return {tsumekusa.publishing.Sentence} Type signature sentence.
 */
PublishingHelper.prototype.createTypeSentence = function(tag) {
  var sentence = new Sentence();
  var separator = '|';

  this.createTypeContents(tag).forEach(function(type) {
    sentence.appendInlineContent(type);
    sentence.appendInlineContent(separator);
  });

  // Remove a last separator.
  sentence.removeInlineContentAt(sentence.getCount());

  return sentence;
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
 * {@link #parseInlineContents}.
 * @param {string} string String to parse.
 * @return {tsumekusa.publishing.Sentence} Created sentence.
 */
PublishingHelper.prototype.createSentence = function(string) {
  var sentence = new Sentence();
  sentence.appendInlineContents(this.parseInlineContents(string));

  return sentence;
};


// Exports the constructor.
module.exports = PublishingHelper;
