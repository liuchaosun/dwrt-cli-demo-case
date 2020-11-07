import { isOverLength } from '@utils/string-util';

/**
 * 英文域名前缀的命名规则
 * 1. 只能使用英文字母（a\~z，不区分大小写）、数字（0\~9）以及连接符（-）。
 * 2. 连接符（-）不能连续出现、不能单独注册，也不能放在开头和结尾。
 * 3. 域名长度不超过63个字符。
 *
 * 所以需要做如下检查
 * 1. 检查是否包含 http:// 和 https:// (忽略大小写)
 * 2. 符合上面的域名规则
 * @param host 待检查域名
 */
export default function isValidHost(host: string): boolean {
  host = host.toLocaleLowerCase();
  // 1 检查协议
  if (host.startsWith('https://')) {
    host = host.slice(8);
  } else if (host.startsWith('http://')) {
    host = host.slice(7);
  } else {
    return false;
  }

  // 2 检查长度
  if (isOverLength(host, 63)) {
    return false;
  }

  // 3 检查规则
  // * 纯ip规则
  const ipReg = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  // * 域名规则
  const dnsReg = /^([0-9a-z]+[-]{0,1}[0-9a-z]+\.)+[a-z]{2,6}$/;
  return ipReg.test(host) || dnsReg.test(host);
}

/**
 * 'htp://.com'
 * 'http:123.456.com'
 * 'http://123.456.'
 * 'http://123.456.c'
 *
 * 'http://123.123.123.131'
 * 'http://123.456.com'
 * 'https://123.456.com'
 */
