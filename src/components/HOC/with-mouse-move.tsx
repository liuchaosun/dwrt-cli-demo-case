import { Component } from 'react';
import { Component } from 'react';
import Mouse from '@components/common/mouse';

export default function WithMouseMove(WrapComponent) {
  return class extends Component {
    render() {
      return (
        <Mouse {...this.props}>
          <WrapComponent />
        </Mouse>
      );
    }
  };
}
