import './index.less';
import { LeftOutlined } from '@ant-design/icons';
import {
  Button,
  Modal,
  TimePicker,
  Form,
  Input,
  Row,
  Col,
  Slider,
  Radio,
  message,
} from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import Api from '../../request/request';
import jwt from '@/util/token';

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const api = new Api();
    api
      .Login(values)
      .then((res: any) => {
        if (res.code === 1) {
          message.success('登录成功');
          // 存储u_id
          localStorage.setItem('u_id', res.data[0].u_id);
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
          <Input allowClear size="large" />
        </Form.Item>
        <Form.Item name="pwd">
          <Input.Password allowClear size="large" />
        </Form.Item>

        <Form.Item className="submit">
          <Button type="primary" shape="circle" htmlType="submit">
            {'→'}
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
