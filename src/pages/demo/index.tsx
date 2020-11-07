import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '@my-types/store.types';
import { actionUpdateDemoMsg } from '@store/demo/action';

import { ErrorReport } from '@utils/index';

import './index.css';
/**
 * 采用泛型接口定义的方式约束组件中的内容，代替 Prop-types
 */
interface IndexProps {
  demoMesg: string;
  updateMsg: (x: string) => void;
}

class WebSiteIndex extends Component<IndexProps> {
  componentDidMount() {
    this.props.updateMsg('新的展示信息');
  }
  exp = () => {
    ErrorReport('http://1.com', encodeURIComponent('加载失败'));
  };
  render() {
    const { demoMesg } = this.props;
    return (
      <div style={{ height: '2000px' }}>
        {demoMesg}
        <div className="black">1</div>
        <button onClick={this.exp}>123</button>
      </div>
    );
  }
}
/**
 * 调用此函数， 注入一个 state 最终返回一个对象
 * 此对象会经过操作合并到 props 中并向下传递
 * @param state
 */
function mapStateToProps(state: StoreState): { demoMesg: string } {
  return {
    demoMesg: state.demo.demoMesg,
  };
}

/**
 * 调用此函数，注入一个 store.dispatch 作为参数 dispatch 最终返回一个 包含了若干个函数的对象
 * 此对象会经过操作合并到 props 中并向下传递
 * @param dispatch <=== store.dispatch
 */
function mapDispatchToProps(dispatch: Dispatch): { updateMsg: (x: string) => void } {
  return {
    updateMsg(str: string) {
      dispatch(actionUpdateDemoMsg(str));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WebSiteIndex);
