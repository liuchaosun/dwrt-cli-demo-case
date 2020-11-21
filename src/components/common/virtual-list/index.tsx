import React, { Component, createRef, ReactElement } from 'react';
import './index.less';

export interface ListItem {
  key: string;
  value: string;
}

export interface InProps {
  itemSize: number;
  listData: ListItem[];
  virtualListHeight: number;
}

export interface VirtualListState {
  scrollTop: number;
  visiableCount: number;
}

// <InProps, VirtualListState> 第一个用来表示props的类型， 第二个用来表示state的类型
class VirtualList extends Component<InProps, VirtualListState> {
  static defaultProps: InProps;
  containerDom: HTMLDivElement | null;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: InProps) {
    super(props);
    this.state = {
      scrollTop: 0,
      visiableCount: 0,
    };
    this.containerDom = null;
    this.containerRef = createRef();
  }

  componentDidMount(): void {
    if (this.containerRef.current) {
      this.containerDom = this.containerRef.current;
      const visiableCount = Math.ceil(this.containerDom.clientHeight / this.props.itemSize) + 1;
      this.setState({
        visiableCount,
      });
    }
  }

  scrollEvent = (): void => {
    this.setState({
      scrollTop: this.containerDom ? this.containerDom.scrollTop : 0,
    });
  };

  calculateIndex = (): {
    endIndex: number;
    startIndex: number;
    scrollOffset: number;
  } => {
    const { listData, itemSize } = this.props;
    const { scrollTop, visiableCount } = this.state;
    const startIndex = Math.floor(scrollTop / itemSize);
    const endIndex = Math.min(startIndex + visiableCount, listData.length);
    const scrollOffset = scrollTop - (scrollTop % itemSize);

    return {
      endIndex,
      startIndex,
      scrollOffset,
    };
  };

  render(): ReactElement {
    const { listData, itemSize, virtualListHeight } = this.props;
    const { startIndex, endIndex, scrollOffset } = this.calculateIndex();

    return (
      <div
        className="virtual-list-container"
        style={{ height: virtualListHeight + 'px' }}
        ref={this.containerRef}
        onScroll={this.scrollEvent}>
        <div
          className="virtual-list-fullheight-block"
          style={{ height: listData.length * itemSize + 'px' }}></div>
        <ul
          className="virtual-list-ul"
          style={{
            transform: `translate3d(0px, ${scrollOffset}px, 0px)`,
          }}>
          {listData.slice(startIndex, endIndex).map((item) => (
            <li className="virtual-list-li" key={item.key} style={{ height: itemSize + 'px' }}>
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// defaultProps
VirtualList.defaultProps = {
  listData: [],
  itemSize: 50,
  virtualListHeight: 100,
};

export default VirtualList;
