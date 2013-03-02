// This script licensed under the MIT.
// http://orgachem.mit-license.org


var env = require('../environment');
var registry = require('./registry');
var VimHelpTagPublisher = require('./VimHelpeTagPublisher');
var HtmlTagPublisher = require('./HtmlTagPublisher');



/**
 * A class for tag contents.  Do not construct by the constructor.  Instead use
 * {@link jsdocref.publishing.TagFactory.createTag} to construct.
 * @param {string} id Reference ID string.
 * @constructor
 * @implements {jsdocref.publishing.Content}
 */
var Tag = function(id) {
  this.setReferenceId(id);
};


registry.setPublisher(Tag, new VimHelpTagPublisher(), env.EnvironmentType.VIM);
registry.setPublisher(Tag, new HtmlTagPublisher(), env.EnvironmentType.HTML);


/** @override */
Tag.prototype.publish = function() {
  var publisher = registry.getPublisher(this);
  return publisher.publish(this);
};


/**
 * Returns a context text.
 * @return {string} Context string.
 */
Tag.prototype.getReferenceId = function() {
  return this.contentText_;
};


/**
 * Sets a context text.  The method is chainable.
 * @param {string} id Reference ID string.
 * @return {jsdocref.publishing.Tag} This instance.
 */
Tag.prototype.setReferenceId = function(id) {
  this.refId_ = id;
  return this;
};


// Exports the constructor.
module.exports = Tag;
