import './index.less';
import React, { useEffect } from 'react';
import icon_yoga from '../../../public/img/class/瑜伽.svg';
import { useState } from 'react';
import { Alert, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import SlideItem from '../../component/slideItem';
import moment from 'moment';
import Api from '@/request/request';

const Information: React.FC = () => {
  const [m_item, setM_item] = useState({
    c_id: 1,
    c_name: '瑜伽',
    s_time: moment(),
    time_long: '18:30:00',
    place: '师生活动中心2-208',
    price: 400,
    num: 10,
  });
  // 从url中获得get传值
  const get = (name: string) => {
    // 从url中获得get传值
    let arg: any = new URLSearchParams(window.location.search).get(name);
    return arg;
  };
  m_item.c_id = get('c_id');
  m_item.c_name = get('c_name');
  m_item.s_time = moment(get('s_time'), 'YYYY-MM-DD HH:mm');
  m_item.time_long = get('time_long');
  m_item.place = get('place');
  m_item.price = get('price');
  m_item.num = get('num');
  let s_price = (
    m_item.num < 5 ? m_item.price / 5 : m_item.price / m_item.num
  ).toFixed(2);
  let l_price = (
    m_item.num < 5
      ? (m_item.price / 5) * 1.5
      : (m_item.price / m_item.num) * 1.5
  ).toFixed(2);
  console.log(m_item);

  const [s_info, setS_info] = useState([
    {
      c_id: 1,
      c_name: '瑜伽',
      id: 4,
      pay: 0,
      signup: '08-06 10:00',
      u_id: '2020212205248',
      u_name: 'lcy4',
      default: true,
    },
  ]);
  const api = new Api();
  useEffect(() => {
    api
      .GetSignupUsers({
        params: {
          c_id: m_item.c_id,
        },
      })
      .then((res: any) => {
        if (res.code === 1) {
          console.log('success', res);
          setS_info(res.data);
        } else {
          console.log('error', res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  console.log(s_info);

  const onDelete = (value: any) => {
    return () => {
      console.log(value);
      setS_info(
        s_info.map((item: any) => {
          if (item.u_name === value.u_name) {
            item.default = true;
            // 黑名单添加
            api
              .AddDefault({
                c_name: m_item.c_name,
                u_id: item.u_id,
              })
              .then((res: any) => {
                if (res.code === 1) {
                  console.log('success', res);
                } else {
                  console.log('error', res);
                }
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
          return item;
        }),
      );
      console.log(s_info);
    };
  };
  const backHome = () => {
    history.go(-1);
  };

  return (
    <div className="information">
      <div className="title">
        <LeftOutlined onClick={backHome} />
        <span>课程详情</span>
      </div>
      <div className="m-alert">
        <Alert
          message={
            moment(m_item.s_time).format('HH:mm') +
            '~' +
            moment(m_item.s_time).add(m_item.time_long, 'M').format('HH:mm') +
            ' ' +
            m_item.place
          }
          type="info"
          icon={
            <img
              src={require('../../../public/img/class/' +
                m_item.c_name +
                '.svg')}
              alt=""
            />
          }
          showIcon
        />
      </div>
      <div className="m-title">
        <Row>
          <Col span={8}>{'预约：' + s_price}</Col>
          <Col span={8}>{'非预约：' + l_price}</Col>
          <Col span={8}>{'预约人数：' + m_item.num}</Col>
        </Row>
      </div>
      <div className="m-cnt">
        <div className="m-cnt-title">
          <Row>
            <Col span={6}>学员</Col>
            <Col span={12}>时间</Col>
            <Col span={6}>学费</Col>
          </Row>
        </div>
        <div className="m-cnt-list">
          {s_info.map((item, index) => {
            if (
              item.default === false &&
              m_item.s_time < moment() &&
              localStorage.getItem('u_id') != null
            ) {
              return (
                <SlideItem
                  key={index}
                  children={
                    <Row
                      className={
                        (m_item.s_time.format('YYYY-MM-DD') === item.signup
                          ? 'today '
                          : '') + (item.default ? 'default' : '')
                      }
                    >
                      <Col span={6}>{item.u_name}</Col>
                      <Col span={12}>
                        {moment(item.signup).format('MM-DD HH:mm')}
                      </Col>
                      <Col span={6}>
                        {m_item.s_time.format('YYYY-MM-DD') === item.signup
                          ? l_price
                          : s_price}
                      </Col>
                    </Row>
                  }
                  onDelete={onDelete(item)}
                />
              );
            } else {
              return (
                <Row
                  key={index}
                  className={
                    (m_item.s_time.format('YYYY-MM-DD') === item.signup
                      ? 'today '
                      : '') + (item.default ? 'default' : '')
                  }
                >
                  <Col span={6}>{item.u_name}</Col>
                  <Col span={12}>
                    {moment(item.signup).format('MM-DD HH:mm')}
                  </Col>
                  <Col span={6}>
                    {m_item.s_time.format('YYYY-MM-DD') === item.signup
                      ? l_price
                      : s_price}
                  </Col>
                </Row>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Information;
