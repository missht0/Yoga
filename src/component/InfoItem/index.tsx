import './index.less';
import moment from 'moment';
import { Row, Col } from 'antd';

const InfoItem = (props: InfoItemProps) => {
  return (
    <Row
      className={
        (props.m_item.s_time.format('YYYY-MM-DD') === props.item.signup
          ? 'today'
          : '') + (props.item.default ? 'default' : '')
      }
    >
      <Col span={6}>{props.item.u_name}</Col>
      <Col span={12}>{moment(props.item.signup).format('MM-DD HH:mm')}</Col>
      <Col span={6}>
        {props.m_item.s_time.format('YYYY-MM-DD') === props.item.signup
          ? props.l_price
          : props.s_price}
      </Col>
    </Row>
  );
};

export interface InfoItemProps {
  //暴露接口
  item: any;
  l_price: any;
  s_price: any;
  m_item: any;
}
export default InfoItem;
