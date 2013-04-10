// Thwas script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Sample namespace.
 * @namespace
 */
var sampleNS = {};


/**
 * Sample static method has no params and no returns.
 */
sampleNS.staticMethod1 = function() {
};


/**
 * Sample static method has 1 param and no returns.
 * @param {string} param1 Parameter 1.
 */
sampleNS.staticMethod2 = function(param1) {
};


/**
 * Sample static method has 2 params and no returns.
 * @param {string} param1 Parameter 1.
 * @param {number} param2 Parameter 2.
 */
sampleNS.staticMethod3 = function(param1, param2) {
};


/**
 * Sample static method has no params and 1 return.
 * @return {?string} Return.
 */
sampleNS.staticMethod4 = function() {
  return null;
};


/**
 * Sample private static method.
 * @private
 */
sampleNS.staticMethod5_ = function() {
};


/**
 * Sample protected static method.
 * @protected
 */
sampleNS.staticMethod6 = function() {
};


/**
 * Sample deprecated static method.
 * @deprecated It was deprecated.
 */
sampleNS.staticMethod7 = function() {
};


/**
 * Sample static property.
 * @type {?string}
 */
sampleNS.staticProp1 = null;


/**
 * Sample static private property.
 * @type {?string}
 * @private
 */
sampleNS.staticProp2_ = null;


/**
 * Sample static protected property.
 * @type {?string}
 * @protected
 */
sampleNS.staticProp3 = null;


/**
 * Sample static deprecated property.
 * @type {?string}
 * @deprecated It was deprecated.
 */
sampleNS.staticProp4 = null;


/**
 * Sample static constant property.
 * @type {?string}
 * @const
 */
sampleNS.STATIC_PROP_5 = null;


/**
 * Sample static enumerable property.
 * @type {?string}
 * @enum
 */
sampleNS.StaticProp6 = {
  /** Sample value 1 in an enumerable. */
  VAL1: null,
  /** Sample value 2 in an enumerable. */
  VAL2: null,
  /** Sample value 3 in an enumerable. */
  VAL3: null
};



/**
 * Sample super class.
 * @constructor
 */
var SampleSuperClass = function() {};


/**
 * Sample instance method has no params and no returns.
 */
SampleSuperClass.prototype.instanceMethod1 = function() {
};


/**
 * Sample instance method has 1 param and no returns.
 * @param {string} param1 Parameter 1.
 */
SampleSuperClass.prototype.instanceMethod2 = function(param1) {
};


/**
 * Sample instance method has 2 params and no returns.
 * @param {string} param1 Parameter 1.
 * @param {number} param2 Parameter 2.
 */
SampleSuperClass.prototype.instanceMethod3 = function(param1, param2) {
};


/**
 * Sample instance method has no params and 1 return.
 * @return {?string} Return.
 */
SampleSuperClass.prototype.instanceMethod4 = function() {
  return null;
};


/**
 * Sample private instance method.
 * @private
 */
sampleSuperClass.prototype.instanceMethod5_ = function() {
};


/**
 * Sample protected instance method.
 * @protected
 */
sampleSuperClass.prototype.instanceMethod6 = function() {
};


/**
 * Sample deprecated instance method.
 * @deprecated It was deprecated.
 */
sampleSuperClass.prototype.instanceMethod7 = function() {
};


/**
 * Sample instance property.
 * @type {?string}
 */
SampleSuperClass.prototype.instanceProp1 = null;


/**
 * Sample instance private property.
 * @type {?string}
 * @private
 */
SampleSuperClass.prototype.instanceProp2_ = null;


/**
 * Sample instance protected property.
 * @type {?string}
 * @protected
 */
SampleSuperClass.prototype.instanceProp3 = null;


/**
 * Sample instance deprecated property.
 * @type {?string}
 * @deprecated It was deprecated.
 */
SampleSuperClass.prototype.instanceProp4 = null;


/**
 * Sample instance constant property.
 * @type {?string}
 * @const
 */
SampleSuperClass.prototype.INSTANCE_PROP_5 = null;



/**
 * Sample super class.
 * @constructor
 * @extends {SampleSuperClass}
 */
var SampleSubClass = function() {};


/** @override */
SampleSubClass.prototype.instanceMethod1 = function() {
};


/** @override */
SampleSubClass.prototype.instanceMethod2 = function(param1) {
};


/** @override */
SampleSubClass.prototype.instanceMethod3 = function(param1, param2) {
};


/** @override */
SampleSubClass.prototype.instanceMethod4 = function() {
  return null;
};


/** @override */
SampleSubClass.prototype.instanceMethod6 = function() {
};


/** @override */
SampleSubClass.prototype.instanceProp1 = null;


/** @override */
SampleSubClass.prototype.instanceProp3 = null;


/** @override */
SampleSubClass.prototype.INSTANCE_PROP_5 = null;
