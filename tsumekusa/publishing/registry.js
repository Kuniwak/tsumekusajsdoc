// This script licensed under the MIT.
// http://orgachem.mit-license.org



var tsumekusa = require('../../tsumekusa');
var env = require('../outputMode');


/**
 * Namespace for registry for contents and publishers.
 * @namespace
 */
var registry = exports;


/**
 * @type {Object.<tsumekusa.outputMode.OutputMode, Object.<number,
 * tsumekusa.publishing.ContentPublisher>>}
 * @private
 */
registry.publisherMap_ = {};


/**
 * Sets a publisher by a content and an outputMode conditon.
 * @param {tsumekusa.contents.Content} content Content.
 * @param {tsumekusa.publishing.ContentPublisher} publisher Publisher for the
 *     content.
 * @param {tsumekusa.outputMode.OutputMode} env Output mode
 *     condition.
 */
registry.setPublisher = function(content, publisher, env) {
  var uid = tsumekusa.getUid(content);

  if (!registry.publisherMap_[env]) {
    registry.publisherMap_[env] = {};
  }

  registry.publisherMap_[env][uid] = publisher;
};


/**
 * Returns a content publisher by a content.
 *
 * @param {tsumekusa.contents.Content} content Content.
 * @param {!tsumekusa.outputMode.OutputMode=} opt_env Optional outputMode
 *     type.  Use {@link tsumekusa.outputMode.OUTPUT_MODE} if {@code opt_env} is
 *     falsey.
 */
registry.getPublisher = function(content, opt_env) {
  var envType = opt_env || env.OUTPUT_MODE;
  var uid = tsumekusa.getUid(content);
  return registry.publisherMap_[envType][uid];
};
