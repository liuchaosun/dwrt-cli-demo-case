import React from 'react';
import PortalmodalHOC from './portal-modal';
import './index.less';

/**
 * 创建弹框组件组件函数，可以支持传送虚拟节点
 * @param isPortal 是否需要传送虚拟节点,默认 false
 * @param parentNode 开启传送模式时的目标 dom
 */
export default function CreatModal(isPortal = false, parentNode?: HTMLElement) {
  // modal 组件
  function modal(props) {
    const { showHeader = true, showFooter = true, children, closeModal } = props;
    const containerStyle = {};
    return (
      <div className="modal-container" style={{ ...containerStyle }}>
        {showHeader && (
          <div className="modal-header">
            <div>这里需要一个标题</div>
            <div onClick={closeModal}>这里是关闭按钮</div>
          </div>
        )}

        <div className="modal-body">{typeof children === 'function' ? children() : children}</div>

        {showFooter && (
          <div className="modal-footer">
            <div>按钮1</div>
            <div>按钮2</div>
          </div>
        )}
      </div>
    );
  }

  if (isPortal) {
    return PortalmodalHOC(parentNode)(modal);
  }

  return modal;
}
