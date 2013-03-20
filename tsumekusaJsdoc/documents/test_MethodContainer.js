// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/contents/Link');
var LinkPublisher = require(tsumekusaPath + '/publishing/LinkPublisher');
var Container = require(tsumekusaPath + '/contents/Container');
var ContainerPublisher = require(tsumekusaPath + '/publishing/ContainerPublisher');
var Paragraph = require(tsumekusaPath + '/contents/Paragraph');
var ParagraphPublisher = require(tsumekusaPath + '/publishing/ParagraphPublisher');
Link.publisher = new LinkPublisher();
Container.publisher = new ContainerPublisher();
Paragraph.publisher = new ParagraphPublisher();

var basePath = '../../tsumekusaJsdoc';
var MethodContainer = require(basePath + '/documents/MethodContainer');


exports.testPublish = function(test) {
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

  var container = new MethodContainer(dummyDoclet);

  console.log(container.publish());
  test.done();
};
