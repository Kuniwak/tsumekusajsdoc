// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var List = require(basePath + '/dom/List');
var ListItem = List.ListItem;
var Paragraph = require(basePath + '/dom/Paragraph');
var ContentArray = require(basePath + '/dom/ContentArray');
var ParagraphPublisher = require(basePath + '/publishing/ParagraphPublisher');
var ListPublisher = require(basePath + '/publishing/ListPublisher');
var ListItemPublisher = require(basePath + '/publishing/ListItemPublisher');

Paragraph.publisher = new ParagraphPublisher();
List.publisher = new ListPublisher();
ListItem.publisher = new ListItemPublisher();

exports.testPublish = function(test) {
  var list1 = new List();
  var list2 = new List();
  var list3 = new List();

  var arr1 = new ContentArray();
  var arr2 = new ContentArray();
  var arr3 = new ContentArray();
  var arr4 = new ContentArray();

  var item1 = new List.ListItem(arr1);
  var item2 = new List.ListItem(arr2, List.ListType.ORDERED);
  var item3 = new List.ListItem(arr3, List.ListType.UNORDERED);
  var item4 = new List.ListItem(arr4, List.ListType.ORDERED);

  list1.addListItem(item1);
  list1.addListItem(list2);
  list2.addListItem(item2);
  list2.addListItem(list3);
  list3.addListItem(item3);
  list2.addListItem(item4);

  var p1 = new Paragraph('Item1');
  var p2 = new Paragraph('Item2');
  var p3 = new Paragraph('Item3');
  var p4 = new Paragraph('Item4');
  var p5 = new Paragraph('Item5');
  var p6 = new Paragraph('Item6');
  var p7 = new Paragraph('Item7');
  var p8 = new Paragraph('Item8');

  arr1.addChild(p1);
  arr1.addChild(p2);
  arr2.addChild(p3);
  arr2.addChild(p4);
  arr3.addChild(p5);
  arr3.addChild(p6);
  arr4.addChild(p7);
  arr4.addChild(p8);

  var CORRECT = [
    '  - Item1',
    '    Item2',
    '',
    '    1) Item3',
    '       Item4',
    '',
    '      - Item5',
    '        Item6',
    '',
    '    3) Item7',
    '       Item8'
  ].join('\n');

  test.equal(list1.publish(), CORRECT);
  test.done();
};
