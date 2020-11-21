/**
 * 根据 ASCII 值判断是否大写开头
 * 65 ==> A
 * 90 ==> Z
 * @param str 需要检查的字符串
 */
export const judegIsUppercaseStart = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  const code = str.charCodeAt(0);
  if (code < 65 || code > 90) {
    return false;
  }
  return true;
};

/**
 * 1. 是否存在
 * 2. 是否具有 cloneNode 方法--> 排除自定义对象
 * @param node
 */
export function isValidHTMLElement(node: HTMLElement): boolean {
  // 1
  if (!node) {
    return false;
  }
  try {
    const newNode = node.cloneNode();
    return newNode.nodeType === 1;
  } catch (error) {
    return false;
  }
}
// isValidHTMLElement('') ==> false
// isValidHTMLElement(null) ==> false
// isValidHTMLElement(undefined) ==> false
// isValidHTMLElement({ nodeType: 1} ) ==> false
// isValidHTMLElement(document.createTextNode('123')) ==> false
// isValidHTMLElement(document.createElement('div') ) ==> true
