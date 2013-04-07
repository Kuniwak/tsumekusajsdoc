// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/dom/Link');
var InlineCode = require(tsumekusaPath + '/dom/InlineCode');

var registry = require(tsumekusaPath + '/publishing/registry');
var publishers = require(tsumekusaPath + '/publishing/DefaultPublishers');

registry.registerElementPublishers(publishers);

var basePath = '../../../tsumekusaJsdoc';
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var Type = require(basePath + '/dom/Type');


exports.testPublishWithTwoParamsAndReturn = function(test) {
  var dummyDoclet = {
    longname: 'foo.bar',
    params: [
      {
        name: 'arg1',
        type: {
          names: ['string']
        }
      }, {
        name: 'arg2',
        type: {
          names: ['goog.structs.Map']
        }
      }
    ],
    returns: [
      {
        type: {
          names: ['boolean']
        }
      }
    ]
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), '`foo.bar`(`arg1`, `arg2`) -> `boolean`');
  test.done();
};


exports.testPublishWithParamAndReturn = function(test) {
  var dummyDoclet = {
    longname: 'foo.bar',
    params: [
      {
        name: 'arg1',
        type: {
          names: ['string']
        }
      }
    ],
    returns: [
      {
        type: {
          names: ['boolean']
        }
      }
    ]
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), '`foo.bar`(`arg1`) -> `boolean`');
  test.done();
};


exports.testPublishWithReturn = function(test) {
  var dummyDoclet = {
    longname: 'foo.bar',
    params: [],
    returns: [
      {
        type: {
          names: ['number']
        }
      }
    ]
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), '`foo.bar`() -> `number`');
  test.done();
};


exports.testPublishWithParam = function(test) {
  var dummyDoclet = {
    longname: 'foo.bar',
    params: [
      {
        name: 'arg1',
        type: {
          names: ['string']
        }
      }
    ],
    returns: []
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), '`foo.bar`(`arg1`)');
  test.done();
};
