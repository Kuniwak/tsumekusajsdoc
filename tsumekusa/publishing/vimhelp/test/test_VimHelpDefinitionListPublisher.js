// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../../tsumekusa';
var DefinitionList = require(basePath + '/dom/DefinitionList');
var Paragraph = require(basePath + '/dom/Paragraph');
var ElementArray = require(basePath + '/dom/ElementArray');

var registry = require(basePath + '/publishing/registry');
var vimhelpPublishers = require(basePath +
    '/publishing/vimhelp/VimHelpPublishers');

registry.registerElementPublishers(vimhelpPublishers);

exports.testPublishWithVariableMarkers = function(test) {
  var defList = new DefinitionList();

  var term1 = new Paragraph('Term1');
  var descs1 = new ElementArray();
  descs1.addChild(new Paragraph('Desc1-1'));
  descs1.addChild(new Paragraph('Desc1-2'));
  defList.addDefinition(term1, descs1);

  var term2 = new Paragraph('Term2');
  var descs2 = new ElementArray();
  descs2.addChild(new Paragraph('Desc2-1'));
  descs2.addChild(new Paragraph('Desc2-2'));
  defList.addDefinition(term2, descs2, DefinitionList.ListType.ORDERED);

  var term3 = new Paragraph('Term3');
  var descs3 = new ElementArray();
  descs3.addChild(new Paragraph('Desc3-1'));
  descs3.addChild(new Paragraph('Desc3-2'));
  defList.addDefinition(term3, descs3, DefinitionList.ListType.UNORDERED);

  var CORRECT = [
    'Term1',
    '  Desc1-1',
    '',
    '  Desc1-2',
    '',
    '2) Term2',
    '  Desc2-1',
    '',
    '  Desc2-2',
    '',
    '- Term3',
    '  Desc3-1',
    '',
    '  Desc3-2'
  ].join('\n');

  test.equal(defList.publish(), CORRECT);

  test.done();
};


exports.testPublishWithNoMerker = function(test) {
  var defList = new DefinitionList();

  var term1 = new Paragraph('Term1');
  var descs1 = new ElementArray();
  descs1.addChild(new Paragraph('Desc1-1'));
  descs1.addChild(new Paragraph('Desc1-2'));
  defList.addDefinition(term1, descs1);

  var term2 = new Paragraph('Term2');
  var descs2 = new ElementArray();
  descs2.addChild(new Paragraph('Desc2-1'));
  descs2.addChild(new Paragraph('Desc2-2'));
  defList.addDefinition(term2, descs2);

  var term3 = new Paragraph('Term3');
  var descs3 = new ElementArray();
  descs3.addChild(new Paragraph('Desc3-1'));
  descs3.addChild(new Paragraph('Desc3-2'));
  defList.addDefinition(term3, descs3);

  var CORRECT = [
    'Term1',
    '  Desc1-1',
    '',
    '  Desc1-2',
    '',
    'Term2',
    '  Desc2-1',
    '',
    '  Desc2-2',
    '',
    'Term3',
    '  Desc3-1',
    '',
    '  Desc3-2'
  ].join('\n');

  test.equal(defList.publish(), CORRECT);

  test.done();
};


exports.testPublishWithOrdered = function(test) {
  var defList = new DefinitionList(DefinitionList.ListType.ORDERED);

  var term1 = new Paragraph('Term1');
  var descs1 = new ElementArray();
  descs1.addChild(new Paragraph('Desc1-1'));
  descs1.addChild(new Paragraph('Desc1-2'));
  defList.addDefinition(term1, descs1);

  var term2 = new Paragraph('Term2');
  var descs2 = new ElementArray();
  descs2.addChild(new Paragraph('Desc2-1'));
  descs2.addChild(new Paragraph('Desc2-2'));
  defList.addDefinition(term2, descs2);

  var term3 = new Paragraph('Term3');
  var descs3 = new ElementArray();
  descs3.addChild(new Paragraph('Desc3-1'));
  descs3.addChild(new Paragraph('Desc3-2'));
  defList.addDefinition(term3, descs3);

  var CORRECT = [
    '1) Term1',
    '  Desc1-1',
    '',
    '  Desc1-2',
    '',
    '2) Term2',
    '  Desc2-1',
    '',
    '  Desc2-2',
    '',
    '3) Term3',
    '  Desc3-1',
    '',
    '  Desc3-2'
  ].join('\n');

  test.equal(defList.publish(), CORRECT);

  test.done();
};


exports.testPublishWithUnordered = function(test) {
  var defList = new DefinitionList(DefinitionList.ListType.UNORDERED);

  var term1 = new Paragraph('Term1');
  var descs1 = new ElementArray();
  descs1.addChild(new Paragraph('Desc1-1'));
  descs1.addChild(new Paragraph('Desc1-2'));
  defList.addDefinition(term1, descs1);

  var term2 = new Paragraph('Term2');
  var descs2 = new ElementArray();
  descs2.addChild(new Paragraph('Desc2-1'));
  descs2.addChild(new Paragraph('Desc2-2'));
  defList.addDefinition(term2, descs2);

  var term3 = new Paragraph('Term3');
  var descs3 = new ElementArray();
  descs3.addChild(new Paragraph('Desc3-1'));
  descs3.addChild(new Paragraph('Desc3-2'));
  defList.addDefinition(term3, descs3);

  var CORRECT = [
    '- Term1',
    '  Desc1-1',
    '',
    '  Desc1-2',
    '',
    '- Term2',
    '  Desc2-1',
    '',
    '  Desc2-2',
    '',
    '- Term3',
    '  Desc3-1',
    '',
    '  Desc3-2'
  ].join('\n');

  test.equal(defList.publish(), CORRECT);

  test.done();
};


exports.testPublishNested = function(test) {
  var defList1 = new DefinitionList(DefinitionList.ListType.UNORDERED);
  var defList2 = new DefinitionList(DefinitionList.ListType.UNORDERED);

  var term1 = new Paragraph('Term1');
  var term2 = new Paragraph('Term2');
  var descs1 = new ElementArray();
  var descs2 = new ElementArray();

  descs1.addChild(new Paragraph('Desc1-1'));
  descs1.addChild(new Paragraph('Desc1-2'));
  descs1.addChild(defList2);

  descs2.addChild(new Paragraph('Desc2-1'));
  descs2.addChild(new Paragraph('Desc2-2'));

  defList1.addDefinition(term1, descs1);
  defList2.addDefinition(term2, descs2);

  var CORRECT = [
    '- Term1',
    '  Desc1-1',
    '',
    '  Desc1-2',
    '',
    '  - Term2',
    '    Desc2-1',
    '',
    '    Desc2-2'
  ].join('\n');

  test.equal(defList1.publish(), CORRECT);
  test.done();
};
