// This script licensed under the MIT.
// http://orgachem.mit-license.org


var fs = require('jsdoc/fs');
var templateHelper = require('jsdoc/util/templateHelper');

var Container = require('./tsumekusa/contents/Container');
var PreformattedParagraph = require(
    './tsumekusa/contents/PreformattedParagraph');

var topContent = function() {
  var aa = [
    '     ________                           __    _ __',
    '    / ____/ /___  _______  __________  / /   (_) /_  _________ ________  __',
    '   / /   / / __ \\/ ___/ / / / ___/ _ \\/ /   / / __ \\/ ___/ __ `/ ___/ / / /',
    '  / /___/ / /_/ (__  ) /_/ / /  /  __/ /___/ / /_/ / /  / /_/ / /  / /_/ /',
    '  \\____/_/\\____/____/\\__,_/_/   \\___/_____/_/_.___/_/   \\__,_/_/   \\__, /',
    '                                                                  /____/'
  ].join('\n');

  return new PreformattedParagraph(aa);
}();




/**
 *  @param {TAFFY} taffyData See <http://taffydb.com/>.
 *  @param {object} opts Options.
 *  @param {Tutorial} tutorials Tutorials.
 */
exports.publish = function(taffyData, opts, tutorials) {
  // TODO: Remove a test code.
  var version = 'alphalpha'
  var date = new Date();

  /**
   * Map has pairs that longnames and each doclets.
   * @type {Object.<string, jsdoc.Doclet>}
   */
  var symbolsMap = {};

  /**
   * Map has pairs that longnames and each members.
   * @type {Object.<string, Array.<jsdoc.Doclet>>}
   */
  var memberMap = {};

  var symbols = templateHelper.prune(taffy).get();
  var classes = [], classesIdx = 0;
  var namespaces = [], namespacesIdx = 0;

  symbols.forEach(function(symbol) {
    // Create a map of a longname to the symbol.
    var longname = symbol.longname;
    symbolsMap[longname] = symbol;

    // TODO: Use DocletWrapper
    // Create a map of parent's longname to each members.
    var parentLongName, members;
    if (parentLongName = symbol.memberof) {
      if (!(members = memberMap[parentLongName])) {
        members = memberMap[parentLongName] = [];
      }
      members.push(symbol);
    }

    // Classify symbols
    switch (symbol.kind) {
      case 'namespace': 
        namespaces[namespacesIdx++] = symbol;
      case 'class':
        classes[classesIdx++] = symbol;
    }
  });

  classes.forEach(function(classSymbol) {
    var classDoc = new ClassDocument(classSymbol, version, date);
    classDoc.setStaticMethods();
    classDoc.publishToFile();
  });

  namespaces.forEach(function(namespaceSymbol) {
    var namespaceDoc = new NamespaceDocument(namespaceSymbol, version, date);
    namespaceDoc.publishToFile();
  });
};


// exports.publish = function(taffy) {
//   var data = templateHelper.prune(taffy);
//   data().each(function(doclet) { console.log(doclet); console.log(','); });
// };
