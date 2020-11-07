/**
 * 检查是否字符串
 * @param params
 */
export const isValidString = (params: string): boolean => {
  return typeof params === 'string';
};
/**
 * isValidString(null) === false
 * isValidString(undefined) === false
 * isValidString(1) === false
 * isValidString({}) === false
 * isValidString([]) === false
 * isValidString('') === true
 * isValidString('123') === true
 */

/**
 * 字符串是否超出长度
 * @param str 待验证字符
 * @param max 长度限制
 */
export const isOverLength = (str: string, max: number): boolean => {
  return isValidString(str) && str.length > max;
};
/**
 * isOverLength(12345,5) === false
 * isOverLength('12345',5) === false
 * isOverLength('123456',5) === true
 */
