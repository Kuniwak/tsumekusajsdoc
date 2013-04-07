// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');

var basePath = '../../lib';
var DocletWrapper = require(basePath + '/dom/DocletWrapper');
var InheritanceHierarchyChart = require(basePath +
    '/dom/InheritanceHierarchyChart');


exports.testPublish = function(test) {
  var dummyDoclet = new DocletWrapper({
    longname: 'Child',
    kind: 'class'
  });
  dummyDoclet.setAncestors([ 
      new DocletWrapper({
        longname: 'GrandParent',
        kind: 'interface'
      }),
      new DocletWrapper({
        longname: 'Parent',
        kind: 'class'
        })
  ]);

  var chart = new InheritanceHierarchyChart(dummyDoclet);

  var CORRECT = [
    '  Inheritance:',
    '    \\GrandParent\\ [interface]',
    '      v',
    '    \\Parent\\ [class]',
    '      v',
    '  * #Child# [class]'
  ].join('\n');

  test.equal(chart.publish(), CORRECT);
  test.done();
};
