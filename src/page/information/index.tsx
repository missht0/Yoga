import './index.less';
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import React from 'react';
import icon_yoga from '../../../public/img/class/yoga.svg';
import { useState } from 'react';
import {
  Alert,
  Button,
  Modal,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
} from 'antd';
import { LeftCircleTwoTone } from '@ant-design/icons';
import SlideItem from '../../component/slideItem';

const c_name = new URLSearchParams(window.location.search).get('c_name');
const date = new URLSearchParams(window.location.search).get('date');
console.log(date, c_name);

const Information: React.FC = () => {
  const [item, setItem] = useState({
    c_name: '瑜伽',
    date: '2022-07-19',
    s_time: '08:00',
    e_time: '09:00',
    place: '瑜伽馆',
    price_s: '100',
    price: '200',
    num: 10,
    img: icon_yoga,
  });
  const [s_info, setS_info] = useState([
    {
      s_name: '张3',
      sign_up: '2022-07-19',
      pay: 100,
      default: false,
    },
    {
      s_name: '张4',
      sign_up: '2022-07-19',
      pay: 100,
      default: false,
    },
    {
      s_name: '张5',
      sign_up: '2022-07-19',
      pay: 100,
      default: false,
    },
    {
      s_name: '张6',
      sign_up: '2022-07-19',
      pay: 100,
      default: false,
    },
    {
      s_name: '张7',
      sign_up: '2022-07-19',
      pay: 100,
      default: false,
    },
    {
      s_name: '李四',
      sign_up: '2022-07-21',
      pay: 200,
      default: false,
    },
    {
      s_name: '李四',
      sign_up: '2022-07-21',
      pay: 200,
      default: false,
    },
    {
      s_name: '李四',
      sign_up: '2022-07-21',
      pay: 200,
      default: true,
    },
  ]);

  const onDelete = (value: any) => {
    return () => {
      console.log(value);
      setS_info(
        s_info.map((item: any) => {
          if (item.s_name === value.s_name) {
            item.default = true;
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
        <LeftCircleTwoTone onClick={backHome} />
        <span>课程详情</span>
      </div>
      <div className="m-alert">
        <Alert
          message={item.s_time + '~' + item.e_time + ' ' + item.place}
          type="info"
          icon={<img src={item.img} alt="" />}
          showIcon
        />
      </div>
      <div className="m-title">
        <Row>
          <Col span={8}>{'预约：' + item.price_s}</Col>
          <Col span={8}>{'非预约：' + item.price}</Col>
          <Col span={8}>{'预约人数：' + item.num}</Col>
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
            if (item.default === false) {
              return (
                <SlideItem
                  key={index}
                  children={
                    <Row
                      className={
                        (date === item.sign_up ? 'today ' : '') +
                        (item.default ? 'default' : '')
                      }
                    >
                      <Col span={6}>{item.s_name}</Col>
                      <Col span={12}>{item.sign_up}</Col>
                      <Col span={6}>{item.pay}</Col>
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
                    (date === item.sign_up ? 'today ' : '') +
                    (item.default ? 'default' : '')
                  }
                >
                  <Col span={6}>{item.s_name}</Col>
                  <Col span={12}>{item.sign_up}</Col>
                  <Col span={6}>{item.pay}</Col>
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
