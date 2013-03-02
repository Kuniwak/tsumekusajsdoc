// This script licensed under the MIT.
// http://orgachem.mit-license.org



var jsdocref = require('../../jsdocref');
var env = require('../environment');


/**
 * Namespace for registry for contents and publishers.
 * @namespace
 */
var registry = exports;


/**
 * @type {Object.<jsdocref.environment.EnvironmentType, Object.<number,
 * jsdocref.publishing.ContentPublisher>>}
 * @private
 */
registry.publisherMap_ = {};


/**
 * Sets a publisher by a content and an environment conditon.
 * @param {jsdocref.publishing.Content} content Content.
 * @param {jsdocref.publishing.ContentPublisher} publisher Publisher for the
 *     content.
 * @param {jsdocref.environment.EnvironmentType} env Environment
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
 * @param {!jsdocref.environment.EnvironmentType=} opt_env Optional environment
 *     type.  Use {@link jsdocref.environment.ENVIRONMENT} if {@code opt_env} is
 *     falsey.
 */
registry.getPublisher = function(content, opt_env) {
  var envType = opt_env || env.ENVIRONMENT;
  var uid = jsdocref.getUid(content);
  return registry.publisherMap_[envType][uid];
};
