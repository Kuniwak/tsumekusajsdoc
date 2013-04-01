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
 * Publishes documents by the template.
 *  @param {TAFFY} taffyData See <http://taffydb.com/>.
 *  @param {object} opts Options.
 *  @param {Tutorial} tutorials Tutorials.
 */
exports.publish = function(taffyData, opts, tutorials) {
  ReferenceHelper.baseDirectoryPath = opts.destination;

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
              tsumekusa.warn('Unknown scope found: "' + symbol.scope + '"');
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
              tsumekusa.warn('Unknown scope found: "' + symbol.scope + '"');
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
          tsumekusa.warn('Unknown kind found: "' + symbol.kind + '"');
          break;
      }
    }
  });

  var logo = opts.query.logo ? decodeURIComponent(opts.query.logo) : null;
  var version = opts.query.version;

  // TODO: Implement module, externs, global object processing.
  classes.forEach(function(classSymbol) {
    var classDoc = new ClassDocument(classSymbol);

    if (logo) {
      var pre = new PreformattedParagraph(logo);
      var tops = classDoc.getElement().getTopElements();
      tops.addChild(pre);
    }

    if (version) {
      classDoc.getElement().setVersion(version);
    }

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
    var namespaceDoc = new NamespaceDocument(namespaceSymbol);

    if (logo) {
      var pre = new PreformattedParagraph(logo);
      var tops = namespaceDoc.getElement().getTopElements();
      tops.addChild(pre);
    }

    if (version) {
      namespaceDoc.getElement().setVersion(version);
    }

    var docletWrapper;
    if (docletWrapper = memberMap[namespaceSymbol.longname]) {
      namespaceDoc.setStaticMethods(docletWrapper.staticMethods);
      namespaceDoc.setStaticProperties(docletWrapper.staticProperties);
    }

    namespaceDoc.publishToFile();
  });

  var elapse = parseInt((new Date().getTime() - startTime) / 1000);
  console.log('TsumekusaJsDoc complete the publishing (' + elapse + ' sec).');
};


var publishToFile = function() {
  var current = '';
  var dirs = this.dirPath_.split(/\//).forEach(function(dir) {
    current += dir + '/'
    if (!fs.existsSync(current)) {
      fs.mkdirSync(current);
    }
  });
  fs.writeFileSync(this.fileName_, this.publishToFileInternal(), 'utf8');
};
