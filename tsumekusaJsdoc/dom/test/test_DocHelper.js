// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../../tsumekusa';
var basePath = '../../../tsumekusaJsdoc';

var DocHelper = require(basePath + '/dom/DocHelper');


var testParagraph = function(p, text, test) {
  test.ok(p !== undefined && p !== null);
  test.equal(typeof p.getInlineElements, 'function');
  test.equal(p.getInlineElements().length, 1);
  test.equal(p.getInlineElements()[0], text);
};

var testListItem = function(li, text, test) {
  test.ok(li !== undefined && li !== null);
  test.equal(typeof li.getBlockElements, 'function');
  test.equal(li.getBlockElements().getCount(), 1);
  testParagraph(li.getBlockElements().getChildAt(0), text, test);
};

exports.testParseInlineTags = function(test) {
  var VALIED_STRING_1 = 'abcdefghi {@some hoghogehoge} hogehoge.';
  var VALIED_STRING_2 = 'abcdefghi {@some\nhoghogehoge} hogehoge.';
  var VALIED_STRING_3 = 'abcd\neha. oergojser. og\nehoge.';

  var docHelper = new DocHelper();
  var arr1 = docHelper.parseInlineTags(VALIED_STRING_1);
  test.equal(arr1.length, 3);
  test.equal(arr1[0], 'abcdefghi');
  test.ok(!!arr1);
  test.equal(arr1[1].type, 'some');
  test.equal(arr1[1].content, 'hoghogehoge');
  test.equal(arr1[2], 'hogehoge.');

  var arr2 = docHelper.parseInlineTags(VALIED_STRING_2);
  test.equal(arr2.length, 3);
  test.equal(arr2[0], 'abcdefghi');
  test.ok(!!arr2);
  test.equal(arr2[1].type, 'some');
  test.equal(arr2[1].content, 'hoghogehoge');
  test.equal(arr2[2], 'hogehoge.');

  var arr3 = docHelper.parseInlineTags(VALIED_STRING_3);
  test.equal(arr3.length, 1);
  test.equal(arr3[0], 'abcd\neha. oergojser. og\nehoge.');

  test.done();
};


exports.testResolveInlineLink = function(test) {
  var docHelper = new DocHelper();
  test.equal(docHelper.resolveInlineLink('#foo', { memberof: 'abc' }),
      'abc#foo');
  test.equal(docHelper.resolveInlineLink('foo', { memberof: 'abc' }), 'foo');
  test.equal(docHelper.resolveInlineLink('foo#bar', { memberof: 'abc' }),
      'foo#bar');
  test.equal(docHelper.resolveInlineLink('#foo'), '#foo');
  test.equal(docHelper.resolveInlineLink('foo#bar'), 'foo#bar');
  test.done();
};


exports.testCreateBlocks = function(test) {
  var docHelper = new DocHelper();
  var VALIED_STRING_1 = 'pretext\n<ul><li>line1<li>line2<li>{@code line3}</ul>\nposttext';

  var blocks = docHelper.parseBlocks(VALIED_STRING_1);

  test.equal(blocks.length, 3);

  var p1 = blocks[0];
  testParagraph(p1, 'pretext', test);

  var ul = blocks[1];
  test.ok(ul !== undefined && ul !== null);
  test.equal(typeof ul.getListItems, 'function');
  test.equal(ul.getListItems().getCount(), 3);

  var li1 = ul.getListItems().getChildAt(0);
  testListItem(li1, 'line1', test);

  var li2 = ul.getListItems().getChildAt(1);
  testListItem(li2, 'line2', test);

  var li3 = ul.getListItems().getChildAt(2);
  test.ok(li3 !== undefined && li3 !== null);
  test.equal(typeof li3.getBlockElements, 'function');
  test.equal(li3.getBlockElements().getCount(), 1);

  var p2 = li3.getBlockElements().getChildAt(0);
  test.ok(p2 !== undefined && p2 !== null);
  test.equal(typeof p2.getInlineElements, 'function');
  test.equal(p2.getInlineElements().length, 1);

  var code = p2.getInlineElements()[0];
  test.ok(code !== undefined && code !== null);
  test.equal(typeof code.getCode, 'function');
  test.equal(code.getCode(), 'line3');

  var p3 = blocks[2];
  testParagraph(p3, 'posttext', test);

  test.done();
};


//exports.testCreateBlocks({done: function() {}, equal: function() {}, ok: function() {}});
