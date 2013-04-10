// This script licensed under the MIT.
// http://orgachem.mit-license.org


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
  var startTime = new Date().getTime();
  ReferenceHelper.baseDirectoryPath = opts.destination;

  var symbols = taffyData().get();

  /**
   * Map has pairs that longnames and each members.
   * @type {Object.<Array.<tsumekusaJsdoc.dom.DocletWrapper>>}
   */
  memberMap = tsumekusaJsdoc.MembersMap;

  var classes = [], classesIdx = 0;
  var namespaces = [], namespacesIdx = 0;


  symbols.forEach(function(symbol) {
    // Create a map of a longname to the symbol.
    var longname = symbol.longname;
    var currentDoclet;

    // Create a doclet wrapper for the doclet, if the wrapper is not defined.
    // The doclet wrapper provides some useful properties such as staticMethods,
    // ancestors.
    if (currentDoclet = memberMap[longname]) {
      currentDoclet.setOriginalDoclet(symbol);
    }
    else {
      currentDoclet = memberMap[longname] = new DocletWrapper(symbol);
    }

    // TODO: Use DocletWrapper
    var parentLongName, members, parentDoclet;
    if (parentLongName = currentDoclet.memberof) {
      // Create a doclet wrapper for the parent, if the wrapper is not defined.
      if (!(parentDoclet = memberMap[parentLongName])) {
        parentDoclet = memberMap[parentLongName] = new DocletWrapper();
      }
    }

    // In default, the type of enumeration is the members type.
    // So, should change the type of enumeration to an Object generic type.
    if (currentDoclet.isEnum) {
      if (currentDoclet.type.names.length > 0) {
        currentDoclet.type = { names:
            ['Object.<' + currentDoclet.type.names.join('|') + '>'] };
      }
      else {
        currentDoclet.type = { names: ['Object'] };
      }
    }

    // Classify currentDoclets
    switch (currentDoclet.kind) {
      case 'function':
        if (parentDoclet) {
          switch (currentDoclet.scope) {
            case 'static':
              parentDoclet.appendStaticMethod(currentDoclet);
              break;
            case 'instance':
              parentDoclet.appendInstanceMethod(currentDoclet);
              break;
            case 'inner':
              parentDoclet.appendInnerMethod(currentDoclet);
              break;
            default:
              util.warn('Unknown scope found: "' + currentDoclet.scope + '"');
              break;
          }
        }
        break;
      case 'constant':
      case 'member':
        if (parentDoclet) {
          switch (currentDoclet.scope) {
            case 'static':
              parentDoclet.appendStaticProperty(currentDoclet);
              break;
            case 'instance':
              parentDoclet.appendInstanceProperty(currentDoclet);
              break;
            case 'inner':
              parentDoclet.appendInnerProperty(currentDoclet);
              break;
            default:
              util.warn('Unknown scope found: "' + currentDoclet.scope + '"');
              break;
          }
        }
        break;
      case 'namespace':
        namespaces[namespacesIdx++] = currentDoclet;
        break;
      case 'class':
        classes[classesIdx++] = currentDoclet;
        break;
      case 'package':
      case 'module':
        // nothing to do.
        break;
      default:
        util.warn('Unknown kind found: "' + currentDoclet.kind + '"');
        break;
    }
  });

  var logo, version;
  if (opts.query) {
    logo = opts.query.logo ? decodeURIComponent(opts.query.logo) : null;
    version = opts.query.version;
  }
  var dst = opts.destination;

  // TODO: Implement module, externs, global object processing.
  classes.forEach(function(classSymbol) {
    var longname = classSymbol.longname;

    console.log('Processing: ' + longname);

    // Prepare DocletWrapper#ancestors.
    var augmentSymbol = classSymbol, augmentName, augments;
    while ((augments = augmentSymbol.augments) && augments[0] &&
        (augmentSymbol = memberMap[augments[0]])) {
      classSymbol.ancestors.unshift(augments[0]);
    }

    // Detect overridings (without override tags).
    var parentSymbol;
    if (classSymbol.augments && classSymbol.augments[0] &&
       (parentSymbol = memberMap[classSymbol.augments[0]])) {

      var instanceMembers = classSymbol.instanceMethods.concat(
          classSymbol.instanceProperties);

      var parentInstanceMembers = parentSymbol.instanceMethods.concat(
          parentSymbol.instanceProperties);

      // Get instance members were not overrided.
      parentInstanceMembers.forEach(function(parentInstanceMember) {
        // Get an override target symbol if any.
        var overriding;
        instanceMembers.some(function(instanceMember) {
          if (instanceMember.name === parentInstanceMember.name) {
            overriding = instanceMember;
            return true;
          }
          return false;
        });

        // Borrow properties of parent doclet.
        for (var key in parentInstanceMember) {
          if (!(key in overriding) && parentInstanceMember
              .hasOwnProperty(key)) {
            overriding[key] = parentInstanceMember[key];
          }
        }
      });
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

    if (dst === 'console') {
      classDoc.publishToConsole();
    }
    else {
      classDoc.publishToFile();
    }
  });

  namespaces.forEach(function(namespaceSymbol) {
    var longname = namespaceSymbol.longname;
    var currentDoclet = memberMap[longname];

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


    if (dst === 'console') {
      namespaceDoc.publishToConsole();
    }
    else {
      namespaceDoc.publishToFile();
    }
  });

  var elapse = parseInt((new Date().getTime() - startTime) / 1000);
  console.log('TsumekusaJsDoc complete the publishing (' + elapse + ' sec).');
};


// Exports the publisher.
module.exports = publisher;
