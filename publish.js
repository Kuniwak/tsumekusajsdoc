// This script licensed under the MIT.
// http://orgachem.mit-license.org


var fs = require('fs');

var tsumekusaPath = './tsumekusa';
var tsumekusa = require(tsumekusaPath);
var registry = require(tsumekusaPath + '/publishing/registry');
var publishers = require(tsumekusaPath + '/publishing/DefaultPublishers');
registry.registerElementPublishers(publishers);

var tsumekusaJsdocPath = './tsumekusaJsdoc';
var tsumekusaJsdoc = require(tsumekusaJsdocPath);
var ClassDocument = require(tsumekusaJsdocPath + '/dom/ClassDocument');
var NamespaceDocument = require(tsumekusaJsdocPath + '/dom/NamespaceDocument');
var DocletWrapper = require(tsumekusaJsdocPath + '/dom/DocletWrapper');

var PreformattedParagraph = require(
    './tsumekusa/dom/PreformattedParagraph');

var topContents = function() {
  var aa = [
    '',
    '   ________                           __    _ __',
    '  / ____/ /___  _______  __________  / /   (_) /_  _________ ________  __',
    ' / /   / / __ \\/ ___/ / / / ___/ _ \\/ /   / / __ \\/ ___/ __ \'/ ___/ / / /',
    '/ /___/ / /_/ (__  ) /_/ / /  /  __/ /___/ / /_/ / /  / /_/ / /  / /_/ /',
    '\\____/_/\\____/____/\\__,_/_/   \\___/_____/_/_.___/_/   \\__,_/_/   \\__, /',
    '                                                                /____/',
    ''
  ].join('\n');

  return new PreformattedParagraph(aa);
}();

var ReferenceHelper = require('./tsumekusaJsdoc/references/ReferenceHelper');


/**
 *  @param {TAFFY} taffyData See <http://taffydb.com/>.
 *  @param {object} opts Options.
 *  @param {Tutorial} tutorials Tutorials.
 */
exports.publish = function(taffyData, opts, tutorials) {
  var version = opts.version || 'n/a';
  var date = new Date();

  /**
   * Map has pairs that longnames and each members.
   * @type {Object.<string, Array.<jsdoc.Doclet>>}
   */
  var memberMap = {};

  var symbols = taffyData().get();
  var classes = [], classesIdx = 0;
  var namespaces = [], namespacesIdx = 0;

  symbols.forEach(function(symbol) {
    // Create a map of a longname to the symbol.
    var longname = symbol.longname;

    // Create a doclet wrapper for the doclet, if the wrapper is not defined.
    if (!memberMap[longname]) {
      memberMap[longname] = new DocletWrapper();
    }

    // TODO: Use DocletWrapper
    var parentLongName, members, docletWrapper;
    if (parentLongName = symbol.memberof) {
      // Create a doclet wrapper for the parent, if the wrapper is not defined.
      if (!(docletWrapper = memberMap[parentLongName])) {
        docletWrapper = memberMap[parentLongName] = new DocletWrapper();
      }

      // Classify symbols
      switch (symbol.kind) {
        case 'function':
          switch (symbol.scope) {
            case 'static':
              docletWrapper.appendStaticMethod(symbol);
              break;
            case 'instance':
              docletWrapper.appendInstanceMethod(symbol);
              break;
            case 'inner':
              docletWrapper.appendInnerMethod(symbol);
              break;
            default:
              console.warn('Unknown scope found: "' + symbol.scope + '"');
              break;
          }
          break;
        case 'member':
          switch (symbol.scope) {
            case 'static':
              docletWrapper.appendStaticProperty(symbol);
              break;
            case 'instance':
              docletWrapper.appendInstanceProperty(symbol);
              break;
            case 'inner':
              docletWrapper.appendInnerProperty(symbol);
              break;
            default:
              console.warn('Unknown scope found: "' + symbol.scope + '"');
              break;
          }
          break;
        case 'namespace':
          namespaces[namespacesIdx++] = symbol;
          break;
        case 'class':
          classes[classesIdx++] = symbol;
          break;
        default:
          console.warn('Unknown kind found: "' + symbol.kind + '"');
          break;
      }
    }
  });

  // TODO: Implement module, externs, global object processing.
  classes.forEach(function(classSymbol) {
    var classDoc = new ClassDocument(classSymbol, topContents, version, date);

    var docletWrapper;
    if (docletWrapper = memberMap[classSymbol.longname]) {
      classDoc.setStaticMethods(docletWrapper.staticMethods);
      classDoc.setStaticProperties(docletWrapper.staticProperties);
      classDoc.setInstanceMethods(docletWrapper.instanceMethods);
      classDoc.setInstanceProperties(docletWrapper.instanceProperties);
    }

    classDoc.publishToFile();
  });

  namespaces.forEach(function(namespaceSymbol) {
    var namespaceDoc = new NamespaceDocument(namespaceSymbol, topContents,
        version, date);

    var docletWrapper;
    if (docletWrapper = memberMap[namespaceSymbol.longname]) {
      namespaceDoc.setStaticMethods(docletWrapper.staticMethods);
      namespaceDoc.setStaticProperties(docletWrapper.staticProperties);
    }

    namespaceDoc.publishToFile();
  });
};
