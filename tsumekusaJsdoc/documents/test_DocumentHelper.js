// This script licensed under the MIT.
// http://orgachem.mit-license.org


var DocumentHelper = require('./DocumentHelper');
var Paragraph = require('../../tsumekusa/contents/Paragraph');
var Sentence = require('../../tsumekusa/contents/Sentence');
var List = require('../../tsumekusa/contents/List');


exports.testParseInlineTags = function(test) {
  var VALIED_STRING_1 = 'abcdefghi {@some hoghogehoge} hogehoge.';
  var VALIED_STRING_2 = 'abcdefghi {@some\nhoghogehoge} hogehoge.';
  var VALIED_STRING_3 = 'abcd\neha. oergojser. og\nehoge.';

  var docHelper = new DocumentHelper();
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
  var docHelper = new DocumentHelper();
  test.equal(docHelper.resolveInlineLink('#foo', { memberof: 'abc' }),
      'abc#foo');
  test.equal(docHelper.resolveInlineLink('foo', { memberof: 'abc' }), 'foo');
  test.equal(docHelper.resolveInlineLink('foo#bar', { memberof: 'abc' }),
      'foo#bar');
  test.equal(docHelper.resolveInlineLink('#foo'), '#foo');
  test.equal(docHelper.resolveInlineLink('foo#bar'), 'foo#bar');
  test.done();
};


exports.testCreateParagraphs = function(test) {
  var docHelper = new DocumentHelper();
  var VALIED_STRING_1 = 'pretext\n<ul><li>line1<li>line2<li>line3</ul>\nposttext';
  var paragraphs = docHelper.createParagraphs(VALIED_STRING_1);
  test.equal(paragraphs.length, 3);

  var p1 = paragraphs[0];
  test.ok(p1 instanceof Paragraph);
  var s1 = p1.getSentences()[0];
  test.ok(s1 instanceof Sentence);
  test.equals(s1.getInlineContents().length, 1);
  var i1 = s1.getInlineContents()[0];
  test.equal(i1, 'pretext');

  var l1 = paragraphs[1];
  test.ok(l1 instanceof List);
  test.equal(l1.getListedContents().length, 3);
  var s2 = l1.getListedContents()[0];
  test.ok(s2 instanceof Sentence);
  test.equals(s2.getInlineContents().length, 1);
  var i2 = s2.getInlineContents()[0];
  test.equals(i2, 'line1');
  var s3 = l1.getListedContents()[1];
  test.ok(s2 instanceof Sentence);
  test.equals(s3.getInlineContents().length, 1);
  var i3 = s3.getInlineContents()[0];
  test.equals(i3, 'line2');
  var s4 = l1.getListedContents()[2];
  test.ok(s2 instanceof Sentence);
  test.equals(s4.getInlineContents().length, 1);
  var i4 = s4.getInlineContents()[0];
  test.equals(i4, 'line3');

  var p2 = paragraphs[2];
  test.ok(p2 instanceof Paragraph);
  var s5 = p2.getSentences()[0];
  test.ok(s1 instanceof Sentence);
  test.equals(s5.getInlineContents().length, 1);
  var i5 = s5.getInlineContents()[0];
  test.equal(i5, 'posttext');
  test.done();
};


exports.teste = function(test) {
  var docHelper = new DocumentHelper();

  var VALIED_STRING_1 = 'Adds the specified component as a child of this component at the given 0-based index.  Both {@code addChild} and {@code addChildAt} assume the following contract between parent and child components:  <ul>    <li>the child component\'s element must be a descendant of the parent        component\'s element, and    <li>the DOM state of the child component must be consistent with the DOM        state of the parent component (see {@code isInDocument}) in the        steady state -- the exception is to addChildAt(child, i, false) and        then immediately decorate/render the child.  </ul>  In particular, {@code parent.addChild(child)} will throw an error if the child component is already in the document, but the parent isn\'t.  Clients of this API may call {@code addChild} and {@code addChildAt} with {@code opt_render} set to true.  If {@code opt_render} is true, calling these methods will automatically render the child component\'s element into the parent component\'s element.  However, {@code parent.addChild(child, true)} will throw an error if:  <ul>    <li>the parent component has no DOM (i.e. {@code parent.getElement()} is        null), or    <li>the child component is already in the document, regardless of the        parent\'s DOM state.  </ul>  If {@code opt_render} is true and the parent component is not already in the document, {@code enterDocument} will not be called on this component at this point.  Finally, this method also throws an error if the new child already has a different parent, or the given index is out of bounds.';

  docHelper.createParagraphs(VALIED_STRING_1);

  test.done();
};
