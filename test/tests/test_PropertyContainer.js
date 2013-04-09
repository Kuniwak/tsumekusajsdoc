// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');

var basePath = '../../lib';
var PropertyContainer = require(basePath + '/dom/PropertyContainer');
var Type = require(basePath + '/dom/Type');


module.exports = {
  'Publish': function(test) {
    // Dummy doclet {{{
    var dummyDoclet = {
      "comment": "/**\n * The DOM element for the component.\n * @type {Element}\n * @private\n */",
      "meta": {
        "range": [
          10190,
          10233
        ],
        "filename": "component.js",
        "lineno": 354,
        "path": "google-closure-library/closure/goog/ui",
        "code": {
          "id": "astnode532405576",
          "name": "goog.ui.Component.prototype.element_",
          "type": "NULL",
          "node": "<Object>",
          "value": "NULL"
        }
      },
      "description": "The DOM element for the component.",
      "type": {
        "names": [
          "Element"
        ],
        original: 'Element'
      },
      "access": "private",
      "name": "element_",
      "kind": "member",
      "memberof": "goog.ui.Component",
      "longname": "goog.ui.Component#element_",
      "scope": "instance",
      "___id": "T000002R000053",
      "___s": true
    };
    //}}}

   var container = new PropertyContainer(dummyDoclet);

    var CORRECT = [
      '0. goog.ui.Component#element_',
      '  `goog.ui.Component#element_`: `Element`',
      '',
      '  The DOM element for the component.'
    ].join('\n');

    test.equal(container.publish(), CORRECT);
    test.done();
  }
};
