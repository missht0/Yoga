import React from 'react';

import './style.less';

class SlideItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handleTouchStart = (e) => {
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
  };

  handleTouchMove = (e) => {
    // 若想阻止冒泡且最外层盒子为scrollView，不可用e.stopPropogagation()，否则页面卡死
    this.currentX = e.touches[0].pageX;
    this.moveX = this.currentX - this.startX;
    this.moveY = e.touches[0].pageY - this.startY;
    // 纵向移动时return
    if (Math.abs(this.moveY) > Math.abs(this.moveX)) {
      return;
    }
    // 滑动超过一定距离时，才触发
    if (Math.abs(this.moveX) < 20) {
      return;
    }
    const distance = this.moveX >= 0 ? 0 : -70;
    this.setState({
      moveStyle: {
        transform: `translateX(${distance}px)`,
      },
    });
  };
  back = () => {
    console.log('back');
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
          >
            {this.props.children}
          </div>
          <div
            className="delete-btn"
            onClick={() => this.props.onDelete()}
            onMouseOverCapture={this.back}
          >
            拉黑
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SlideItem;
