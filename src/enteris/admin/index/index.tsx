import '@utils/polyfill/assign';

/**
 * 模块入口
 * 可以在这里进行用户的权限校验
 * 1. 是否登录，未登录跳转登录页面
 * 2. 登录的用户获取到其用户权限，根据权限控制页面展示
 */
import React from 'react';
import ReactDOM from 'react-dom';

// redux 相关资源
import store from './store';
import { Provider } from 'react-redux';

import { HashRouter } from 'react-router-dom';

// router 页面路由
import Routes from './router';

import './index.less';
const renderPage = (MyProject) => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <MyProject />
      </HashRouter>
    </Provider>,
    document.getElementById('website-root-node')
  );
};

// ToDo 发请求校验登录

// 获取到用户权限， 开启渲染
renderPage(Routes);
