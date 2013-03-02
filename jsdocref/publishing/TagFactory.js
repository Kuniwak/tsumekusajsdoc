// This script licensed under the MIT.
// http://orgachem.mit-license.org


var Tag = require('./Tag');


/**
 * A tag factory.
 * @namespace
 */
var TagFactory = exports;


/**
 * Map of created tags.
 * @private
 */
TagFactory.tagMap_ = {};


/**
 * Creates a new tag.
 * @param {string} ref Reference tag ID.
 * @return {jsdocref.publishing.Tag}
 */
TagFactory.createTag = function(id) {
  TagFactory.registerId(id);
  return new Tag(id);
};


/**
 * Whether a tag has an ID is already registered.
 */
TagFactory.isRegisteredId = function(id) {
  return !!TagFactory.tagMap_[id];
};


/**
 * Registers a tag ID.
 * @param {string} ref Reference tag ID.
 */
TagFactory.registerId = function(id) {
  if (TagFactory.isExists(id)) {
    throw 'The tag is already registered: ' + id;
  }
  TagFactory.tagMap_[id] = true;
};
