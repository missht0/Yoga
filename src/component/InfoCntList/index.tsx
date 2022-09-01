import './index.less';
import { Row, Col } from 'antd';
import moment from 'moment';
import { Key } from 'react';
import SlideItem from '../slideItem';
import SlideBack from '../slideBack';

const InfoCntList = (props: InfoCntListProps) => {
  return (
    <div className="m-cnt-list">
      {props.s_info.map((item: any, index: Key) => {
        if (
          //教师登录缺席
          item.default === false &&
          props.m_item.s_time < moment() &&
          localStorage.getItem('u_id') != null &&
          localStorage.getItem('is_teacher') === '1'
        ) {
          return (
            <SlideItem
              key={index}
              children={
                <Row
                  className={
                    props.m_item.s_time.format('YYYY-MM-DD') === item.signup
                      ? 'today '
                      : ''
                  }
                >
                  <Col span={6}>{item.u_name}</Col>
                  <Col span={12}>
                    {moment(item.signup).format('MM-DD HH:mm')}
                  </Col>
                  <Col span={6}>
                    {props.m_item.s_time.format('YYYY-MM-DD') === item.signup
                      ? props.l_price
                      : props.s_price}
                  </Col>
                </Row>
              }
              onDelete={props.onDelete(item)}
            />
          );
        } else if (
          //教师登录未缺席
          item.default === true &&
          props.m_item.s_time < moment() &&
          localStorage.getItem('u_id') != null &&
          localStorage.getItem('is_teacher') === '1'
        ) {
          return (
            <SlideBack
              key={index}
              children={
                <Row
                  className={
                    (props.m_item.s_time.format('YYYY-MM-DD') === item.signup
                      ? 'today '
                      : '') + 'default'
                  }
                >
                  <Col span={6}>{item.u_name}</Col>
                  <Col span={12}>
                    {moment(item.signup).format('MM-DD HH:mm')}
                  </Col>
                  <Col span={6}>
                    {props.m_item.s_time.format('YYYY-MM-DD') === item.signup
                      ? props.l_price
                      : props.s_price}
                  </Col>
                </Row>
              }
              onBack={props.onBack(item)}
            />
          );
        } else {
          //非教师登录
          return (
            <Row
              key={index}
              className={
                (props.m_item.s_time.format('YYYY-MM-DD') === item.signup
                  ? 'today '
                  : '') + (item.default ? 'default' : '')
              }
            >
              <Col span={6}>{item.u_name}</Col>
              <Col span={12}>{moment(item.signup).format('MM-DD HH:mm')}</Col>
              <Col span={6}>
                {props.m_item.s_time.format('YYYY-MM-DD') === item.signup
                  ? props.l_price
                  : props.s_price}
              </Col>
            </Row>
          );
        }
      })}
    </div>
  );
};

export interface InfoCntListProps {
  //暴露接口
  s_info: any;
  m_item: any;
  onDelete: any;
  onBack: any;
  s_price: any;
  l_price: any;
}
export default InfoCntList;
