interface VoidFunc {
  (): () => void;
}
export default function throttle(func: VoidFunc, wait = 0) {
  let previous = 0;
  return function () {
    const now = new Date().valueOf();
    /* eslint-disable-next-line */
    const context = this;
    /* eslint-disable-next-line */
    const args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}

// export function throttle(func, wait) {
//   let timeout = null;
//   return function () {
//     const context = this;
//     const args = arguments;
//     if (!timeout) {
//       func.apply(context, args);
//       timeout = setTimeout(() => {
//         clearTimeout(timeout);
//         timeout = null;
//       }, wait);
//     }
//   };
// }
