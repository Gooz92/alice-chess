/**
 * @module isTypeUtils
 */

const isTypeUtils = module.exports = {

  /**
   * Checks if a value is object and not null
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isObject: value => value !== null && typeof value === 'object',

  /**
   * Checks if a value is plain object
   * e.g. object created with object literal or object contructor
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isPlainObject: value => isTypeUtils.isObject(value) && value.constructor.name === 'Object',

  /**
   * Checks if type of value is function
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isFunction: value => typeof value === 'function',

  /**
   * Checks if type of value is string
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isString: value => typeof value === 'string',

  /**
   * Checks if type of value is number
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isNumber: value => typeof value === 'number',

  /**
   * Checks if type of value is boolean
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isBoolean: value => typeof value === 'boolean',

  /**
   * Checks if type of value is undefined
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isUndefined: (value) => typeof value === 'undefined',

  /**
   * Checks if type of value is not undefined
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isDefined: value => typeof value !== 'undefined',

  /**
   * Checks if a value is null or undefined
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isNill: value => value === null || isTypeUtils.isUndefined(value),

  /**
   * Check if a value is not null and not undefined
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isNotNill: value => value !== null && isTypeUtils.isDefined(value)
};
