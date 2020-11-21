import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { isValidHTMLElement } from '@utils/index';

/**
 * 接收一个合法的元素节点作为目标虚拟父节点
 * 不传则使用默认节点：document.body
 * @param parentNode
 */
export default function PortalmodalHOC(parentNode: HTMLElement | undefined): any {
  let modalContainer: HTMLElement = document.body;
  if (parentNode && isValidHTMLElement(parentNode)) {
    modalContainer = parentNode;
  }

  return function (WrappedComponent: any) {
    class Modal extends Component {
      modalDom: HTMLDivElement;
      constructor(props: any) {
        super(props);
        const modalDom = document.createElement('div');
        modalDom.className = 'dialog-modal-mask';
        this.modalDom = modalDom;
      }
      componentDidMount() {
        modalContainer && modalContainer.appendChild(this.modalDom);
      }
      componentWillUnmount() {
        modalContainer && modalContainer.removeChild(this.modalDom);
      }
      render() {
        return createPortal(<WrappedComponent {...this.props} />, this.modalDom);
      }
    }

    return Modal;
  };
}
