/**
 * 路由页面生成器
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '@my-types/store.types';

import routerFilter from './route-filter';
import creatRoutes from '@/entries/_routes/first';

interface IProps {
  userPages: string[];
}

class LocalRoute extends Component<IProps> {
  render() {
    const routes = routerFilter(this.props.userPages);
    return <React.Fragment>{creatRoutes(routes)}</React.Fragment>;
  }
}

/**
 * 可以在这里接入用户的权限设定，根据不同的用户等级显示不同的内容
 * @param state
 */
function mapStateToProps(state: StoreState) {
  return {
    userPages: state.user.userPages,
  };
}

export default connect(mapStateToProps)(LocalRoute);
