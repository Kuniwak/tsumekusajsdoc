// This script licensed under the MIT.
// http://orgachem.mit-license.org


var startTime = new Date().getTime();
var fs = require('fs');

var tsumekusaPath = './tsumekusa';
var tsumekusa = require(tsumekusaPath);
var PreformattedParagraph = require(tsumekusaPath +
    '/dom/PreformattedParagraph');
var registry = require(tsumekusaPath + '/publishing/registry');
var publishers = require(tsumekusaPath + '/publishing/DefaultPublishers');
registry.registerElementPublishers(publishers);

var tsumekusaJsdocPath = './tsumekusaJsdoc';
var tsumekusaJsdoc = require(tsumekusaJsdocPath);
var ReferenceHelper = require(tsumekusaJsdocPath +
    '/references/ReferenceHelper');
var ClassDocument = require(tsumekusaJsdocPath + '/dom/ClassDocument');
var NamespaceDocument = require(tsumekusaJsdocPath + '/dom/NamespaceDocument');
var DocletWrapper = require(tsumekusaJsdocPath + '/dom/DocletWrapper');



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

  /**
   * Map has pairs that longnames and each members.
   * @type {Object.<Array.<tsumekusaJsdoc.dom.DocletWrapper>>}
   */
  var memberMap = {};

  var symbols = taffyData().get();
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
              tsumekusa.warn('Unknown scope found: "' + symbol.scope + '"');
              break;
          }
          break;
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
              tsumekusa.warn('Unknown scope found: "' + symbol.scope + '"');
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
          tsumekusa.warn('Unknown kind found: "' + symbol.kind + '"');
          break;
      }
    }
  });

  var logo = opts.query.logo ? decodeURIComponent(opts.query.logo) : null;
  var version = opts.query.version;

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
