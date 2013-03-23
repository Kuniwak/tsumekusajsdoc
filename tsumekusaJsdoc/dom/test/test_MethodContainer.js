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
var TypePublisher = require(basePath + '/publishing/TypePublisher');
Type.publisher = new TypePublisher();


exports.testPublish = function(test) {
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
    '  1. Parameters',
    '      - child: [goog.ui.Component]',
    '        No description.',
    '',
    '      - opt_render: [boolean]|undefined',
    '        No description.'
  ];

  test.equal(container.publish(), CORRECT.join('\n'));
  test.done();
};
