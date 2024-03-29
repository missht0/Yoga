import './index.less';
import { Alert, Calendar, message, Modal } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import moment, { Moment } from 'moment';
import React, { useState, useEffect } from 'react';
import { Schedule, Svg, PageItem } from '../component';
import Api from '../request/request';
import { Link } from 'umi';

const page: React.FC = () => {
  const [hasclass, setHasclass] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickdate, setClickdate] = useState(moment().format('YYYY-MM-DD'));
  const [monclasses, setMonclasses] = useState([
    {
      c_id: 1,
      c_name: '瑜伽',
      s_time: 0,
      time_long: '18:30:00',
      place: '师生活动中心2-208',
      price: 400,
      num: 10,
      n_num: 0,
    },
  ]);
  const { confirm } = Modal;
  let change = false;
  const api = new Api();

  // 如果现在的时间距离储存的时间超过30min，则删除储存
  if (
    moment().diff(
      moment(localStorage.getItem('time'), 'YYYY-MM-DD HH:mm'),
      'minutes',
    ) > 30
  ) {
    localStorage.removeItem('u_id');
    localStorage.removeItem('u_name');
    localStorage.removeItem('time');
  }

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

  let r_change = false;
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value: Moment) => {
    return (
      <PageItem
        monclasses={monclasses}
        setHasclass={setHasclass}
        value={value}
      />
    );
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
      localStorage.getItem('u_id') != null && // localStorage 中的user存在
      localStorage.getItem('is_teacher') === '1' // localStorage 中的user是老师
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
      confirm({
        content: '确认登出？',
        className: 'confirm',
        onOk() {
          console.log('OK');
          // 删除localStorage里的user
          localStorage.removeItem('u_id');
          message.success('退出登录');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  return (
    <>
      {hasclass &&
      localStorage.getItem('u_id') != null &&
      localStorage.getItem('is_teacher') === '1' ? (
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
                    moment(item.s_time)
                      .add(item.time_long, 'M')
                      .format('HH:mm') +
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
      ) : null}

      <div className="m-bd">
        <div className="icon_box" onClick={checkuser}>
          <Svg id={'za_usrs2'} size={24} color={`#3a98db`} />
        </div>
        <Calendar
          onPanelChange={onPanelChange}
          mode="month"
          dateCellRender={dateCellRender}
          onSelect={onSelect}
        />
      </div>

      <Schedule
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        date={clickdate}
      />
    </>
  );
};

export default page;
