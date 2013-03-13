// This script licensed under the MIT.
// http://orgachem.mit-license.org

var DefinitionList = require('../../contents/DefinitionList');
var Paragraph = require('../../contents/Paragraph');
var ContentArray = require('../../contents/ContentArray');
var VimHelpDefinitionListPublisher = require('./VimHelpDefinitionListPublisher');
var publisher = VimHelpDefinitionListPublisher.getInstance();

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

  test.equal(publisher.publish(defList), '  Term1\n    Desc1-1\n    Desc1-2\n\n  1) Term2\n     Desc2-1\n     Desc2-2\n\n  - Term3\n    Desc3-1\n    Desc3-2');

  // Check whether the publish method is bang
  test.equal(publisher.publish(defList), '  Term1\n    Desc1-1\n    Desc1-2\n\n  1) Term2\n     Desc2-1\n     Desc2-2\n\n  - Term3\n    Desc3-1\n    Desc3-2');
  test.done();
};
