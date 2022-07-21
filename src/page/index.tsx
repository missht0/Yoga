import './index.less';
import { Alert, Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import icon_yoga from '../../public/img/class/yoga.svg';
import Schedule from './schedule';

const page: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickdate, setClickdate] = useState('');
  const [item, setItem] = useState([
    {
      date: '2022-07-22',
      s_time: '08:00',
      e_time: '09:00',
      c_name: '瑜伽',
      place: '瑜伽馆',
      img: icon_yoga,
    },
    {
      date: '2022-07-22',
      s_time: '08:00',
      e_time: '09:00',
      c_name: '瑜伽',
      place: '瑜伽馆',
      img: icon_yoga,
    },
    {
      date: '2022-07-22',
      s_time: '08:00',
      e_time: '09:00',
      c_name: '瑜伽',
      place: '瑜伽馆',
      img: icon_yoga,
    },
  ]);

  let r_change = false;
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value: Moment) => {
    let str = '';
    if (value.format('YYYY-MM-DD') === item[0].date) {
      return (
        <div className="tr-cnt">
          {item.map((item, index) => {
            return (
              <a
                href={
                  '/information?className=' + item.c_name + '&date=' + item.date
                }
                key={index}
                onClick={() => {
                  r_change = true;
                }}
              >
                <div className="m-img">
                  <img src={item.img} alt="" />
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  };
  const onSelect = (value: Moment) => {
    if (isModalVisible === false) {
      setClickdate(value.format('YYYY-MM-DD'));
      console.log('click', value.format('YYYY-MM-DD'));
    }
    if (isModalVisible === false && r_change === false) {
      showModal();
    }
  };
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="m-alert">
        {item.map((item, index) => {
          if (item.date === moment().format('YYYY-MM-DD')) {
            return (
              <Alert
                key={index}
                message={item.s_time + '~' + item.e_time + ' ' + item.place}
                type="info"
                icon={<img src={item.img} alt="" />}
                showIcon
              />
            );
          }
        })}
      </div>
      <Calendar
        onPanelChange={onPanelChange}
        mode="month"
        dateCellRender={dateCellRender}
        onSelect={onSelect}
      />
      <Schedule
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        date={clickdate}
      />
    </>
  );
};

export default page;
