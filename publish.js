// This script licensed under the MIT.
// http://orgachem.mit-license.org


var startTime = new Date().getTime();
var fs = require('fs');

var tsumekusa = require('./node_modules/tsumekusa');
var util = tsumekusa.util;
var PreformattedParagraph = tsumekusa.PreformattedParagraph;

var basePath = './lib';
var tsumekusaJsdoc = require(basePath);
var ReferenceHelper = require(basePath + '/references/ReferenceHelper');
var ClassDocument = require(basePath + '/dom/ClassDocument');
var NamespaceDocument = require(basePath + '/dom/NamespaceDocument');
var DocletWrapper = require(basePath + '/dom/DocletWrapper');



/**
 * JsDoc template publisher.
 * @namespace
 */
var publisher = {};


/**
 * Publishes documents by the template.
 *  @param {TAFFY} taffyData See <http://taffydb.com/>.
 *  @param {object} opts Options.
 *  @param {Tutorial} tutorials Tutorials.
 */
publisher.publish = function(taffyData, opts, tutorials) {
  ReferenceHelper.baseDirectoryPath = opts.destination;

  var symbols = taffyData().get();

  /**
   * Map has pairs that longnames and each members.
   * @type {Object.<Array.<tsumekusaJsdoc.dom.DocletWrapper>>}
   */
  var memberMap = {};
  var classes = [], classesIdx = 0;
  var namespaces = [], namespacesIdx = 0;

  symbols.forEach(function(symbol) {
    // Create a map of a longname to the symbol.
    var longname = symbol.longname;
    var currentDocletWrapper;

    // Create a doclet wrapper for the doclet, if the wrapper is not defined.
    if (currentDocletWrapper = memberMap[longname]) {
      currentDocletWrapper.setOriginalDoclet(symbol);
    }
    else {
      currentDocletWrapper = memberMap[longname] = new DocletWrapper(symbol);
    }

    // TODO: Use DocletWrapper
    var parentLongName, members, parentDocletWrapper;
    if (parentLongName = symbol.memberof) {
      // Create a doclet wrapper for the parent, if the wrapper is not defined.
      if (!(parentDocletWrapper = memberMap[parentLongName])) {
        parentDocletWrapper = memberMap[parentLongName] = new DocletWrapper();
      }

      // Classify symbols
      switch (symbol.kind) {
        case 'function':
          switch (symbol.scope) {
            case 'static':
              parentDocletWrapper.appendStaticMethod(currentDocletWrapper);
              break;
            case 'instance':
              parentDocletWrapper.appendInstanceMethod(currentDocletWrapper);
              break;
            case 'inner':
              parentDocletWrapper.appendInnerMethod(currentDocletWrapper);
              break;
            default:
              util.warn('Unknown scope found: "' + symbol.scope + '"');
              break;
          }
          break;
        case 'constant':
        case 'member':
          switch (symbol.scope) {
            case 'static':
              parentDocletWrapper.appendStaticProperty(currentDocletWrapper);
              break;
            case 'instance':
              parentDocletWrapper.appendInstanceProperty(currentDocletWrapper);
              break;
            case 'inner':
              parentDocletWrapper.appendInnerProperty(currentDocletWrapper);
              break;
            default:
              util.warn('Unknown scope found: "' + symbol.scope + '"');
              break;
          }
          break;
        case 'namespace':
          namespaces[namespacesIdx++] = currentDocletWrapper;
          break;
        case 'class':
          classes[classesIdx++] = currentDocletWrapper;
          break;
        default:
          util.warn('Unknown kind found: "' + symbol.kind + '"');
          break;
      }
    }
  });

  var logo, version;
  if (opts.query) {
    logo = opts.query.logo ? decodeURIComponent(opts.query.logo) : null;
    version = opts.query.version;
  }

  // TODO: Implement module, externs, global object processing.
  classes.forEach(function(classSymbol) {
    var longname = classSymbol.longname;

    console.log('Processing: ' + longname);

    var augmentSymbol = classSymbol, augmentName, augments;
    while ((augments = augmentSymbol.augments) && augments[0] &&
        (augmentSymbol = memberMap[augments[0]])) {
      classSymbol.ancestors.unshift(augmentSymbol);
    }

    var classDoc = new ClassDocument(classSymbol);

    if (logo) {
      var pre = new PreformattedParagraph(logo);
      var tops = classDoc.getElement().getTopElements();
      tops.addChild(pre);
    }

    if (version) {
      classDoc.getElement().setVersion(version);
    }

    classDoc.publishToFile();
  });

  namespaces.forEach(function(namespaceSymbol) {
    var longname = namespaceSymbol.longname;
    var currentDocletWrapper = memberMap[longname];

    console.log('Processing: ' + longname);

    var namespaceDoc = new NamespaceDocument(namespaceSymbol);

    if (logo) {
      var pre = new PreformattedParagraph(logo);
      var tops = namespaceDoc.getElement().getTopElements();
      tops.addChild(pre);
    }

    if (version) {
      namespaceDoc.getElement().setVersion(version);
    }

    namespaceDoc.publishToFile();
  });

  var elapse = parseInt((new Date().getTime() - startTime) / 1000);
  console.log('TsumekusaJsDoc complete the publishing (' + elapse + ' sec).');
};


// Exports the publisher.
module.exports = publisher;
