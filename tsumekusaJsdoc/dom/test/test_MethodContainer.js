// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var registry = require(tsumekusaPath + '/publishing/registry');
var publishers = require(tsumekusaPath + '/publishing/DefaultPublishers');

registry.registerElementPublishers(publishers);

var basePath = '../../../tsumekusaJsdoc';
var MethodContainer = require(basePath + '/dom/MethodContainer');
var Type = require(basePath + '/dom/Type');


exports.testPublishWithParams = function(test) {
// Dummy doclet {{{
  var dummyDoclet = {
    "description": "Adds the specified component as the last child of this component.  See\n{@link goog.ui.Component#addChildAt} for detailed semantics.",
    "params": [
      {
        "type": {
          "names": [
            "goog.ui.Component"
          ]
        },
        "optional": null,
        "nullable": null,
        "variable": null,
        "defaultvalue": undefined,
        "description": "The new child component.",
        "name": "child"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "optional": true,
        "nullable": null,
        "variable": null,
        "defaultvalue": undefined,
        "description": "If true, the child component will be rendered\n   into the parent.",
        "name": "opt_render"
      }
    ],
    "name": "addChild",
    "kind": "function",
    "memberof": "goog.ui.Component",
    "longname": "goog.ui.Component#addChild",
    "scope": "instance",
  };
//}}}

  var container = new MethodContainer(dummyDoclet);

  var CORRECT = [
    '0. goog.ui.Component#addChild',
    '  goog.ui.Component#addChild(child, opt_render)',
    '',
    '  Adds the specified component as the last child of this component. See',
    '  [goog.ui.Component#addChildAt] for detailed semantics.',
    '',
    '  Parameters',
    '    child: [goog.ui.Component]',
    '      No description.',
    '',
    '    opt_render: `boolean`|`undefined`',
    '      No description.'
  ].join('\n');

  test.equal(container.publish(), CORRECT);
  test.done();
};


exports.testPublishWithParamAndReturn = function(test) {
  // Dummy doclet {{{
  var dummyDoclet = {
    "comment": "/**\n * Helper function for returning an element in the document with a unique id\n * generated using makeId().\n * @param {string} idFragment The partial id.\n * @return {Element} The element with the unique id, or null if it cannot be\n *   found.\n */",
    "meta": {
      "range": [
        26969,
        27189
      ],
      "filename": "component.js",
      "lineno": 904,
      "path": "google-closure-library/closure/goog/ui",
      "code": {
        "id": "astnode2029664727",
        "name": "goog.ui.Component.prototype.getElementByFragment",
        "type": "FUNCTION",
        "node": "<Object>",
        "value": "FUNCTION",
        "paramnames": [
          "idFragment"
        ]
      }
    },
    "description": "Helper function for returning an element in the document with a unique id\ngenerated using makeId().",
    "params": [
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "optional": null,
        "nullable": null,
        "variable": null,
        "defaultvalue": undefined,
        "description": "The partial id.",
        "name": "idFragment"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Element"
          ]
        },
        "optional": null,
        "nullable": null,
        "variable": null,
        "defaultvalue": undefined,
        "description": "The element with the unique id, or null if it cannot be\n  found."
      }
    ],
    "name": "getElementByFragment",
    "kind": "function",
    "memberof": "goog.ui.Component",
    "longname": "goog.ui.Component#getElementByFragment",
    "scope": "instance",
    "___id": "T000002R000110",
    "___s": true
  };
  //}}}

  var container = new MethodContainer(dummyDoclet);

  var CORRECT = [
    '0. goog.ui.Component#getElementByFragment',
    '  goog.ui.Component#getElementByFragment(idFragment) -> `Element`',
    '',
    '  Helper function for returning an element in the document with a unique id',
    '  generated using makeId().',
    '',
    '  Parameters',
    '    idFragment: `string`',
    '      No description.',
    '',
    '  Returns',
    '    `Element`',
    '      No description.'
  ].join('\n');

  test.equal(container.publish(), CORRECT);
  test.done();
};


exports.testPublishWithNoParamsAndNoReturns = function(test) {
// Dummy doclet {{{
  var dummyDoclet = {
    "comment": "/**\n * Creates the initial DOM representation for the component. The default\n * implementation is to set this.element_ = div.\n */",
    "meta": {
      "range": [
        18304,
        18408
      ],
      "filename": "component.js",
      "lineno": 615,
      "path": "google-closure-library/closure/goog/ui",
      "code": {
        "id": "astnode1708966563",
        "name": "goog.ui.Component.prototype.createDom",
        "type": "FUNCTION",
        "node": "<Object>",
        "value": "FUNCTION",
        "paramnames": [
        ]
      }
    },
    "description": "Creates the initial DOM representation for the component. The default\nimplementation is to set this.element_ = div.",
    "name": "createDom",
    "kind": "function",
    "memberof": "goog.ui.Component",
    "longname": "goog.ui.Component#createDom",
    "scope": "instance",
    "___id": "T000002R000079",
    "___s": true
  };
  //}}}

  var container = new MethodContainer(dummyDoclet);

  var CORRECT = [
    '0. goog.ui.Component#createDom',
    '  goog.ui.Component#createDom()',
    '',
    '  Creates the initial DOM representation for the component. The default',
    '  implementation is to set this.element_ = div.'
  ].join('\n');

  test.equal(container.publish(), CORRECT);
  test.done();
};
