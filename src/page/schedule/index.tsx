import './index.less';
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import React, { FC } from 'react';
import icon_yoga from '../../../public/img/class/yoga.svg';
import { useState } from 'react';
import {
  Button,
  Modal,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Slider,
  Radio,
} from 'antd';
import moment from 'moment';

const date = new URLSearchParams(window.location.search).get('date');
console.log(date);

const Schedule = (props: ScheduleProps) => {
  const RangePicker: any = TimePicker.RangePicker;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    values.date = props.date;
    console.log(values);
    values.m_time =
      values.time === undefined ? undefined : values.time.format('HH:mm');
    console.log('Received values of form: ', values);
    props.handleCancel();
  };

  return (
    //对话框
    <Modal
      title="Add New Class"
      visible={props.isModalVisible}
      onCancel={props.handleCancel}
      footer={null}
    >
      <div className="schedule">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            time: moment('17:00', 'HH:mm'),
            time_long: 90,
            date: props.date,
            place: '师生活动中心2-108',
            price_s: 400,
            price: 60,
            s_num: 10,
            c_name: '瑜伽',
          }}
        >
          <Form.Item label="课程" name="c_name">
            <Select>
              <Select.Option value="瑜伽">瑜伽</Select.Option>
              <Select.Option value="围棋">围棋</Select.Option>
              <Select.Option value="羽毛球">羽毛球</Select.Option>
            </Select>
          </Form.Item>
          <Row justify="space-between">
            <Col span={10}>
              <Form.Item label="开始时间" name="time">
                <TimePicker format="HH:mm" minuteStep={30} />
              </Form.Item>
            </Col>
            <Col span={10.5}>
              <Form.Item label="时长" name="time_long">
                <Radio.Group>
                  <Radio.Button value="60">60</Radio.Button>
                  <Radio.Button value="90">90</Radio.Button>
                  <Radio.Button value="120">120</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="地点" name="place">
            <Input />
          </Form.Item>
          <Row justify="space-between">
            <Col span={24}>
              <Form.Item label="预约金额" name="price_s">
                <Slider
                  marks={{
                    0: '0',
                    // 50: '50',
                    // 100: '100',
                    // 150: '150',
                    200: '200',
                    // 250: '250',
                    // 300: '300',
                    // 350: '350',
                    400: '400',
                    600: '600',
                    800: '800',
                  }}
                  step={50}
                  max={800}
                />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item label="非预约金额" name="price">
                <InputNumber />
              </Form.Item>
            </Col> */}
          </Row>
          <Form.Item label="人数" name="s_num">
            <Slider
              max={20}
              marks={{
                0: '0',
                10: '10',
                20: '20',
              }}
            />
          </Form.Item>
          <Row justify="end">
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  OK
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
export interface ScheduleProps {
  isModalVisible: boolean;
  handleCancel: any;
  date: string;
}
export default Schedule;
