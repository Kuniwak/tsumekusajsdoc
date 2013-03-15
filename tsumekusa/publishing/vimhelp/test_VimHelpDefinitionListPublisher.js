// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../tsumekusa';
var DefinitionList = require(basePath + '/contents/DefinitionList');
var Paragraph = require(basePath + '/contents/Paragraph');
var ContentArray = require(basePath + '/contents/ContentArray');

var VimHelpDefinitionListPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpDefinitionListPublisher');
var VimHelpDefinitionPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpDefinitionPublisher');

DefinitionList.publisher = new VimHelpDefinitionListPublisher();
DefinitionList.Definition.publisher = new VimHelpDefinitionPublisher();

exports.testPublish = function(test) {
  var defList = new DefinitionList();

  var term1 = new Paragraph('Term1');
  var descs1 = new ContentArray();
  descs1.addChild(new Paragraph('Desc1-1'));
  descs1.addChild(new Paragraph('Desc1-2'));
  defList.addDefinition(term1, descs1);

  var term2 = new Paragraph('Term2');
  var descs2 = new ContentArray();
  descs2.addChild(new Paragraph('Desc2-1'));
  descs2.addChild(new Paragraph('Desc2-2'));
  defList.addDefinition(term2, descs2, DefinitionList.ListType.ORDERED);

  var term3 = new Paragraph('Term3');
  var descs3 = new ContentArray();
  descs3.addChild(new Paragraph('Desc3-1'));
  descs3.addChild(new Paragraph('Desc3-2'));
  defList.addDefinition(term3, descs3, DefinitionList.ListType.UNORDERED);

  var CORRECT = [
    '  Term1',
    '    Desc1-1',
    '    Desc1-2',
    '',
    '  1) Term2',
    '     Desc2-1',
    '     Desc2-2',
    '',
    '  - Term3',
    '    Desc3-1',
    '    Desc3-2'
  ].join('\n');

  test.equal(defList.publish(), CORRECT);

  // Check whether the publish method is unbang
  test.equal(defList.publish(), CORRECT);

  test.done();
};
