// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/dom/Link');

var registry = require(tsumekusaPath + '/publishing/registry');
var publishers = require(tsumekusaPath + '/publishing/DefaultPublishers');

registry.registerElementPublishers(publishers);

var basePath = '../../../tsumekusaJsdoc';
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var Type = require(basePath + '/dom/Type');
var TypePublisher = require(basePath + '/publishing/TypePublisher');
Type.publisher = new TypePublisher();


exports.testPublishWithTwoParamsAndReturn = function(test) {
  var name = new InlineCode('foo.bar');
  var ref1 = 'string';
  var ref2 = 'goog.structs.Map';
  var ref3 = 'boolean';
  var lnk1 = new Link(ref1);
  var lnk2 = new Link(ref2);
  var lnk3 = new Link(ref3);

  var dummyDoclet = {
    longname: 'foo.bar',
    params: [
      {
        name: 'arg1',
        type: {
          names: [ref1]
        }
      }, {
        name: 'arg2',
        type: {
          names: [ref2]
        }
      }
    ],
    returns: [
      {
        type: {
          names: [ref3]
        }
      }
    ]
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), 'foo.bar(arg1, arg2) -> ' + lnk3.publish());
  test.done();
};


exports.testPublishWithParamAndReturn = function(test) {
  var ref1 = 'string';
  var ref2 = 'boolean';
  var lnk1 = new Link(ref1);
  var lnk2 = new Link(ref2);

  var dummyDoclet = {
    longname: 'foo.bar',
    params: [
      {
        name: 'arg1',
        type: {
          names: [ref1]
        }
      }
    ],
    returns: [
      {
        type: {
          names: [ref2]
        }
      }
    ]
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), 'foo.bar(arg1) -> ' + lnk2.publish());
  test.done();
};


exports.testPublishWithReturn = function(test) {
  var ref = 'number';
  var lnk = new Link(ref);

  var dummyDoclet = {
    longname: 'foo.bar',
    params: [],
    returns: [
      {
        type: {
          names: [ref]
        }
      }
    ]
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), 'foo.bar() -> ' + lnk.publish());
  test.done();
};


exports.testPublishWithParam = function(test) {
  var ref = 'string';

  var dummyDoclet = {
    longname: 'foo.bar',
    params: [
      {
        name: 'arg1',
        type: {
          names: [ref]
        }
      }
    ],
    returns: []
  };

  var digest = new FunctionDigest(dummyDoclet);
  test.equal(digest.publish(), 'foo.bar(arg1)');
  test.done();
};
