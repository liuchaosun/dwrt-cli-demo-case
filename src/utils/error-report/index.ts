interface CallBack {
  (): () => void;
}

/**
 * 向指定的路径发错错误信息
 * @param {接收报错信息的地址} target
 * @param {报错信息} msg
 */
export const ErrorReport = (target: string, msg: string, callback?: CallBack): void => {
  const img = new Image();
  img.src = target + '?msg=' + msg;
  img.onload = () => {
    callback && callback();
  };
};
