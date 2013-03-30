// This script licensed under the MIT.
// http://orgachem.mit-license.org



var tsumekusa = require('../../tsumekusa');
var Document = require('../dom/Document');
var Container = require('../dom/Container');
var Sentence = require('../dom/Sentence');
var Paragraph = require('../dom/Paragraph');
var Strong = require('../dom/Strong');
var Code = require('../dom/Code');
var Link = require('../dom/Link');
var DefinitionList = require('../dom/DefinitionList');
var PreformattedParagrapg = require('../dom/PreformattedParagraph');
var VimHelpDocumentPublisher = require('./VimHelpDocumentPublisher');

var aa = [
  '     ________                           __    _ __',
  '    / ____/ /___  _______  __________  / /   (_) /_  _________ ________  __',
  '   / /   / / __ \\/ ___/ / / / ___/ _ \\/ /   / / __ \\/ ___/ __ `/ ___/ / / /',
  '  / /___/ / /_/ (__  ) /_/ / /  /  __/ /___/ / /_/ / /  / /_/ / /  / /_/ /',
  '  \\____/_/\\____/____/\\__,_/_/   \\___/_____/_/_.___/_/   \\__,_/_/   \\__, /',
  '                                                                  /____/'
].join('\n');

var topElement = new PreformattedParagrapg(aa);

var symbolName = 'goog.array';
var document = new Document(symbolName, 'array.js', '20130212', new Date());
document.appendTopElement(topElement);


// Constructor {{{
var ctorDesc = 'Utilities for manipulating arrays.';
var ctorCode = new Code('goog.array');

var ctorSentence = new Sentence(ctorDesc, ctorCode);
var ctorParagraph = new Paragraph(ctorSentence);
var ctorContainer = new Container('Summary', 'goog.array-summary', true);
ctorContainer.appendTopElement(ctorParagraph);

document.appendSubContainer(ctorContainer);
//}}}


// Static methods {{{
var staticMethodsContainer = new Container('Static methods', 'goog.array-static-methods', true);

// goog.array.indexOf {{{
var arrayIndexOfDesc = new Sentence('Returns the index of the first element of an array with a specified value, or -1 if the element is not present in the array. See', new Link('http://tinyurl.com/developer-mozilla-org-array-indexof'));
var arrayIndexOfParagraph = new Paragraph(arrayIndexOfDesc);
var arrayIndexOfContainer = new Container('goog.array.indexOf', 'goog.array.indexOf', true);
arrayIndexOfContainer.appendTopElement(arrayIndexOfParagraph);

// Params {{{
var arrayIndexOfParamsContainer = new Container('Parameters', 'goog.array.indexOf-params');
var arrayIndexOfParamsDefinitionList = new DefinitionList(DefinitionList.ListType.UNORDERED);
var arrayIndexOfParamCaption1 = new Sentence('arr' + ':', new Link('goog.array.ArrayLike'));
arrayIndexOfParamsDefinitionList.appendDefinition(arrayIndexOfParamCaption1, 'The array to be searched.');
var arrayIndexOfParamCaption2 = new Sentence('obj' + ':', '*');
arrayIndexOfParamsDefinitionList.appendDefinition(arrayIndexOfParamCaption2, 'The object for which we are searching.');
var arrayIndexOfParamCaption3 = new Sentence('opt_fromIndex' + ':', 'number' + ',', 'undefined');
arrayIndexOfParamsDefinitionList.appendDefinition(arrayIndexOfParamCaption3, 'The index at which to start the search. If omitted the search starts at index 0.');
arrayIndexOfParamsContainer.appendTopElement(arrayIndexOfParamsDefinitionList);

arrayIndexOfContainer.appendSubContainer(arrayIndexOfParamsContainer);
//}}}

// Return {{{
var arrayIndexOfReturnContainer = new Container('Returns', 'goog.array.indexOf-returns');
var arrayIndexOfReturnDefinitionList = new DefinitionList(DefinitionList.ListType.UNORDERED);
var arrayIndexOfReturnCaption = new Sentence('number');
arrayIndexOfReturnDefinitionList.appendDefinition(arrayIndexOfReturnCaption, 'The index of the first matching array element.');
arrayIndexOfReturnContainer.appendTopElement(arrayIndexOfReturnDefinitionList);

arrayIndexOfContainer.appendSubContainer(arrayIndexOfReturnContainer);
//}}}

staticMethodsContainer.appendSubContainer(arrayIndexOfContainer);
//}}}

document.appendSubContainer(staticMethodsContainer);
//}}}

console.log(VimHelpDocumentPublisher.getInstance().publish(document));

module.exports = document;
