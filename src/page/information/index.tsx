import './index.less';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Row, Col } from 'antd';
import moment from 'moment';
import Api from '@/request/request';
import Svg from '../../component/svg';
import InfoCntList from '../../component/InfoCntList';
import InfoBtn from '../../component/InfoBtn';

const Information: React.FC = (props: any) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isdefault, setIsdefault] = useState(false);
  const [m_item, setM_item] = useState({
    c_id: 1,
    c_name: '瑜伽',
    s_time: moment(),
    time_long: '18:30:00',
    place: '师生活动中心2-208',
    price: 400,
    num: 10,
    n_num: 0,
  });
  const [s_info, setS_info] = useState([
    {
      c_id: 1,
      c_name: '瑜伽',
      id: 4,
      pay: 0,
      signup: '08-06 10:00',
      u_id: '',
      u_name: '',
      default: true,
    },
  ]);
  const [s_price, setS_price] = useState('');
  const [l_price, setL_price] = useState('');
  const api = new Api();

  useEffect(() => {
    let d: any = props.location.query.item;
    var m_d: {
      c_id: number;
      c_name: string;
      s_time: any;
      time_long: string;
      place: string;
      price: number;
      num: number;
      n_num: number;
    } = JSON.parse(d);
    m_item.c_id = m_d.c_id;
    m_item.c_name = m_d.c_name;
    m_item.s_time = moment(m_d.s_time);
    m_item.time_long = m_d.time_long;
    m_item.place = m_d.place;
    m_item.price = m_d.price;
    m_item.num = m_d.num;
    m_item.n_num = m_d.n_num;
  }, []);
  useEffect(() => {
    setS_price(
      (m_item.n_num < 5
        ? m_item.price / 5
        : m_item.price / m_item.n_num
      ).toFixed(2),
    );
    setL_price(
      (m_item.n_num < 5
        ? (m_item.price / 5) * 1.5
        : (m_item.price / m_item.n_num) * 1.5
      ).toFixed(2),
    );
  }, [isSignup]);
  useEffect(() => {
    api
      .GetSignupUsers({
        params: {
          c_id: m_item.c_id,
        },
      })
      .then((res: any) => {
        if (res.code === 1) {
          console.log('GetSignupUsers success', res);
          setS_info(res.data);
        } else {
          console.log('error', res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [isSignup]);
  // console.log(s_info, isSignup);

  // 若已经报名，则设置isSignup为true
  useEffect(() => {
    s_info.map((item) => {
      if (item.u_id === localStorage.getItem('u_id')) {
        setIsSignup(true);
      }
    });
  }, [s_info]);

  // 是否在黑名单中
  useEffect(() => {
    api
      .IsDefault({
        params: {
          u_id: localStorage.getItem('u_id'),
          c_name: m_item.c_name,
        },
      })
      .then((res: any) => {
        if (res.code === 1) {
          console.log('IsDefault success', res);
          setIsdefault(res.data);
        } else {
          console.log('error', res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [isdefault]);

  // 缺席
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
                s_time: m_item.s_time,
                c_id: m_item.c_id,
              })
              .then((res: any) => {
                if (res.code === 1) {
                  console.log('AddDefault success', res);
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
      // console.log(s_info);
    };
  };
  // 出席
  const onBack = (value: any) => {
    return () => {
      console.log(value);
      setS_info(
        s_info.map((item: any) => {
          if (item.u_name === value.u_name) {
            item.default = false;
            // 黑名单删除
            api
              .DeleteDefault({
                c_id: m_item.c_id,
                u_id: item.u_id,
              })
              .then((res: any) => {
                if (res.code === 1) {
                  console.log('DeleteDefault success', res);
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
    window.location.href = '/';
  };

  const handleup = () => {
    api
      .Signup({
        c_id: m_item.c_id,
        u_id: localStorage.getItem('u_id'),
        c_name: m_item.c_name,
        signup: moment().format('YYYY-MM-DD HH:mm'),
        u_name: localStorage.getItem('u_name'),
      })
      .then((res: any) => {
        if (res.code === 1) {
          setIsSignup(true);
          m_item.n_num += 1;
          console.log('Signup success', res, m_item.n_num);
        } else {
          console.log('error', res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const handledown = () => {
    api
      .Signdown({
        c_id: m_item.c_id,
        u_id: localStorage.getItem('u_id'),
      })
      .then((res: any) => {
        if (res.code === 1) {
          setIsSignup(false);
          m_item.n_num -= 1;
          console.log('handledown success', res, m_item.n_num);
        } else {
          console.log('error', res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="information">
      <div className="title">
        <div className="m-svg" onClick={backHome}>
          <Svg id={'arr_e_left'} size={24} color={`#bfbfbf`} />
        </div>
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
          <Col span={8}>{'预约人数：' + m_item.n_num + '/' + m_item.num}</Col>
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
        <InfoCntList
          s_info={s_info}
          m_item={m_item}
          s_price={s_price}
          l_price={l_price}
          onBack={onBack}
          onDelete={onDelete}
        />
      </div>

      {/* 报名按钮 */}
      <InfoBtn
        isdefault={isdefault}
        m_item={m_item}
        isSignup={isSignup}
        handledown={handledown}
        handleup={handleup}
      />
    </div>
  );
};

export default Information;
