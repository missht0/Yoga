import './index.less';
import { Button, Form, Input, message } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import Api from '../../request/request';
import jwt from '@/util/token';
import Svg from '../../component/svg';

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    // localStorage.setItem('u_id', '111');
    // window.location.href = '/';
    const api = new Api();
    api
      .Login(values)
      .then((res: any) => {
        if (res.code === 1) {
          message.success('登录成功');
          // 存储u_id和u_name
          localStorage.setItem('u_id', res.data[0].u_id);
          localStorage.setItem('u_name', res.data[0].u_name);
          // 存储当前时间
          localStorage.setItem('time', moment().format('YYYY-MM-DD HH:mm'));
          if (res.data[0].u_id.length < 7) {
            localStorage.setItem('is_teacher', '1');
          } else {
            localStorage.setItem('is_teacher', '0');
          }
          setTimeout(() => (window.location.href = '/'), 1000);

          console.log('success', res);
        } else {
          console.log('error', res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const backHome = () => {
    history.go(-1);
  };
  return (
    //对话框

    <div className="login">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="u_id">
          <Input
            allowClear
            size="large"
            prefix={
              <div className="m-svg">
                <Svg id={'usr'} size={24} color={`#bfbfbf`} />
              </div>
            }
          />
        </Form.Item>
        <Form.Item name="pwd">
          <Input.Password
            allowClear
            size="large"
            prefix={
              <div className="m-svg">
                <Svg id={'lock1'} size={24} color={`#bfbfbf`} />
              </div>
            }
          />
        </Form.Item>

        <Form.Item className="submit">
          <Button type="primary" shape="circle" htmlType="submit">
            <div className="m-svg">
              <Svg id={'arr_d_right'} size={24} color={`#fff`} />
            </div>
          </Button>
        </Form.Item>
      </Form>
      <div className="back" onClick={backHome}>
        返回
      </div>
    </div>
  );
};
export default Login;
