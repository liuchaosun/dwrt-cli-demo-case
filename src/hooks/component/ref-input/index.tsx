import React, { forwardRef, useImperativeHandle, useRef } from 'react';

/**
 * 本组件借助 forwardRef 将传入的 ref 透穿到内部
 * 组件内部创建了自己的 ref 然后由 useImperativeHandle 自定义一些事件
 * 外部调用自定义事件时，触发内部 ref 真实的事件调用
 *
 * useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
 * @param props
 * @param ref
 */
function FancyInput(props: any, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    fcs: () => {
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} {...props} />;
}

FancyInput = forwardRef(FancyInput);

export default FancyInput;
