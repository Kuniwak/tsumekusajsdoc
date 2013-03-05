// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * A class for simple implemenation of elements.
 * @param {string} type Element type such as {@code DIV}.
 * @param {?boolean=} opt_unuseEndTag Whether an end tag is unnecessary.
 * @param {?string=} opt_content Optional content.
 * @constructor
 */
var Element = function(type, opt_unuseEndTag, opt_content) {
  this.type_ = type;
  this.endTag_ = !opt_unuseEndTag;
  this.setContent(opt_content || '');
  this.attrMap_ = new Element.AttributeMap();
};


/**
 * Return an element type.
 * @return {string} Element type.
 */
Element.prototype.getType = function() {
  return this.type_;
};


/**
 * Sets a content.  This method is chainable.
 * @param {string} content Content to set.
 * @return {tsumekusa.dom.Element} This instance.
 */
Element.prototype.setContent = function(content) {
  this.content_ = content;
  return this;
};


/**
 * Returns a content
 * @return {string} Content.
 */
Element.prototype.getContent = function() {
  return this.content_;
};


/**
 * Returns an attribute map.
 * @return {tsumekusa.dom.Element.AttributeMap} Attribute map.
 * @protected
 */
Element.prototype.getAttributeMap = function() {
  return this.attrMap_;
};


/**
 * Sets an attribute.  This method is chainable.
 * @param {string} key Attribute key.
 * @param {string} val Attribute value.
 * @return {tsumekusa.dom.Element} This instance.
 */
Element.prototype.setAttribute = function(key, val) {
  var attr = this.getAttributeMap().set(key, val);
  return this;
};


/**
 * Returns an attribute map.
 * @param {string} key Attribute key.
 * @return {string} Attribute value.
 */
Element.prototype.getAttribute = function(key) {
  return this.getAttributeMap().get(key);
};


/**
 * Returns a HTML style string.
 * @return {string} String in HTML style.
 */
Element.prototype.toString = function() {
  var type = this.getType();
  var res = '<' + type;

  if (this.getAttributeMap().getCount() > 0) {
    res += ' ' + this.getAttributeMap();
  }

  res += '>';

  if (this.endTag_) {
    res += this.getContent() + '</' + type + '>';
  }

  return res;
};



/**
 * A class for simple implementation of attribute maps.
 * @constructor
 */
Element.AttributeMap = function() {
  this.map_ = {};
  this.count_ = 0;
};


/**
 * Returns a count of attributes.
 * @return {number} Count of attributes.
 */
Element.AttributeMap.prototype.getCount = function() {
  return this.count_;
};


/**
 * Sets an attribute.
 * @param {string} key Attribute key.
 * @param {string} val Attribute value.
 */
Element.AttributeMap.prototype.set = function(key, val) {
  if (!this.contains(key)) {
    this.count_++;
  }
  this.map_[key] = val;
};


/**
 * Returns an attribute.
 * @param {string} key Attribute key to get value.
 * @return {string} Attribute value.
 */
Element.AttributeMap.prototype.get = function(key) {
  return this.map_[key];
};


/**
 * Whether the attribute is contained.
 * @param {string} key Attribute key to test.
 * @return {boolean} Whether the attribute is contained.
 */
Element.AttributeMap.prototype.contains = function(key) {
  return key in this.map_;
};


/**
 * Removes an attribute.
 * @param {string} key Attribute key to remove.
 * @return {boolean} Whether the attribute was removed.
 */
Element.AttributeMap.prototype.remove = function(key) {
  if (this.contains(key)) {
    this.count_--;
    delete this.map_[key];
    return true;
  }
  return false;
};


/**
 * Returns attributes string.  For example, if the map contains 2 keys are
 * {@code foo1} and {@code foo2}, and each values are {@code bar1} and {@code
 * bar2} then returns {@code 'foo1="bar1" foo2="bar2"'}.
 * @return {string} Attributes string.
 */
Element.AttributeMap.prototype.toString = function() {
  var i = 0;
  var vals = [];
  var val;

  for (var key in this.map_) {
    val = this.map_[key];
    if (val !== undefined && val !== null) {
      vals[i++] = key + '="' + val + '"';
    }
    else {
      vals[i++] = key;
    }
  }

  return vals.join(' ');
};


// Exports the constructor.
module.exports = Element;
