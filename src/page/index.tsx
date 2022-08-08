import './index.less';
import { Alert, Calendar, message } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import moment, { Moment } from 'moment';
import React, { useState, useEffect } from 'react';
import Schedule from './schedule';
import Api from '../request/request';
import Svg from '../component/svg';

const page: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickdate, setClickdate] = useState(moment().format('YYYY-MM-DD'));
  const [monclasses, setMonclasses] = useState([
    {
      c_id: 1,
      c_name: '瑜伽',
      s_time: moment(),
      time_long: '18:30:00',
      place: '师生活动中心2-208',
      price: 400,
      num: 10,
    },
  ]);
  let change = false;

  const api = new Api();
  useEffect(() => {
    api
      .GetClassByMon({
        params: { mon: moment(clickdate, 'YYYY-MM-DD').format('YYYY-MM') },
      })
      .then((res: any) => {
        console.log(moment(clickdate, 'YYYY-MM-DD').format('YYYY-MM'));
        if (res.code === 1) {
          console.log('res.data', res.data);
          setMonclasses(res.data);
        } else {
          console.log('error');
          console.log(res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [clickdate, isModalVisible]);

  // useEffect(() => {
  //   Api.GetClassById({}).then((res: any) => {
  //     if (res.code === 0) {
  //       setItem(res.data);
  //     }
  //   }).catch((err: any) => {
  //     console.log(err);
  //   });
  // }, []);

  let r_change = false;
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value: Moment) => {
    // if (value.format('YYYY-MM-DD') === item[0].date) {
    // console.log("monclasses", monclasses);
    return (
      <div className="tr-cnt">
        {monclasses.map((item, index) => {
          if (
            moment(item.s_time).format('YYYY-MM-DD') ===
            value.format('YYYY-MM-DD')
          ) {
            return (
              <a
                href={
                  '/information?c_name=' +
                  item.c_name +
                  '&s_time=' +
                  moment(item.s_time).format('YYYY-MM-DD HH:mm') +
                  '&c_id=' +
                  item.c_id +
                  '&time_long=' +
                  item.time_long +
                  '&place=' +
                  item.place +
                  '&price=' +
                  item.price +
                  '&num=' +
                  item.num
                }
                key={index}
                onClick={() => {
                  r_change = true;
                }}
              >
                <div className="m-img">
                  <img
                    src={require('../../public/img/class/' +
                      item.c_name +
                      '.svg')}
                    alt=""
                  />
                </div>
              </a>
            );
          }
        })}
      </div>
    );
    // }
  };
  const onSelect = (value: Moment) => {
    if (isModalVisible === false) {
      setClickdate(value.format('YYYY-MM-DD'));
      console.log('click', value.format('YYYY-MM-DD'));
    }
    if (change) {
      change = false;
      return;
    }
    if (
      isModalVisible === false &&
      r_change === false &&
      value >= moment('00:00:00', 'HH:mm:ss') && //今天以后的日期
      localStorage.getItem('u_id') != null // localStorage 中的user存在
    ) {
      showModal();
    }
  };
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    change = true;
    setIsModalVisible(false);
  };

  const checkuser = () => {
    if (localStorage.getItem('u_id') === null) {
      window.location.href = '/login';
    } else {
      // 删除localStorage里的user
      localStorage.removeItem('u_id');
      message.success('退出登录');
    }
  };

  return (
    <>
      <div className="m-alert">
        {monclasses.map((item, index) => {
          if (
            moment(item.s_time).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD')
          ) {
            return (
              <Alert
                key={index}
                message={
                  moment(item.s_time).format('HH:mm') +
                  '~' +
                  moment(item.s_time).add(item.time_long, 'M').format('HH:mm') +
                  ' ' +
                  item.place
                }
                type="info"
                icon={
                  <img
                    src={require('../../public/img/class/' +
                      item.c_name +
                      '.svg')}
                    alt=""
                  />
                }
                showIcon
              />
            );
          }
        })}
      </div>
      <div className="icon_box" onClick={checkuser}>
        <Svg id={'za_usrs2'} size={24} color={`#3a98db`} />
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
