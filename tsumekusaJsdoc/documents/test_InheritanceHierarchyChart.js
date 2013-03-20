// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/contents/Link');
var LinkPublisher = require(tsumekusaPath + '/publishing/LinkPublisher');
Link.publisher = new LinkPublisher();

var basePath = '../../tsumekusaJsdoc';
var DocletWrapper = require(basePath + '/documents/DocletWrapper');
var InheritanceHierarchyChart = require(basePath +
    '/documents/InheritanceHierarchyChart');


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
    '    GrandParent [interface]',
    '      v',
    '    Parent [class]',
    '      v',
    '  * Child [class]'
  ].join('\n');

  test.equal(chart.publish(), CORRECT);
  test.done();
};
