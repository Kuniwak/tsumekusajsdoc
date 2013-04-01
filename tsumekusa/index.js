// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * Namespace for root.
 */
var tsumekusa = exports;


/**
 * Text width.
 * @const
 * @type {number}
 */
tsumekusa.TEXT_WIDTH = 78;


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * Usage:
 * <pre>
 * function ParentClass(a, b) { }
 * ParentClass.prototype.foo = function(a) { }
 *
 * function ChildClass(a, b, c) {
 *   this.superClass_.call(this, a, b, c);
 * }
 * tsumekusa.inherits(ChildClass, ParentClass);
 *
 * var child = new ChildClass('a', 'b', 'see');
 * child.foo(); // works
 * </pre>
 *
 * In addition, a superclass' implementation of a method can be invoked
 * as follows:
 *
 * <pre>
 * ChildClass.prototype.foo = function(a) {
 *   ChildClass.superClass_.foo.call(this, a);
 *   // other code
 * };
 * </pre>
 *
 * This method is a copy from
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}
 *
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 */
tsumekusa.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};


/**
 * Gets a unique ID for an object. This mutates the object so that further
 * calls with the same object as a parameter returns the same value. The unique
 * ID is guaranteed to be unique across the current session amongst objects that
 * are passed into {@code getUid}. There is no guarantee that the ID is unique
 * or consistent across sessions. It is unsafe to generate unique ID for
 * function prototypes.
 *
 * This method is a copy from
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {number} The unique ID for the object.
 */
tsumekusa.getUid = function(obj) {
  // TODO(arv): Make the type stricter, do not accept null.

  // In Opera window.hasOwnProperty exists but always returns false so we avoid
  // using it. As a consequence the unique ID generated for BaseClass.prototype
  // and SubClass.prototype will be the same.
  return obj[tsumekusa.UID_PROPERTY_] ||
      (obj[tsumekusa.UID_PROPERTY_] = ++tsumekusa.uidCounter_);
};


/**
 * Name for unique ID property. Initialized in a way to help avoid collisions
 * with other closure javascript on the same page.
 *
 * This property is a copy from
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}
 *
 * @type {string}
 * @private
 */
tsumekusa.UID_PROPERTY_ = 'tsumekusa_uid_' + ((Math.random() * 1e9) >>> 0);


/**
 * Counter for UID.
 *
 * This property is a copy from
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}
 *
 * @type {number}
 * @private
 */
tsumekusa.uidCounter_ = 0;


/**
 * Adds a {@code getInstance} static method that always return the same instance
 * object.
 *
 * This method is a copy from
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}
 *
 * @param {!Function} ctor The constructor for the class to add the static
 *     method to.
 */
tsumekusa.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    return ctor.instance_ = new ctor;
  };
};


/**
 * When defining a class Foo with an abstract method bar(), you can do:
 *
 * Foo.prototype.bar = tsumekusa.abstractMethod
 *
 * Now if a subclass of Foo fails to override bar(), an error
 * will be thrown when bar() is invoked.
 *
 * Note: This does not take the name of the function to override as
 * an argument because that would make it more difficult to obfuscate
 * our JavaScript code.
 *
 * This method is a copy from
 * {@link http://closure-library.googlecode.com/svn/docs/index.html}
 *
 *
 * @type {!Function}
 * @throws {Error} when invoked to indicate the method should be
 *   overridden.
 */
tsumekusa.abstractMethod = function() {
  throw Error('unimplemented abstract method');
};


/**
 * Whether warning messages are allowed.
 * @const
 * @type {boolean}
 */
tsumekusa.WARNING = true;


/**
 * Warning counter.
 * @type {number}
 * @private
 */
tsumekusa.warnCounter_ = 0;


/**
 * Raise a warning.
 * @param {string} msg Warning message.
 */
tsumekusa.warn = function(msg) {
  if (console.warn) {
    console.warn(msg);
  }
  else {
    console.log('Warning: ' + msg);
  }
  tsumekusa.warnCounter_++;
};
