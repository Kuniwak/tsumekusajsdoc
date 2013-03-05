// This script licensed under the MIT.
// http://orgachem.mit-license.org


var fs = require('jsdoc/fs');
var Container = require('./tsumekusa/publishing/Container');
var PreformattedParagraph = require('./tsumekusa/publishing/PreformattedParagraph');


var createTopContent = function() {
  var aa = [
    '     ________                           __    _ __',
    '    / ____/ /___  _______  __________  / /   (_) /_  _________ ________  __',
    '   / /   / / __ \\/ ___/ / / / ___/ _ \\/ /   / / __ \\/ ___/ __ `/ ___/ / / /',
    '  / /___/ / /_/ (__  ) /_/ / /  /  __/ /___/ / /_/ / /  / /_/ / /  / /_/ /',
    '  \\____/_/\\____/____/\\__,_/_/   \\___/_____/_/_.___/_/   \\__,_/_/   \\__, /',
    '                                                                  /____/'
  ].join('\n');

  return new PreformattedParagraph(aa);
};


var createRootSummary = function() {
  var container = new Container();
};

/**
 *  @param {TAFFY} taffyData See <http://taffydb.com/>.
 *  @param {object} opts Options.
 *  @param {Tutorial} tutorials Tutorials.
 */
exports.publish = function(taffyData, opts, tutorials) {
  
};
