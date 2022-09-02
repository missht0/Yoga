import './index.less';
import { Row, Col } from 'antd';
import moment from 'moment';
import { Key } from 'react';
import { SlideItem, SlideBack, InfoItem } from '@/component';

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
                <InfoItem
                  item={item}
                  l_price={props.l_price}
                  s_price={props.s_price}
                  m_item={props.m_item}
                />
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
                <InfoItem
                  item={item}
                  l_price={props.l_price}
                  s_price={props.s_price}
                  m_item={props.m_item}
                />
              }
              onBack={props.onBack(item)}
            />
          );
        } else {
          //非教师登录
          return (
            <InfoItem
              item={item}
              l_price={props.l_price}
              s_price={props.s_price}
              m_item={props.m_item}
            />
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
