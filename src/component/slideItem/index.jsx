import React from 'react';

import './style.less';

class SlideItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handleTouchStart = (e) => {
    console.log(e.type);
    if (e.type === 'touchstart') {
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    } else {
      this.startX = e.clientX;
      this.startY = e.clientY;
    }
    console.log(this.startX, this.startY);
  };

  handleTouchMove = (e) => {
    // 若想阻止冒泡且最外层盒子为scrollView，不可用e.stopPropogagation()，否则页面卡死
    if (e.type === 'touchmove') {
      this.currentX = e.touches[0].pageX;
      this.moveX = this.currentX - this.startX;
      this.moveY = e.touches[0].pageY - this.startY;
    } else {
      this.currentX = e.clientX;
      this.moveX = this.currentX - this.startX;
      this.moveY = e.clientY - this.startY;
    }
    // 纵向移动时return
    if (Math.abs(this.moveY) > Math.abs(this.moveX)) {
      return;
    }
    // 滑动超过一定距离时，才触发
    if (Math.abs(this.moveX) < 20 || this.startX === undefined) {
      return;
    }
    const distance = this.moveX >= 0 ? 0 : -70;
    this.setState({
      moveStyle: {
        transform: `translateX(${distance}px)`,
      },
    });
  };
  handleMouseUp = (e) => {
    this.startX = undefined;
  };
  back = () => {
    this.setState({
      moveStyle: {
        transform: `translateX(0px)`,
      },
    });
  };

  render() {
    let { moveStyle } = this.state;

    return (
      <React.Fragment>
        <div className="slide-item-wrap">
          <div
            className="slide-item-children"
            style={moveStyle}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onMouseDown={this.handleTouchStart}
            onMouseMove={this.handleTouchMove}
            onMouseUp={this.handleMouseUp}
          >
            {this.props.children}
          </div>
          <div
            className="delete-btn"
            onClick={() => this.props.onDelete()}
            onMouseDown={this.back}
          >
            拉黑
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SlideItem;
