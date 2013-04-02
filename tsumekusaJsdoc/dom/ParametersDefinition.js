// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var InlineElement = require(tsumekusaPath + '/dom/InlineElement');
var ElementArray = require(tsumekusaPath + '/dom/ElementArray');
var InlineCode = require(tsumekusaPath + '/dom/InlineCode');
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');
var Type = require(basePath + '/dom/Type');



/**
 * A class for a definition of a method parameters.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
ParametersDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var docHelper = this.getDocHelper();
  var def = new DefinitionList.Definition();

  var dt = this.getCaption();
  var dd = new ElementArray();

  def.setTerm(dt);
  def.setDescriptions(dd);

  var innerDl = new DefinitionList(DefinitionList.ListType.NO_MARKER);
  dd.addChild(innerDl);

  if (symbol.params) {
    symbol.params.forEach(function(tag) {
      var desc = new ElementArray();
      desc.addChildren(docHelper.parseBlocks(tag.description || tsumekusaJsdoc.
          NO_DESCRIPTION));

      var term = new ParametersDefinition.ParameterDefinitionTerm(tag,
          opt_docHelper, opt_refHelper);
      var p = new Paragraph(term.getElement());

      innerDl.addDefinition(p, desc);
    }, this);
  }

  this.setElement(def);
};
tsumekusa.inherits(ParametersDefinition, DocElement);


/**
 * Default caption for parameter definitions.
 * @const
 * @type {string}
 */
ParametersDefinition.CAPTION = 'Parameters';



/**
 * A class for parameter definition terms.
 * @param {jsdoc.Tag} tag Parameter tag.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
ParametersDefinition.ParameterDefinitionTerm = function(tag, opt_docHelper,
    opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);

  var name = new InlineCode(tsumekusaJsdoc.decorateParamName(tag));
  var type = new Type(tag, opt_docHelper, opt_refHelper);

  var impl = new ParametersDefinition.ParameterDefinitionTermImpl(name, type);
  this.setElement(impl);
};
tsumekusa.inherits(ParametersDefinition.ParameterDefinitionTerm, DocElement);



/**
 * A class for parameter definition term implementors.
 * @param {tsumekusa.dom.InlineElement} name Parameter name.
 * @param {tsumekusaJsdoc.dom.Type} type Parameter type.
 * @constructor
 * @extends {tsumekusa.dom.InlineElement}
 */
ParametersDefinition.ParameterDefinitionTermImpl = function(name, type) {
  InlineElement.call(this);
  this.name_ = name;
  this.type_ = type;
};
tsumekusa.inherits(ParametersDefinition.ParameterDefinitionTermImpl,
    InlineElement);


/** @override */
ParametersDefinition.ParameterDefinitionTermImpl.prototype.isBreakable =
    function() {
  return false;
};


/** @override */
ParametersDefinition.ParameterDefinitionTermImpl.prototype.getPublisher =
    function() {
  return null;
};


/** @override */
ParametersDefinition.ParameterDefinitionTermImpl.prototype.publish =
    function() {
  return this.name_.publish() + ': ' + this.type_.publish();
};


/**
 * Retruns a caption of parameter definitions.
 * @return {string} Caption string for parameter definitions.
 */
ParametersDefinition.prototype.getCaption = function() {
  return ParametersDefinition.CAPTION;
};


// Exports the constructor.
module.exports = ParametersDefinition;
