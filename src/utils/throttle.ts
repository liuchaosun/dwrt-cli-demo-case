interface VoidFunc {
  (x?: any): () => void;
}
export default function throttle(func: VoidFunc, wait = 0) {
  let previous = 0;
  return function (...args: any[]) {
    const now = new Date().valueOf();
    if (now - previous > wait) {
      func.call(this, ...args);
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
