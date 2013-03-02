// This script licensed under the MIT.
// http://orgachem.mit-license.org



var jsdocref = require('../../jsdocref');
var env = require('../outputMode');


/**
 * Namespace for registry for contents and publishers.
 * @namespace
 */
var registry = exports;


/**
 * @type {Object.<jsdocref.outputMode.OutputMode, Object.<number,
 * jsdocref.publishing.ContentPublisher>>}
 * @private
 */
registry.publisherMap_ = {};


/**
 * Sets a publisher by a content and an outputMode conditon.
 * @param {jsdocref.publishing.Content} content Content.
 * @param {jsdocref.publishing.ContentPublisher} publisher Publisher for the
 *     content.
 * @param {jsdocref.outputMode.OutputMode} env Output mode
 *     condition.
 */
registry.setPublisher = function(content, publisher, env) {
  var uid = jsdocref.getUid(content);

  if (!registry.publisherMap_[env]) {
    registry.publisherMap_[env] = {};
  }

  registry.publisherMap_[env][uid] = publisher;
};


/**
 * Returns a content publisher by a content.
 *
 * @param {jsdocref.publishing.Content} content Content.
 * @param {!jsdocref.outputMode.OutputMode=} opt_env Optional outputMode
 *     type.  Use {@link jsdocref.outputMode.OUTPUT_MODE} if {@code opt_env} is
 *     falsey.
 */
registry.getPublisher = function(content, opt_env) {
  var envType = opt_env || env.OUTPUT_MODE;
  var uid = jsdocref.getUid(content);
  return registry.publisherMap_[envType][uid];
};
