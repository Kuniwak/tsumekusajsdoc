// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');

var basePath = '../../lib';
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var Type = require(basePath + '/dom/Type');


module.exports = {
  'publish a function has 2 params and 1 return': function(test) {
    var dummyDoclet = {
      longname: 'foo.bar',
      params: [
        {
          name: 'arg1',
          type: {
            names: ['string'],
            original: 'string'
          }
        }, {
          name: 'arg2',
          type: {
            names: ['goog.structs.Map'],
            original: 'goog.structs.Map'
          }
        }
      ],
      returns: [
        {
          type: {
            names: ['boolean'],
            original: 'boolean'
          }
        }
      ]
    };

    var digest = new FunctionDigest(dummyDoclet);
    test.equal(digest.publish(), '`foo.bar`(`arg1`, `arg2`) -> `boolean`');
    test.done();
  },
  'publish a function has 1 param and 1 return': function(test) {
    var dummyDoclet = {
      longname: 'foo.bar',
      params: [
        {
          name: 'arg1',
          type: {
            names: ['string'],
            original: 'string'
          }
        }
      ],
      returns: [
        {
          type: {
            names: ['boolean'],
            original: 'boolean'
          }
        }
      ]
    };

    var digest = new FunctionDigest(dummyDoclet);
    test.equal(digest.publish(), '`foo.bar`(`arg1`) -> `boolean`');
    test.done();
  },
  'publish a function has 1 return': function(test) {
    var dummyDoclet = {
      longname: 'foo.bar',
      params: [],
      returns: [
        {
          type: {
            names: ['number'],
            original: 'number'
          }
        }
      ]
    };

    var digest = new FunctionDigest(dummyDoclet);
    test.equal(digest.publish(), '`foo.bar`() -> `number`');
    test.done();
  },
  'publish a function has 1 param': function(test) {
    var dummyDoclet = {
      longname: 'foo.bar',
      params: [
        {
          name: 'arg1',
          type: {
            names: ['string'],
            original: 'string'
          }
        }
      ],
      returns: []
    };

    var digest = new FunctionDigest(dummyDoclet);
    test.equal(digest.publish(), '`foo.bar`(`arg1`)');
    test.done();
  }
};
