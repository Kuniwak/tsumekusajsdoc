// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../../tsumekusa/';
var tsumekusa = require(basePath);
var Container = require(basePath + '/dom/Container');
var Paragraph = require(basePath + '/dom/Paragraph');
var Document = require(basePath + '/dom/Document');
var VimHelpDocumentPublisher = require(basePath +
    '/publishing/vimhelp/VimHelpDocumentPublisher');

var registry = require(basePath + '/publishing/registry');
var vimhelpPublishers = require(basePath +
    '/publishing/vimhelp/VimHelpPublishers');

registry.registerElementPublishers(vimhelpPublishers);

// Lorem Ipsum {{{
var LOREM_IPSUM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel dolor nunc. Nam neque erat, dignissim eu ullamcorper id, pellentesque ut ante. Pellentesque sit amet viverra neque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur quam nisl, feugiat non vehicula ornare, porta id enim. Cras laoreet metus a massa varius porta. Donec metus justo, iaculis eget elementum at, gravida vitae ligula. Curabitur ac pellentesque lectus. Praesent vitae augue at nulla pulvinar varius a mattis tortor. Sed non orci at leo auctor cursus.',
  'Integer consequat lectus a est malesuada porta. Vivamus tincidunt, odio nec pellentesque tempus, diam tellus pulvinar odio, et condimentum magna tortor sit amet dolor. Nulla dignissim risus vitae felis mattis ut aliquam magna luctus. Sed tempus lobortis ligula, sit amet consequat lectus varius eu. Integer bibendum facilisis consequat. Curabitur interdum turpis et nibh iaculis vel dictum quam pretium. Pellentesque ac fringilla orci.',
  'In ut erat eu lorem dignissim dapibus. In pellentesque nulla vel mi tincidunt molestie sed nec tortor. Vivamus adipiscing magna ut urna tempus eget luctus dolor ullamcorper. Etiam cursus felis ut diam luctus eu tristique risus adipiscing. Phasellus purus urna, varius nec imperdiet eu, blandit at quam. Donec libero nulla, lobortis at dictum eget, porta et felis. Vestibulum a lectus diam. Sed ut mauris orci, in pulvinar velit. Nullam metus nulla, placerat id porta eget, sollicitudin sit amet tellus.',
  'Nullam tristique, mi non laoreet interdum, tellus felis accumsan metus, et pulvinar eros purus ut quam. Vestibulum convallis metus et metus pellentesque vulputate. Nam lacinia, nulla vel imperdiet pellentesque, felis magna ullamcorper leo, et imperdiet orci augue at sapien. Integer erat nisi, aliquet quis cursus at, varius quis metus. Aenean turpis lorem, pretium eu pellentesque sed, accumsan dictum dolor. Proin iaculis iaculis nisi porttitor sollicitudin. Phasellus sollicitudin vestibulum nulla, ac semper nisl mattis eget. Mauris eget augue sodales nulla semper pellentesque. Sed in turpis sit amet elit eleifend viverra. Aliquam cursus mauris libero, et sollicitudin ante. Cras cursus tincidunt lacus, a pellentesque leo pretium nec. Mauris eu tortor eu tortor lacinia laoreet quis ut lacus. Maecenas quis erat nec mi pharetra posuere et ac erat. Aliquam interdum lectus ut dolor volutpat tempor. Etiam vestibulum, dolor rhoncus tristique congue, neque mi ullamcorper dolor, posuere consequat metus ligula sit amet ante. Quisque non commodo dolor.',
  'Vivamus dapibus mauris ut lectus dapibus pellentesque. Maecenas congue pretium ipsum facilisis commodo. Suspendisse vitae arcu ut eros tincidunt aliquam sit amet a diam. Praesent fringilla rutrum volutpat. Nulla facilisi. Nunc auctor hendrerit ligula, quis fermentum erat consectetur at. Donec convallis, nisl at viverra molestie, nisi odio rutrum nibh, in ornare mi elit ac mauris. Donec sed lorem ipsum, sed iaculis leo. Nullam auctor lectus nec turpis pretium rhoncus. Donec diam diam, pellentesque eu vestibulum id, fringilla sed libero. Aliquam libero est, accumsan vel pharetra a, venenatis vel ante.'
];
//}}}

exports.testPublish = function(test) {
  VimHelpDocumentPublisher.prototype.getNow_ = function() {
    return new Date(0);
  };

  var document = new Document('Sample', 'doc.txt', 'ALPHA', new Date(0));

  var container1 = new Container('container1', null, true);
  var container2 = new Container('container2', null, true);
  var container3 = new Container('container3', null, true);
  var container4 = new Container('container4', null, true);

  var docSubContainer = document.getSubContainers();
  var subContainers1 = container1.getSubContainers();
  var subContainers2 = container2.getSubContainers();
  var subContainers3 = container3.getSubContainers();
  var subContainers4 = container4.getSubContainers();

  var docTopElements = document.getTopElements();
  var topElements1 = container1.getTopElements();
  var topElements2 = container2.getTopElements();
  var topElements3 = container3.getTopElements();
  var topElements4 = container4.getTopElements();

  docSubContainer.addChild(container1);
  subContainers1.addChild(container2);
  subContainers2.addChild(container3);
  docSubContainer.addChild(container4);

  var p1 = new Paragraph(LOREM_IPSUM[0]);
  var p2 = new Paragraph(LOREM_IPSUM[1]);
  var p3 = new Paragraph(LOREM_IPSUM[2]);
  var p4 = new Paragraph(LOREM_IPSUM[3]);
  var p5 = new Paragraph(LOREM_IPSUM[0]);
  var p6 = new Paragraph(LOREM_IPSUM[1]);

  docTopElements.addChild(p1);
  topElements1.addChild(p2);
  topElements1.addChild(p3);
  topElements2.addChild(p4);
  topElements3.addChild(p5);
  topElements4.addChild(p6);

  // Correct string{{{
  var CORRECT = [
    '*doc.txt*	Version ALPHA.  Last change: 1970 Jan 1',
    '',
    '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel dolor',
    '  nunc. Nam neque erat, dignissim eu ullamcorper id, pellentesque ut ante.',
    '  Pellentesque sit amet viverra neque. Cum sociis natoque penatibus et magnis',
    '  dis parturient montes, nascetur ridiculus mus. Curabitur quam nisl, feugiat',
    '  non vehicula ornare, porta id enim. Cras laoreet metus a massa varius porta.',
    '  Donec metus justo, iaculis eget elementum at, gravida vitae ligula.',
    '  Curabitur ac pellentesque lectus. Praesent vitae augue at nulla pulvinar',
    '  varius a mattis tortor. Sed non orci at leo auctor cursus.',
    '',
    '==============================================================================',
    '1. container1                                                     *container1*',
    '',
    '  Integer consequat lectus a est malesuada porta. Vivamus tincidunt, odio nec',
    '  pellentesque tempus, diam tellus pulvinar odio, et condimentum magna tortor',
    '  sit amet dolor. Nulla dignissim risus vitae felis mattis ut aliquam magna',
    '  luctus. Sed tempus lobortis ligula, sit amet consequat lectus varius eu.',
    '  Integer bibendum facilisis consequat. Curabitur interdum turpis et nibh',
    '  iaculis vel dictum quam pretium. Pellentesque ac fringilla orci.',
    '',
    '  In ut erat eu lorem dignissim dapibus. In pellentesque nulla vel mi',
    '  tincidunt molestie sed nec tortor. Vivamus adipiscing magna ut urna tempus',
    '  eget luctus dolor ullamcorper. Etiam cursus felis ut diam luctus eu',
    '  tristique risus adipiscing. Phasellus purus urna, varius nec imperdiet eu,',
    '  blandit at quam. Donec libero nulla, lobortis at dictum eget, porta et',
    '  felis. Vestibulum a lectus diam. Sed ut mauris orci, in pulvinar velit.',
    '  Nullam metus nulla, placerat id porta eget, sollicitudin sit amet tellus.',
    '',
    '------------------------------------------------------------------------------',
    '1.1 container2                                                    *container2*',
    '',
    '  Nullam tristique, mi non laoreet interdum, tellus felis accumsan metus, et',
    '  pulvinar eros purus ut quam. Vestibulum convallis metus et metus',
    '  pellentesque vulputate. Nam lacinia, nulla vel imperdiet pellentesque, felis',
    '  magna ullamcorper leo, et imperdiet orci augue at sapien. Integer erat nisi,',
    '  aliquet quis cursus at, varius quis metus. Aenean turpis lorem, pretium eu',
    '  pellentesque sed, accumsan dictum dolor. Proin iaculis iaculis nisi',
    '  porttitor sollicitudin. Phasellus sollicitudin vestibulum nulla, ac semper',
    '  nisl mattis eget. Mauris eget augue sodales nulla semper pellentesque. Sed',
    '  in turpis sit amet elit eleifend viverra. Aliquam cursus mauris libero, et',
    '  sollicitudin ante. Cras cursus tincidunt lacus, a pellentesque leo pretium',
    '  nec. Mauris eu tortor eu tortor lacinia laoreet quis ut lacus. Maecenas quis',
    '  erat nec mi pharetra posuere et ac erat. Aliquam interdum lectus ut dolor',
    '  volutpat tempor. Etiam vestibulum, dolor rhoncus tristique congue, neque mi',
    '  ullamcorper dolor, posuere consequat metus ligula sit amet ante. Quisque non',
    '  commodo dolor.',
    '',
    '1.1.1 container3                                                  *container3*',
    '',
    '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel dolor',
    '  nunc. Nam neque erat, dignissim eu ullamcorper id, pellentesque ut ante.',
    '  Pellentesque sit amet viverra neque. Cum sociis natoque penatibus et magnis',
    '  dis parturient montes, nascetur ridiculus mus. Curabitur quam nisl, feugiat',
    '  non vehicula ornare, porta id enim. Cras laoreet metus a massa varius porta.',
    '  Donec metus justo, iaculis eget elementum at, gravida vitae ligula.',
    '  Curabitur ac pellentesque lectus. Praesent vitae augue at nulla pulvinar',
    '  varius a mattis tortor. Sed non orci at leo auctor cursus.',
    '',
    '==============================================================================',
    '2. container4                                                     *container4*',
    '',
    '  Integer consequat lectus a est malesuada porta. Vivamus tincidunt, odio nec',
    '  pellentesque tempus, diam tellus pulvinar odio, et condimentum magna tortor',
    '  sit amet dolor. Nulla dignissim risus vitae felis mattis ut aliquam magna',
    '  luctus. Sed tempus lobortis ligula, sit amet consequat lectus varius eu.',
    '  Integer bibendum facilisis consequat. Curabitur interdum turpis et nibh',
    '  iaculis vel dictum quam pretium. Pellentesque ac fringilla orci.',
    '',
    '==============================================================================',
    '                        This document was generated by Tsumekusa on 1970 Jan 1',
    '                                         https://github.com/OrgaChem/Tsumekusa',
    '',
    'vim:tw=78:sw=4:ts=8:ft=help:norl:'
  ].join('\n');
  //}}}

  test.equal(document.publish(), CORRECT);
  test.done();
};
