// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');

var basePath = '../../lib';
var ObjectDigest = require(basePath + '/dom/ObjectDigest');
var Type = require(basePath + '/dom/Type');


module.exports = {
  'publish': function(test) {
    var dummyDoclet = {
      longname: 'foo.bar',
      type: {
        names: ['boolean'],
        original: 'boolean'
      }
    };

    var digest = new ObjectDigest(dummyDoclet);
    test.equal(digest.publish(), '`foo.bar`: `boolean`');
    test.done();
  }
};
