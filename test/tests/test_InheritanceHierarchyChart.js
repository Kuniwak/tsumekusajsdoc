// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');

var basePath = '../../lib';
var DocletWrapper = require(basePath + '/dom/DocletWrapper');
var InheritanceHierarchyChart = require(basePath +
    '/dom/InheritanceHierarchyChart');


module.exports = {
  'Publish': function(test) {
    var dummyDoclet = new DocletWrapper({
      longname: 'Child',
      kind: 'class'
    });
    dummyDoclet.setAncestors([ 
      'GrandParent',
      'Parent'
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
  }
};
