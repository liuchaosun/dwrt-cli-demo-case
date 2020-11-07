export default function debounce(func: any, delay: number, immediate: boolean): any {
  let timeout: any = null;

  return function (...args: []) {
    // 再次触发需要清除上一次的计时重新计算
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;
      if (callNow) {
        func(...args);
      }
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    } else {
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    }
  };
}
