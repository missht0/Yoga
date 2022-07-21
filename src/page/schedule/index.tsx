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
} from 'antd';

const date = new URLSearchParams(window.location.search).get('date');
console.log(date);

const Schedule = (props: ScheduleProps) => {
  const RangePicker: any = TimePicker.RangePicker;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    values.date = props.date;
    console.log(values);

    values.m_time =
      values.time === undefined
        ? undefined
        : [values.time[0].format('HH:mm'), values.time[1].format('HH:mm')];
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
        <Form layout="horizontal" form={form} onFinish={onFinish}>
          <Form.Item label="课程" name="c_name">
            <Select>
              <Select.Option value="瑜伽">瑜伽</Select.Option>
              <Select.Option value="围棋">围棋</Select.Option>
              <Select.Option value="羽毛球">羽毛球</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="时间" name="time">
            <RangePicker />
          </Form.Item>
          <Form.Item label="地点" name="place">
            <Input />
          </Form.Item>
          <Row justify="space-between">
            <Col span={12}>
              <Form.Item label="预约金额" name="price_s">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="非预约金额" name="price">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="人数" name="s_num">
            <InputNumber />
          </Form.Item>
          <Row gutter={24} justify="end">
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
