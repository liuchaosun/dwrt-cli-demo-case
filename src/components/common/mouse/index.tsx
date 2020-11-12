import React, { Component } from 'react';

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event: any): void {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }

  render(): React.ReactElement {
    const { children } = this.props;
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/*
          使用 `render`prop 动态决定要渲染的内容，
          而不是给出一个 <Mouse> 渲染结果的静态表示
        */}
        {children && children(this.state)}
      </div>
    );
  }
}

export default Mouse;
